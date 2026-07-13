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

- **Scrollbar artifact next to the tab bar** — investigated via screenshot at
  narrow viewport width. Most likely explanation: Windows renders scrollbars
  with visible tracks/arrow buttons (unlike Mac's overlay style), so (a) the
  page's own vertical scrollbar naturally appears right at the top of the
  viewport next to whatever's there first (the tab row), and (b) the tab bar's
  `overflow-x-auto` shows its own horizontal scrollbar once tab labels
  overflow (confirmed: "Schools & Programs" was visibly truncated at that
  width). Functionally correct, just not visually polished. **Nice-to-have for
  a later pass:** custom-style scrollbars (thin track) or hide the tab-row
  scrollbar while keeping it scrollable, if it bothers Jeff on repeat viewing —
  not blocking, not treated as a Phase 2 blocker.
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

## Build phases (each ends buildable + reviewable)

- **Phase 1 — Shell & reframe (no data changes):** new 4-tab nav defaulting to a
  Start/Path Finder landing; reframe the Schools tab into "Schools & Programs"
  (fold Programs in, relocate certainty explainer here, humanize labels, make map
  collapsible/secondary); hero/editorial cleanup. Career Paths tab temporarily
  keeps existing PathCard until Phase 2.
- **Phase 2 — Explore Careers:** grouped layout + new compact PathCard (prose
  behind "View details"); add `group`, `training_length_short`, `best_fit` to
  data + type + dictionary; wire Start entry cards to route into the right group.
- **Phase 3 — Compare + Roadmap:** Compare table view; Training Roadmap on path
  open; add `admissions_difficulty` + `roadmap` to data + type + dictionary.
- **Phase 4 — My Plan:** rename Wishlist → My Plan; add placeholder slots
  (selected path, preferred route, open questions, next steps) + selected-path
  client state (Zustand + persist, localStorage).

Each phase: `npm run build` clean + preview-verify + commit. No parallel agents —
one foreground Sonnet stream, Jeff reviews between phases.

## Explicitly out of scope for this redesign

- No login/auth. No server sync.
- No new school data (the 7 private-premed/STEM schools remain stashed pending a
  QA pass — `git stash@{0}`).
- No fabricated facts or numeric scores.
