# TODO — Healthcare Pathway Planner

> **Note:** This file tracks granular data/feature TODOs. The full product
> strategy (features with intent, staged releases) lives in
> `docs/product_backlog.md` and `docs/release_plan.md`.

## Data verification (high priority)

- [x] **Verify all Scorecard values** directly against the College Scorecard API. Done 2026-07-09 via `app/scripts/fetch-scorecard.mjs` (re-runnable) — all 27 schools in `data/schools_undergrad.json` updated with fresh `scorecard_avg_annual_cost`, `scorecard_graduation_rate`, `scorecard_acceptance_rate`, `scorecard_median_earnings_10yr`, `scorecard_median_earnings_6yr`, `scorecard_median_debt`, and a new `scorecard_sat_average` field; `source_confidence: "high"` and `data_status: "verified_scorecard_api_2026_07"` set on every record. Note: `scorecard_avg_annual_cost` now reflects Scorecard's average net price (fallback: sticker attendance cost) per school-year data currently published by Scorecard — re-run the script periodically as Scorecard updates its award-year data.

- [ ] **Expand data/sources.json** — all 21 source records are stubs with `"url": null`. Each one needs a real URL, verified title, and source type before the app can link out to primary sources.

- [ ] **All programs: verify current-cycle MCAT, GPA, and continuation requirements** before relying on them. Program rules change annually and some records note known gaps (e.g., Rutgers-Newark MCAT policy unconfirmed, Stevens class-rank discrepancy).

## Data gaps (medium priority)

- [ ] **`data/schools_undergrad_private_premed_stem.json` is a duplicate of the regional file** — the intended private pre-health/STEM records (Northeastern, Case Western, Wake Forest, Tulane, Emory, Villanova, etc.) are missing entirely. These schools represent a distinct strategic lane and should be added as a separate batch, then merged into `schools_undergrad.json`.

- [x] **Add career paths data (data/paths.json)** per data dictionary spec. Done 2026-07-09 — 15 baseline path records added (MD/DO, PA, RN, NP, CRNA, dentist, psychologist, psychiatrist, PT, pharmacist, public health, biomedical research, biotech/pharma, health tech/AI, healthcare admin). Salary is intentionally qualitative-only (`salary_range_notes`); `sources: []` with `notes: "general_knowledge_not_yet_sourced"` — this is a placeholder layer pending Epic K salary triangulation, not final data.

- [ ] **Add salary/ROI assumptions (data/assumptions.json)** — discount rate, expected earnings by specialty, loan repayment assumptions, and other parameters needed for any ROI scoring.

## Features to build

- [ ] **Add a school scoring model (docs/scoring_model.md)** — define weighting for premed ecosystem, value, fit, cost risk, and overall scores; implement in the React app (`app/src/`) once defined. See `docs/release_plan.md` R3/R4.

- [ ] **Add source citations in the UI** — source IDs are stored in school records but not currently displayed or linked. Once sources.json has real URLs, the UI should link out to them.

- [ ] **Add net price calculator** — allow entry of family income/assets to estimate actual net price vs. sticker, especially for need-aid-only elite schools.

- [ ] **Add comparison mode** — side-by-side school cards for 2–4 selected schools.

## Low priority / future

- [ ] Add data/specialties.json (specialty-level earnings, competitiveness, lifestyle data).

- [ ] Add data/salary_sources.json (citations for salary and earnings assumptions).
