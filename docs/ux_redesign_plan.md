# UX Redesign Plan — Guided Decision-Support Experience

Project: Healthcare Pathway Planner
Status: **Locked spec (2026-07-11)** — decisions confirmed by Jeff; build in phases
Model: designed in Opus; implemented in Sonnet (one foreground stream, phased)

> **Why this exists:** the R0-R2 app "feels like a data browser" (Schools /
> Programs / Career Paths / Wishlist, opening on Schools). The intended product
> starts with the *person's goals and uncertainty*, not schools. This plan
> reworks the app around a guided journey. It pulls **Epic A (onboarding) and
> Epic B (paths/journeys)** — originally sequenced at R4 — forward to now.
>
> Honesty guardrails from `vision.md` remain absolute: never invent facts, no
> fake numeric scores, keep `source_confidence`/`data_status` discipline.

## Known issues found during Phase 1 review (2026-07-11)

- **RESOLVED (2026-07-13), corrects the original diagnosis below.** The
  scrollbar Jeff kept seeing "in the header" was a real bug, not benign OS
  scrollbar styling as first guessed — his precise symptom report ("only in
  the header," "moves by a pixel or two") led to finding the actual cause:
  the tab-bar container (`overflow-x-auto`, added so tab labels can scroll
  horizontally at narrow widths) has a CSS spec quirk where setting only
  `overflow-x: auto` forces the browser to also compute `overflow-y` as
  `auto` (a used-value coupling — a UA can't render one axis `visible` and
  the other `auto`/`scroll` independently). A 1px box-model rounding
  artifact (`scrollHeight: 44` vs `clientHeight: 43`, confirmed by direct
  measurement) then gave that container exactly one real pixel to scroll
  vertically, rendering its own native scrollbar confined to the tab row.
  Fixed by adding `overflow-y-hidden` alongside `overflow-x-auto` in
  `App.tsx`. Verified: `overflowY` computed style is now `hidden`,
  `canActuallyScrollY: false`. ~~Original (wrong) diagnosis below, kept for
  the record of how the investigation actually went:~~
- **Certainty explainer appearing expanded at the very top of the page** —
  Jeff's screenshot showed this, but it reflects the *pre-Phase-1* 5-tab
  structure (Schools/Programs/Career Paths/My Wishlist), not the current
  4-tab build — almost certainly a stale cache (Cloudflare deploy lag or
  browser cache) rather than a regression, since Phase 1 already relocated
  and collapsed this exact element. **Re-verify against a hard-refreshed
  live/local build; only treat as a real bug if it reproduces there.**

## Locked decisions (from Jeff, 2026-07-11)

1. **Path data:** add short structured fields *derived by summarizing the
   existing prose* in `paths.json` (no new factual claims, no numbers, no
   scores). **Salary stays qualitative and details-only** — no short salary
   label on compact cards. Jeff's guidance: "summarize the summaries" as needed
   to turn prose into something succinct enough to compare.
2. **Nav:** 4 top-level tabs (Compare + Roadmap live *inside* Explore Careers).
3. **Build:** phased, with Jeff reviewing between each phase.

## Target information architecture (4 tabs)

Default tab on load = **Start** (not Schools).

1. **Start (Path Finder)** — guided landing. Large clickable entry cards:
   - "I think I want to be a doctor" → Explore Careers, Physician + Mental health
   - "I want patient care, but maybe not med school" → Nursing + Advanced clinical
   - "I'm interested in nursing" → Nursing track
   - "I'm interested in health science / research / public health" → Research group
   - "I'm not sure yet" → Explore Careers, all groups
   Not a persisted questionnaire yet — just guided routing into Explore Careers.
2. **Explore Careers** — the 15 paths in **groups** (below), as compact
   comparison cards with deep prose behind "View details". Contains two extra
   views: a **Compare** table toggle and a **Training Roadmap** shown when a path
   is opened.
3. **Schools & Programs** — reframed to answer "which schools might support this
   path?" Programs folded in as a section here. The certainty explainer moves
   here (out of the global hero). Map becomes secondary/collapsible. Labels
   humanized (e.g. `likely_include` → "Likely fit", bucket names title-cased).
4. **My Plan** (renamed from "My Wishlist") — keeps reach/target/safety school
   grouping; adds placeholder slots for: selected career path, preferred training
   route, saved schools, open questions, next steps. localStorage only, no auth.

## Career group mapping (the 15 paths)

Add a `group` field to each `paths.json` record with these assignments:

| group (value) | display label | paths |
|---|---|---|
| `physician` | Physician track | md_do_physician |
| `nursing` | Nursing track | registered_nurse, nurse_practitioner, crna |
| `advanced_clinical` | Advanced clinical roles | physician_assistant, dentist, physical_therapist, pharmacist |
| `mental_health` | Mental health | psychiatrist, clinical_psychologist |
| `research_public_health_tech` | Research / public health / health tech | public_health, biomedical_research, biotech_pharma, health_tech_data_ai, healthcare_administration |

## New `paths.json` fields (all derived from existing prose — summaries, not new facts)

Add to each record; update `app/src/types/path.ts` and `docs/data_dictionary.md`:

- `group`: enum string (see table above).
- `training_length_short`: string, ≤ ~25 chars, summarizing `training_length_years`
  (e.g. "~11–15 yrs post-HS", "~6–7 yrs post-HS"). No new facts — compress the
  existing prose.
- `admissions_difficulty`: enum `"low" | "moderate" | "high" | "very_high"`,
  summarizing the existing `admissions_difficulty_notes`. Guidance (Sonnet may
  refine from the prose, but stay faithful to it): MD/DO very_high; Psychiatrist
  very_high (med-school admission); PA high; NP high; CRNA high; Dentist high;
  Clinical psychologist high (funded PhD); PT high; Biomedical research high
  (funded PhD); RN moderate; Public health moderate; Biotech/pharma moderate;
  Health tech moderate; Healthcare admin moderate; Pharmacist moderate (note says
  "notably less competitive").
- `roadmap`: array of 4–7 short step strings, derived from `training_length_years`.
  Keep simple — no spaghetti. Jeff-provided/endorsed examples (use verbatim as the
  baseline for these four):
  - MD/DO: `["High school","College (premed)","Medical school","Residency","Optional fellowship","Practice"]`
  - PA: `["High school","College","Patient-care hours","PA school","Certification","Practice"]`
  - RN: `["High school","ADN/BSN","NCLEX","RN practice","Optional NP/CRNA"]`
  - NP: `["BSN","RN experience","MSN/DNP","NP certification","Practice"]`
  Author the remaining 11 from each path's existing prose, same concise style.
- `best_fit`: one sentence, distilled from `best_for[0]`.

**Not added:** any salary label/enum. Salary stays in `salary_range_notes` prose,
shown only under "View details".

## Compare table columns (Explore Careers → Compare view)

Rows = the 15 paths (groupable/filterable by `group`). Columns, all from
structured fields only: Path name · Group · Training length (`training_length_short`)
· Med school required? (`requires_medical_school`) · Patient-care intensity
(`patient_care_level`) · Admissions difficulty (`admissions_difficulty`) · Best
fit (`best_fit`). No salary column, no invented scores.

## Editorial / hierarchy rules

- Every section: clear headline + short plain-English subheadline + content.
- Remove niche caveats from the global hero. The "Direct Medicine Programs: How
  Much Certainty…" explainer moves *inside* Schools & Programs as an expandable.
- Humanize all raw labels (`likely_include`, bucket slugs, enum values).
- No walls of text — progressive disclosure ("View details"), compact cards.
- Mobile-first: keep the QA-pass ergonomics (44px targets, collapsible filters).

## Phase 2 review feedback + locked decisions (Jeff, 2026-07-11)

Substantive round of feedback after Phase 2 landed. Key findings and decisions:

**Real bugs / gaps found:**
- **No default sort on school cards** — they render in raw JSON order (Rutgers
  first only because it's first in the file). Fix: default sort = **closest to
  home** (`distance_from_home_category`: local → regional_drive →
  far_drive_or_short_flight → far_from_home), alphabetical within each tier.
- **`scorecard_notes` and `cost_notes` exist on every school record but are
  never rendered anywhere in the UI.** This is the single highest-leverage
  fix found this round — the exact methodology caveats the vision requires
  ("Scorecard net price ≠ your family's price," "earnings are broad
  school-level outcomes, not premed-specific") are already written, just
  orphaned. **Fix: surface both fields inline on the school card, and add a
  collapsed-by-default "How to read this data" explainer** (same pattern as
  `CertaintyExplainer`) covering: what average net price means (federal
  aid-adjusted average across all students, not your price), what earnings
  10yr/6yr means (all majors, not premed-specific), and what `gpa_risk`
  actually is (see below).
- **`gpa_risk` is editorial/qualitative judgment, not raw admissions data**,
  and the UI presents it as a bare fact ("GPA risk: high") with no
  indication of that. Fix: relabel for clarity (e.g. "Premed GPA pressure
  (our assessment)") and always show `gpa_risk_notes` inline, not just the
  word.

**Locked decisions:**
1. **Filters → toggle-chip multi-select groups**, replacing single-select
   dropdowns. All options visible at once, click to toggle on/off.
2. **Add a numeric net-price range slider** alongside the existing
   `family_cost_flag` categorical filter (keep both — cost_flag encodes
   affordability *risk* a raw number can't, e.g. "elite need-aid-only" is
   about aid-dependency, not just price).
3. **Default school sort = closest to home** (see above).
4. **Programs get embedded into their school's card, not a standalone
   section.** Jeff's read: having Schools and Programs as two separate lists
   was confusing — "why are we showing the same schools twice." Clarified:
   they're not duplicates (only 11 of 27 schools have a Program; a Program
   has certainty/MCAT/GPA fields a School can't), but the relationship was
   invisible. Decision: drop the standalone "Medical pathway programs"
   section; a school with a direct-med pathway gets an expandable block
   *inside* its own card instead. The certainty-sort cross-school comparison
   view (currently: all programs sorted by certainty level) is deferred to
   Phase 3's Compare work rather than lost. **Tab renamed "Schools" → "Schools"**
   (drop "& Programs" from the label since there's no separate list anymore).
5. **Explore Careers stays narrative, not charted** — Jeff explicitly invited
   an adversarial view on "should this be more data-driven." Recommendation
   given and accepted implicitly by moving on: career-path facts (training
   length, admissions difficulty, lifestyle) are genuinely qualitative
   summaries with no real numeric salary data behind them (Epic K defers
   that deliberately) — charting them would be fake precision. Schools &
   the future Compare view are where real quantitative data lives and where
   charting/sorting should go instead.

**Preferences/onboarding gap — acknowledged, scoped separately, not built
yet.** `vision.md`'s own lived workflow step 1 already calls for asking about
distance/size/campus preferences before browsing schools — this was never
built (Start only captures career interest, not fit preferences). See
`docs/preferences_fit_plan.md` for the real scoping write-up. Decision: this
is real, valid, next work — but distinct enough (new data fields, a second
onboarding layer) that it's scoped as its own piece rather than folded into
the current filter-redesign work.

## Build phases (each ends buildable + reviewable)

- **Phase 1 — Shell & reframe (no data changes):** new 4-tab nav defaulting to a
  Start/Path Finder landing; reframe the Schools tab into "Schools & Programs"
  (fold Programs in, relocate certainty explainer here, humanize labels, make map
  collapsible/secondary); hero/editorial cleanup. Career Paths tab temporarily
  keeps existing PathCard until Phase 2.
- **Phase 2 — Explore Careers:** grouped layout + new compact PathCard (prose
  behind "View details"); add `group`, `training_length_short`, `best_fit` to
  data + type + dictionary; wire Start entry cards to route into the right group.
- **Phase 2.5 — Review-round refinements (2026-07-11 feedback, above):**
  embed programs into school cards (drop standalone section, rename tab
  "Schools & Programs" → "Schools"); toggle-chip multi-select filters +
  net-price range slider; default sort = closest to home; surface
  `scorecard_notes`/`cost_notes` inline + a "How to read this data"
  explainer; relabel/clarify `gpa_risk`.
- **Phase 3 — Compare + Roadmap: done (2026-07-13).** Explore Careers now has
  a Cards/Compare toggle; Compare renders all 7 locked columns (Path, Group,
  Training length, Med school?, Patient care, Admissions, Best fit) in an
  HTML table, correctly scoped by the Start-routed group filter. `PathCard`'s
  "View details" now shows a `TrainingRoadmap` (simple left-to-right step
  chips with arrows, not a flowchart) built from each path's `roadmap` array.
  Shared `DIFFICULTY_CLASSES`/`difficultyLabel` extracted to `lib/labels.ts`
  so PathCard and the Compare table agree. Verified live: 15-row table with
  correct data, group filter narrows both Cards and Compare identically
  (nursing → exactly RN/NP/CRNA), roadmap step/arrow count correct, 44px
  toggle tap targets, no console errors, clean build.
  **Deferred, not built:** the cross-school certainty-sort program comparison
  (i.e. "show me every guaranteed-interview-only program regardless of
  school") that was lost when Phase 2.5 embedded programs into school cards
  — still an open nice-to-have, not blocking.
- **Phase 4 — My Plan: done (2026-07-13).** Wishlist→My Plan rename was
  already done back in Phase 1; this phase added the four placeholder slots
  above the existing reach/target/safety school grouping: a "Selected career
  path" dropdown (all 15 paths), a "Preferred training route" free-text
  textarea, and two add/remove `NotesList`s ("Open questions", "Next steps").
  New `planStore.ts` (Zustand + persist, localStorage key
  `lucy-planner:plan:v1`) holds all four; new `NotesList` component and
  `lib/id.ts` helper are shared/reusable. Verified live: all four fields
  persist correctly across a full reload (confirmed via direct localStorage
  read), both the "Add" button and real Enter-key submission work (an
  earlier apparent Enter-key failure during testing was isolated and
  confirmed to be a browser-automation-tool quirk, not an app bug — a raw
  `KeyboardEvent` with `key: 'Enter'` dispatched directly worked correctly),
  wishlist tier grouping still renders unaffected below, no console errors,
  clean build.
- **Phase 5 (new, scoped not built) — Preferences & fit onboarding:** see
  `docs/preferences_fit_plan.md`.

Each phase: `npm run build` clean + preview-verify + commit. No parallel agents —
one foreground Sonnet stream, Jeff reviews between phases.

## Explicitly out of scope for this redesign

- No login/auth. No server sync.
- No new school data (the 7 private-premed/STEM schools remain stashed pending a
  QA pass — `git stash@{0}`).
- No fabricated facts or numeric scores.
