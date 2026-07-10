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
| 1a | Map renders zero pins on most loads (StrictMode race) | HIGH | Fixing now |
| 1b | "Wishlist only" map toggle empties map, doesn't recover | HIGH | Fixing now |
| 1c | preview_screenshot hangs on map canvas | MED | Tooling note, not a product bug |
| 2a | No source/confidence shown in UI (violates vision non-negotiable) | HIGH | Resolved — commit `5846765` — added a low-key "Confidence / data status / Sources" line to `SchoolCard.tsx` and `ProgramCard.tsx`, plus a `fmtDataStatus` helper in `format.ts` |
| 2b | Certainty nuance shallow on ProgramCard (badge only) | MED | Deferred — design pass |
| 3a | `rutgers_newark` has copied/fabricated-looking earnings+debt, falsely marked "verified" | HIGH | Fixing now |
| 3b | `fetch-scorecard.mjs` blanket-stamps confidence/status regardless of which fields actually refreshed | HIGH | Fixing now |
| 3c | Stale unused `scorecard_median_earnings_display` field conflicts with `_10yr` | MED | Fixing now |
| 3d | 6 elite schools share SAT avg 1553 — verify, not confirmed fabricated | LOW | Open — spot-check later |
| 3e | Doc/data count minor mismatch note | LOW | Open, trivial |
| 4.* | Design/layout critique (chip pastel soup, no visual hierarchy, small mobile tap targets, generic template feel) | MED/LOW | **Deferred to the interactive look & feel pass** |

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
