# Release Plan (Staged Tranches)

Project: Lucy's Healthcare Pathway Planner
Status: Living document
Last updated: 2026-07-09

> The vision is big on purpose. This plan breaks it into **value-coherent
> tranches** so nothing has to be built at once. Each release is usable on its
> own and sets up the next. Sequencing follows Lucy's real arc: explore early,
> get operational as applications approach, reckon with money when offers land.
>
> Epics referenced here are defined in `product_backlog.md`.

---

## Sequencing principle

1. **Foundation first**, so everything after is real (deployed, versioned, typed).
2. **Explore before personalize** — understand the landscape before profiling Lucy.
3. **Personalize before commit** — profile & fit before scenarios & money.
4. **Operational tools as senior year nears** — timeline, tracking.
5. **Money when it's concrete** — real offers beat estimates.
6. **Delight and advanced last** — road trips, sentiment, sync, runtime data.

---

## R0 — Foundation & Migration
**Goal:** A real, deployed, versioned app skeleton.
- Confirm stack (React + Vite + TS + Tailwind — see `architecture.md`).
- Scaffold; wire GitHub → Cloudflare Pages; live URL.
- Define TypeScript types for schools / programs / paths.
- Port the current prototype (school cards, program cards, certainty explainer,
  basic filters) into the framework.
- **Done when:** Lucy can open a live URL and browse the current 27 schools.

## R1 — Explore the Universe · Epics E, F
**Goal:** Browse and understand the landscape honestly. Read-only.
- Rich school profiles (US-News-style panels) from expanded data.
- Strong faceted filtering (bucket, status, cost flag, distance, size,
  public/private, has direct-med).
- Program/pathway browser with the certainty model front and center.
- Career-paths browser (MD/DO/PA/NP/nursing/…).
- **Done when:** a real person can compare schools and paths and *get* the tradeoffs.

**Status (2026-07-09): mostly done.**
- Done: all 27 schools in `data/schools_undergrad.json` refreshed with live
  College Scorecard values (cost/net price, grad rate, acceptance rate, 10yr/6yr
  earnings, median debt, and a new `scorecard_sat_average` field) via the
  re-runnable `app/scripts/fetch-scorecard.mjs`. `source_confidence: "high"` +
  `data_status: "verified_scorecard_api_2026_07"` set on every updated record.
  Existing faceted filtering (bucket/status/cost-flag/direct-med) carried over
  from R0. `data/paths.json` now has 15 baseline career-path records (Epic F)
  rendered in a new "Career Paths" tab in the app, alongside existing "Schools"
  and "Programs" tabs. `SchoolCard` now also surfaces SAT average and 10yr
  earnings.
- Not done / deferred: `data/sources.json` still has stub URLs (see `TODO.md`);
  career-path salary numbers are deliberately left qualitative pending Epic K
  salary triangulation; the private pre-health/STEM school batch gap noted in
  `TODO.md` is unrelated to R1 and still open; distance/size facets beyond
  bucket/status/cost/direct-med are not yet built.

## R2 — Map & Wishlist · Epics G, H, P(client)
**Goal:** Spatial browsing + Lucy's own persistent list.
- Map of all schools; pins reflect current filters; click → profile.
- Wishlist with reach/target/safety tiers.
- Client-side persistence (localStorage).
- **Done when:** Lucy curates a tiered list that survives closing the tab.

## R3 — Her Profile & Fit · Epics D, C
**Goal:** Personalize honestly.
- Academic profile inputs (PSAT10/11, SAT actual + target range, GPA, APs, ECs).
- Preference inputs (budget, distance, size, setting…).
- Fit-tiering: reach/target/likely vs. school admit stats; "raise SAT to X → these
  open up." (Requires richer admit data — Scorecard/IPEDS/CDS.)
- **Done when:** the tool tells Lucy where she realistically stands and what moves it.

## R4 — Paths, Onboarding & Scenarios · Epics A, B, I, K(basic)
**Goal:** Reason about whole strategies, interactively.
- Onboarding question flow → seeds path suggestions + preferences.
- Undergrad→grad path model (value→prestige, prestige→keep-options-open, …).
- Save & compare named scenarios (cost vs. earnings vs. fit vs. risk).
- Basic cost/ROI engine (4-yr cost, net price, +grad, rough ROI).
- **Done when:** "Plan A vs. Plan B" is a real, savable comparison.

## R5 — Timeline & Application Tracking · Epics L, M
**Goal:** Operational cockpit for the application season.
- T-minus timeline: test dates, study windows, visits, ED/EA/RD deadlines,
  decision dates; suggested "what to do when."
- Application tracker: applied? submitted date? heard back? decision date?
- **Done when:** the whole season is organized in one place.

## R6 — Money: Scholarships, Offers & Career ROI · Epics K, N
**Goal:** The real-money reckoning.
- Scholarship strategy + curated lists (links, amounts, applicants, deadlines).
- Enter actual offers/awards → recompute all-in cost & ROI → re-rank.
- Career-path financial comparison (NP vs. MD: timing, ramp, ceiling, break-even)
  with triangulated salary sources + methodology transparency.
- **Done when:** decisions rest on real numbers, not estimates.

## R7 — Road Trips & Delight · Epic J
**Goal:** Make it human and fun.
- Road-trip planner on the map: group schools into trips, sequence stops,
  "things to see" per city, plan across the visit season.
- **Done when:** a father-daughter visit season can be planned in the app.

## R8+ — Advanced / Backlog · Epics O, P(sync), Q
**Goal:** High-value someday capabilities.
- Runtime "add a school" (Pages Function + Scorecard API + D1).
- Cross-device sync (server persistence + family login).
- Sentiment radar (Reddit/SDN, clearly anecdotal).
- Application-prep help; what-if ROI sliders; deeper grad-leg modeling.

---

## How we'll work

- Build **one tranche at a time**; each ends deployed and usable.
- Re-open `vision.md` whenever a call is unclear.
- Keep `data_status` / `source_confidence` discipline as data grows.
- Reorder freely — this plan serves Lucy's timeline, not the other way around.
