# Adversarial QA Findings — R0–R2 (2026-07-10)

Reviewer: independent Opus context, no memory of the build conversation. Method:
read all intent docs + source + data fresh, tested the live/local app directly,
verified claims rather than trusting commit messages. Full original report
preserved below; status column added as fixes land.

> **How to use this file:** this is the permanent record of the first
> independent QA pass. Don't delete findings when fixed — mark them Resolved
> with the commit hash. New QA passes should append, not overwrite.

## Status tracker

| # | Finding | Severity | Status |
|---|---|---|---|
| 1a | Map renders zero pins on most loads (StrictMode race) | HIGH | Resolved — commit `afcf436` (code bundled in with a concurrent doc-only commit due to a shared working tree; see note below) — rewrote `SchoolMap.tsx`'s init effect to track live-mount state in a ref and unregister its `load` handler on cleanup, so a stale `load` firing after StrictMode's dev unmount/remount can no longer sync markers onto a torn-down map. Marker sync is now driven by an `isStyleReady` state flag set exactly once per live map instance. Verified 7 consecutive reloads all show 27 pins. |
| 1b | "Wishlist only" map toggle empties map, doesn't recover | HIGH | Resolved — commit `afcf436` (same fix as 1a) — `syncMarkers` is now a memoized, idempotent diff-based function (safe to call any number of times in any order) and `visibleSchools` is `useMemo`'d on its actual inputs instead of recreated every render. Verified the wishlist-only toggle cycled back-and-forth 3x, with the map's marker count matching the button's own label every time, and a bucket-filter change updating the map to match the filtered card count. |
| 1c | preview_screenshot hangs on map canvas | MED | Tooling note, not a product bug |
| 2a | No source/confidence shown in UI (violates vision non-negotiable) | HIGH | Resolved — commit `5846765` — added a low-key "Confidence / data status / Sources" line to `SchoolCard.tsx` and `ProgramCard.tsx`, plus a `fmtDataStatus` helper in `format.ts` |
| 2b | Certainty nuance shallow on ProgramCard (badge only) | MED | Resolved (2026-07-11 look & feel pass) — `medical_seat_certainty` free-text now rendered as a subtitle under the certainty badge on `ProgramCard.tsx`. |
| 3a | `rutgers_newark` has copied/fabricated-looking earnings+debt, falsely marked "verified" | HIGH | Resolved — commit `2be5d51` — re-ran fixed `fetch-scorecard.mjs` against the live Scorecard API for all 27 schools. Confirmed by direct API spot-check that Rutgers Newark (unit 186399) and New Brunswick (unit 186380) genuinely share `ope6_id=002629` (same OPEID6 institution; New Brunswick is `main_campus`), and the Scorecard API itself returns identical `earnings.10yr`/`earnings.6yr`/`median_debt` for both — this is a real federal-cohort-reporting artifact (earnings/debt are reported at the OPEID6 institution level, not per branch campus), not a script bug. Newark's SAT average genuinely came back null from the API and is now honestly `null` (was previously missing/absent); record is correctly downgraded to `medium` confidence / `partially_verified_scorecard_api_2026_07` with a note rather than falsely stamped "high/verified". |
| 3b | `fetch-scorecard.mjs` blanket-stamps confidence/status regardless of which fields actually refreshed | HIGH | Resolved — commit `2be5d51` — merge logic no longer falls back to old hand-authored/estimated values when the API returns null (removed `newValue ?? oldValue` pattern for cost/grad/accept/earnings/debt, matching the SAT field's existing correct `?? null` behavior). `source_confidence`/`data_status` are now set per-record based on whether every fetched field actually came back non-null: full `high`/`verified_scorecard_api_2026_07` only if nothing was missing; otherwise `medium`/`partially_verified_scorecard_api_2026_07` with an auto-appended note in `scorecard_notes` naming exactly which fields the API returned null for. |
| 3c | Stale unused `scorecard_median_earnings_display` field conflicts with `_10yr` | MED | Resolved — commit `2be5d51` — removed the field entirely from all `data/schools_undergrad*.json` records, from `School` type in `app/src/types/school.ts`, and from `docs/data_dictionary.md`. Confirmed via repo-wide grep it's not referenced by any UI component; `npm run build` passes with no TypeScript errors after removal. |
| 3d | 6 elite schools share SAT avg 1553 — verify, not confirmed fabricated | LOW | Spot-checked directly against the live Scorecard API: Princeton, Penn, JHU, Columbia, Harvard, and Stanford all genuinely return `1553` for `latest.admissions.sat_scores.average.overall`; nearby elite schools return distinct values in the same fetch (MIT 1560, UChicago 1554, Duke 1548, Brown 1546, Cornell 1535, Yale 1534). This is a genuine Scorecard API value, not a fetch-script bug — likely reflects real closely-clustered SAT profiles among these six (possibly coincidental rounding at the reporting/cohort level), not a fabrication or copy-paste artifact. No fix needed. |
| 3e | Doc/data count minor mismatch note | LOW | Open, trivial |
| 4.* | Design/layout critique (chip pastel soup, no visual hierarchy, small mobile tap targets, generic template feel) | MED/LOW | Resolved (2026-07-11 look & feel pass) — see below for what changed. |

---

## Full original report

**Method:** Read all five intent docs + full `app/src/` source + all `data/*.json`. The live Cloudflare site was not tested because Claude-in-Chrome would not connect; I fell back to the **local dev build** (`lucy-pathway-planner-dev`, Vite on :5174) driven with Preview tools. Note: the deployed site runs a **production build (no StrictMode)**, so Bug #1 below may present differently there — it must be re-tested against the live URL. Everything else was verified against running code.

### 1. Bugs / broken functionality

**1a. [HIGH] The map renders zero pins on most page loads** — `app/src/components/SchoolMap.tsx`
Repro: Load the app (Schools tab), wait 3–5s. Expected: 27 pins. Actual: basemap renders, 0 markers on every reload after the first. Root cause: the marker-sync `useEffect` only adds markers inside `map.once('load', syncMarkers)` with no cleanup to unregister/reconcile on re-run; combined with React StrictMode's mount→unmount→remount, the `load` handler races against `map.remove()` teardown. The recreated-every-render `visibleSchools` array as an effect dependency compounds the churn. Once in the 0-marker state, nothing recovers it (verified across filter changes).

**1b. [HIGH] "My wishlist only" map toggle empties the map and doesn't recover** — same root cause as 1a. Button label ("(1)") and actual rendered marker set are computed independently and can disagree.

**1c. [MED] `preview_screenshot` hangs on the map canvas** — likely MapLibre WebGL + headless harness; tooling note, not necessarily a product bug. Console was clean (no JS errors) throughout.

**Working correctly (verified):** filter bar, tab switching, program sort order, and **wishlist persistence** (tiered a school, confirmed in localStorage, survived reload, correct `aria-pressed` state, appeared in Wishlist tab).

### 2. Intent misalignment

**2a. [HIGH] Source + confidence are never shown in the UI** — violates `vision.md`'s explicit non-negotiable ("always show how sure we are and where the number came from"). `source_confidence`, `data_status`, `sources` exist in every data record and type, but no component renders any of them.

**2b. [MED] Certainty model shallow on ProgramCard** — `CertaintyExplainer` is good, but the card itself only shows a colored badge; `medical_seat_certainty` free-text isn't rendered. Badge color ordering is semantically correct (green→red gradient matching certainty), which is a genuine strength.

**Aligned well:** `parent_roi_note`/`why_included` copy consistently resists prestige-chasing (Harvard: "not necessary for med school"; JHU: "not a generic prestige upgrade"). Nothing assumes Lucy has already chosen medicine.

### 3. Data integrity concerns

**3a. [HIGH] `rutgers_newark` has fabricated-looking "verified" earnings/debt.** Different institution from `rutgers_new_brunswick` (different cost/grad/accept rates) but **identical** `scorecard_median_earnings_10yr` (74479), `_6yr` (61263), and `scorecard_median_debt` (21500) — while Newark's own `scorecard_notes` says these "need direct Scorecard verification." Stamped `source_confidence: "high"` / `data_status: "verified_scorecard_api_2026_07"` anyway. Almost certainly New Brunswick's numbers copied onto Newark and falsely labeled verified.

**3b. [HIGH] `fetch-scorecard.mjs` launders unverified values as "verified."** Lines ~116-125: merge uses `newValue ?? oldValue` for cost/grad/accept/earnings/debt (keeps old hand-authored guess when API returns null), then unconditionally sets confidence=high/status=verified regardless of which fields actually came from the API. The SAT field alone correctly uses `satAvg ?? null` — proving the team can do this right; the other fields should follow the same per-field discipline.

**3c. [MED] Two conflicting earnings numbers per school.** `scorecard_median_earnings_display` differs from `_10yr` in 26/27 records, isn't in the fetch script's field list, and is never rendered — stale pre-refresh data. Should be removed or reconciled.

**3d. [LOW/verify] Six elite schools share SAT average = 1553** (Princeton, Penn, JHU, Columbia, Harvard, Stanford). May be a genuine Scorecard rounding/reporting artifact (flagging to verify, not asserting fabrication) — Stanford being test-optional makes this worth a spot-check.

**3e. [LOW]** Minor doc/data count cross-reference gaps — trivial.

### 4. Design / layout critique (deferred to the interactive look & feel pass)

- **Chip "pastel soup"**: bucket/status/direct-med chips in `SchoolCard` all use the same size/shape/`-100` saturation — can't tell taxonomy from verdict at a glance. Fix by form (solid/outline/dot), not just hue; collapse 10 near-identical bucket colors into ~3 meaningful tiers.
- **No visual hierarchy**: every card identical regardless of ROI; `parent_roi_note` (the vision's headline metric) rendered last, muted, italic — de-emphasized exactly where it should be emphasized.
- **Mobile tap targets below guideline**: wishlist tier buttons ~50×22px, filter selects ~31px tall (recommended ~44px) — ironic since the wishlist is "the heart of Lucy's workflow."
- **Filter bar**: no reset control, stacks to 4 rows on mobile, pushes map down.
- **Generic-template feel**: competent but generic Tailwind/shadcn-default look, not something that feels like "Lucy's app." Theme-color picker (already backlogged) would help, but hierarchy + a distinctive accent matters more than more chip colors.
- Map basemap (demotiles placeholder) — already a tracked known gap, not re-litigated.

### 5. What's genuinely working well

Wishlist persistence is solid and real (not a silent fake). Filtering is correct, not just responsive. The ROI-over-prestige philosophy is genuinely embedded in the data copy. The certainty badge palette is semantically ordered. Null-with-note discipline is followed for SAT fields, proving the team can do it — which is exactly why 3a/3b are a regression from their own standard.

---

## Look & feel pass (2026-07-11) — what changed

Addressed the section 4 design critique directly, interactively, with Jeff (not auto-fixed — matches the plan from the R2 recap).

- **Brand accent color**: added a `brand` (teal) palette as Tailwind v4 `@theme` tokens in `index.css`, backed by real CSS custom properties so a future theme-color picker (Epic Q) can repoint them at runtime. Replaced default `blue-600` everywhere (active tab, map toggle buttons, map markers, source links) with the brand teal.
- **Chip "pastel soup" fixed by separating form, not just hue**: `school_bucket` (taxonomy) now renders as plain text with a small color-coded dot reflecting a new 3-tier value/mid/elite grouping (`lib/bucketColors.ts`), collapsed down from 10 near-identical pastel chips. `v1_status` (our verdict) is a separate dot+text using brand-teal/amber. `has_direct_med_program` is now a distinctly-shaped solid violet pill with a checkmark — three different visual forms for three different kinds of information.
- **ROI given a visual home**: `parent_roi_note` and `family_cost_flag` moved into a dedicated callout box (teal left border, tinted background) near the top of the card, replacing the old muted-italic-at-the-bottom treatment.
- **Typography hierarchy**: cost and 10yr-earnings figures are now `text-base font-semibold`; secondary stats (grad rate, acceptance, SAT) stay smaller/lighter.
- **Mobile tap targets**: wishlist tier buttons and all filter selects bumped to a 44px minimum height.
- **Mobile filter bar**: collapses behind a "Filters" toggle (with active-filter count) on mobile instead of stacking 4 full-width dropdowns before any content is visible; added a "Clear filters" control.
- **Finding 2b addressed in the same pass**: `medical_seat_certainty` free text now renders under the certainty badge on `ProgramCard`.
- Basemap placeholder (demotiles) intentionally not touched — still tracked separately.

Verified via Claude Preview: clean build, teal applied consistently across tabs/map/cards, mobile filter collapse/expand works, card hierarchy visually confirmed against before/after screenshots, no console errors on a fresh dev server.
