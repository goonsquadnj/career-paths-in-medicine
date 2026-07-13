# Product Backlog

Project: Healthcare Pathway Planner
Status: Living document
Last updated: 2026-07-09

> Every item traces back to `vision.md`. Each epic carries an **Intent** (the
> *why* / how we'll use it) so we never reduce a feature to a checkbox. The
> **Phase** tag points to `release_plan.md`. Nothing here is a commitment to
> build everything — it's the full inventory so ideas aren't lost.

Phase legend: **R0** foundation · **R1** browse · **R2** map+wishlist ·
**R3** profile+fit · **R4** paths+scenarios · **R5** timeline+apps ·
**R6** money · **R7** road trips · **R8+** advanced/backlog

---

## Epic A — Onboarding & Discovery Questions  · Phase R4

**Intent:** The journey should start with *human* questions, not a data table.
Help Lucy narrow the field by what matters to her before she sees a single school.

- A short, friendly question flow: Do you want to help people? Earn well? What
  kind of care / patients? Doctor vs. NP vs. nurse vs. "not sure"?
- Delivered as clickable panels or light steps, not a boring form.
- A second layer of questions about *path* preference (or the tool infers it).
- Answers become remembered preferences that seed suggestions and filters.
- Must handle "I don't know yet" gracefully — uncertainty is expected.

---

## Epic B — Paths & Journeys  · Phase R4

**Status (2026-07-13):** Scoped in an Opus session — full spec at
`docs/paths_journeys_plan.md`. Reframed as **teaching-first** (land the "two
decisions, don't overspend undergrad" mental model) rather than a builder.
v1 = editorial archetype illustrations for the physician endpoint, as a bridge
section between Explore Careers and Schools; build-your-own is a fast-follow.
Not yet built.

**Intent:** The core mental model. A plan is almost always **undergrad leg + grad
leg**, and different combinations express different strategies.

- Represent a path as a combination (e.g. value-undergrad → prestige-med;
  prestige-undergrad → keep-options-open; local-value → mid-tier med).
- Paths can be user-picked *or* suggested from onboarding answers + profile.
- Each path explains its logic, tradeoffs, and who it fits.
- Grad leg may be "a general profile/target" rather than specific schools —
  or nothing at all (keep-options-open).

---

## Epic C — Preferences & Inputs  · Phase R3–R4

**Status (2026-07-11):** Real scoping write-up at `docs/preferences_fit_plan.md`
(raised by Jeff during Phase 2 UX-redesign review — the Start landing only
captures career interest, never fit preferences, which `vision.md` step 1
already calls for). Recommended to build as the front door to R3 (shared
onboarding with the academic-profile/fit-tiering work), not a separate
mini-project. Not yet built.

**Intent:** Capture the levers that shape the whole search, and remember them.

- Budget, with the understanding it's *dynamic* — moves with scholarships,
  perceived value, and feasibility. Model as a soft cap with a range.
- Distance from home, campus setting/beauty, school size, public/private, urban
  vs. rural, and similar fit levers.
- Expressed as filters and/or sliders; stored as the user's preference set.
- Flexible: any input can be changed later and everything re-responds.

---

## Epic D — Student Academic Profile & Fit  · Phase R3

**Intent:** Treat Lucy as an adult about where she realistically stands, and show
what moves the needle — honestly, not to flatter.

- **Client-side only, and generic by default.** The app shows a generic,
  anonymous experience — no profile, no personalization — until someone actively
  creates a profile on that device. Creating a profile is what unlocks
  personalization (fit-tiering, remembered preferences, wishlist). The profile
  is stored locally (localStorage, per `architecture.md` §Persistence Phase 1)
  and never leaves the device on its own — no server round-trip, no account
  required. This keeps the app safe to open on any device/browser without
  assuming who's using it, and keeps Lucy's data hers.
- Inputs: PSAT10, PSAT11, SAT (actual **and** an expected/target range slider),
  GPA, AP courses/grades, extracurriculars.
- Note the odd PSAT scale (out of ~1520, not 1600) — verify and handle scales.
- Fit-tiering: given profile vs. a school's admit stats, label schools
  **reach / target / likely** — a *light* probabilistic match, not a hard
  deterministic predictor.
- "If you raise your SAT to X, these schools open up." / "With your profile,
  these are realistic." Updatable as scores come in over time.

---

## Epic E — Rich School Data & Profiles  · Phase R1 (+ ongoing)

**Status (2026-07-09):** All 27 schools refreshed with live College Scorecard
values via `app/scripts/fetch-scorecard.mjs` (re-runnable script, kept in
repo). Still open: IPEDS/Common Data Set enrichment where Scorecard is thin,
sub-school/major-level detail, and populating `data/sources.json` with real
URLs.

**Intent:** Give each school a real, trustworthy profile — the useful parts of a
US-News page, without the ranking theater.

- Per-school profile: cost (sticker, in/out-of-state, net price), admit rate,
  SAT/ACT range, grad rate, class size/admits, earnings, ROI, median debt,
  pre-health advising, clinical ecosystem, research access, watch-outs.
- Extend the dataset well beyond current fields (many are `null` today).
- Pull structured data at scale (College Scorecard API; IPEDS / Common Data Set
  where Scorecard is thin). See `architecture.md` §Data Strategy.
- Every value shows source + confidence; unverified stays `null` with a note.
- Sub-schools/colleges within a university and relevant majors (e.g. the James
  Clark School of Engineering at Maryland). *(later within this epic)*

---

## Epic F — Career Paths Data  · Phase R1 (browse) → R6 (financials)

**Status (2026-07-09):** Baseline records for all 15 paths listed below now
exist in `data/paths.json` and render in the app's "Career Paths" tab. Salary
is deliberately qualitative-only per path (`salary_range_notes`); no specific
numbers yet — that's still gated on the salary-triangulation work below.

**Intent:** The undergrad decision depends on the career path. Make the paths
themselves explorable and honest about training, timing, and money.

- Baseline records for MD/DO, PA, RN, NP, CRNA, dentist, psychologist,
  psychiatrist, PT, pharmacist, public health, biomedical research, biotech/
  pharma, health tech/AI, healthcare admin. (Fields specced in `ROADMAP.md`.)
- What the role does, education/training length, age at full earnings,
  admissions difficulty, patient-care intensity, debt risk, salary range, growth,
  lifestyle, best-for, watch-outs, decision gates.
- **Salary triangulation** (see Epic K): don't trust a single source.

---

## Epic G — Map  · Phase R2 (+ R7 for trips)

**Status (2026-07-09):** Done for R2 scope. `SchoolMap`
(`app/src/components/SchoolMap.tsx`) plots all 27 schools using MapLibre GL JS
and the free `demotiles.maplibre.org` vector style — explicitly flagged in
code as a placeholder basemap to revisit (see `architecture.md` open
questions). Pins reflect the same filtered list `App.tsx` already computes for
the school cards. Clicking a pin opens a popup (name + location) with a "View
school card" link that jumps to and highlights the card. A toggle switches
between "all filtered schools" and "my wishlist only." Road-trip routing
(Epic J) is untouched, as intended for R2.

**Intent:** Browse spatially, not just as a list. See where everything is, and
see the current search reflected on the map.

- All schools plotted; pins reflect the *current filters/selection*.
- Click a pin → school profile. Toggle between "all schools" and "my wishlist."
- Foundation for road-trip routing (Epic J).

---

## Epic H — Wishlist & School Selection  · Phase R2

**Status (2026-07-09):** Done for R2 scope. Each `SchoolCard` has an inline
reach/target/safety tier picker (click the active tier again to clear it).
`app/src/store/wishlistStore.ts` is a Zustand store with the `persist`
middleware, namespaced/versioned localStorage key `lucy-planner:wishlist:v1`.
A new "My Wishlist" tab in `App.tsx` groups tiered schools by tier and renders
them with the existing `SchoolCard`. Verified the tier survives a full page
reload. "Applied" tier and deeper compare/contrast views are not yet built —
left for later (R5 Epic M application tracking is the natural next step).

**Intent:** This is *Lucy's* list. Curating it is the heart of her workflow.

- Select/check schools she's interested in.
- Organize into tiers: **reach / target / safety** (and later "applied").
- Review the wishlist as a group or drill into one; compare and contrast.
- Persists across sessions (see `architecture.md` §Persistence).

---

## Epic I — Scenarios & Comparison  · Phase R4

**Intent:** Compare whole *strategies*, not just schools.

- Save named scenarios ("Plan A", "Plan B") — different paths + school mixes.
- Compare side by side: total cost vs. likely earnings, fit, risk, flexibility.
- Cost/ROI engine underneath (basic in R4, real-money in R6).

---

## Epic J — Road Trips  · Phase R7

**Intent:** Make it human and fun — a father-daughter adventure, not a chore.

- Group schools into a few trips across the visit season (define that season).
- Sequence stops on the map; estimate the route.
- Surface "things to see along the way" in each city.
- How many schools per trip; which to combine geographically.

---

## Epic K — Financials: Cost, ROI & Salary Triangulation  · Phase R6

**Intent:** The real-money reckoning. Make ROI concrete and honest.

- All-in cost modeling; net price; +grad school; rough → real ROI.
- Enter actual **offers/awards** → recompute cost & ROI → re-rank schools.
- **Career-path financial comparison** (e.g. NP vs. MD): investment size, when
  earnings start, ramp, ceiling, break-even age, debt, probability of finishing.
- **Salary triangulation:** BLS OES looked *low* vs. Reddit/lived reality — likely
  a national-median vs. specialty-mean/self-employed-undercount issue. Cross-check
  BLS, Medscape, AAMC, Doximity/MGMA where possible; show a **range with
  methodology notes**, never a single laundered number.

---

## Epic L — Timeline & Milestones  · Phase R5

**Intent:** Keep a two-year process organized and low-stress; show what to do when.

- T-minus timeline anchored to Lucy's real dates: PSAT10, PSAT11, SAT date(s),
  study windows, college visits, essay work, ED/EA/RD deadlines, decision dates.
- Suggested timing for actions (study, clinical/volunteer work, visits) — flag
  open question of *when* clinical/volunteer work belongs (HS vs. college).
- Room for "just have fun this summer" too.

---

## Epic M — Application Tracking  · Phase R5

**Intent:** An operational cockpit for senior year.

- Mark "applied to this school"; capture submission date.
- Track published decision dates; who she's heard from vs. hasn't.
- Inventory: how many applied, status of each, outcomes.

---

## Epic N — Scholarships  · Phase R6

**Intent:** A real strategy, not an afterthought — timing, targeting, and money.

- Strategy: what to apply for, when, based on demographics/profile.
- Curated/public scholarship lists: links, amounts, # of applicants, awards,
  requirements, fees, deadlines.
- Feed awards into the financials engine (Epic K).

---

## Epic O — On-Demand School Addition  · Phase R8+ (dev-time now)

**Intent:** "I don't see Case Western — pull it in." The universe should grow
without a painful process.

- **Now (dev-time):** ask Claude; it fetches (Scorecard + official pages) and
  commits a clean record to the repo. Versioned and safe.
- **Later (runtime):** a "Request this school" button → a Cloudflare Function
  fetches from the Scorecard API → draft record → stored app-side and merged with
  the static base at load. No code deploy needed.
- Concept of a **master school universe** (what *could* be added) vs. the
  **in-app set** (what's loaded now).

---

## Epic P — Persistence & Profiles  · Phase R2 (client) → R8+ (sync)

**Status (2026-07-09):** Client-side wishlist persistence done (Zustand
`persist`, `lucy-planner:wishlist:v1`). Filter-bar selections
(bucket/status/cost-flag/direct-med) also persisted, simply, to
`lucy-planner:filters:v1` in `App.tsx`. Academic profile and scenario
persistence are not yet built (R3/R4). Cross-device sync remains R8+.

**Intent:** Her inputs, wishlist, scenarios, and tracking must stick — and
eventually sync between Lucy's phone and Jeff's machine.

- **Client-side first:** localStorage for preferences, profile, wishlist,
  scenarios (not cookies — wrong tool). See `architecture.md`.
- **Cross-device later:** server persistence (Cloudflare D1/KV) + a light family
  login so both devices see the same plan.

---

## Epic Q — Advanced / Delight (parking lot)  · Phase R8+

**Intent:** High-value someday ideas; captured so they aren't lost.

- **Sentiment radar:** scan Reddit / Student Doctor Network for "people are
  hearing back from X" — clearly labeled anecdotal, never treated as data.
- **Application prep help:** per-school "what you need to know"; brainstorming /
  essay support with Claude.
- **What-if sliders:** budget/scholarship sensitivity on ROI in real time.
- **Grad-leg depth:** richer medical/grad-school modeling if/when useful.
- **Theme color picker:** let Lucy pick an accent/theme color for her own
  instance. Cheap to build (CSS custom properties + a stored preference), but
  meaningfully increases ownership — makes it feel like *her* app, not just
  dad's spreadsheet with a nicer coat of paint. Good candidate to pull forward
  into an earlier release (e.g. alongside R2 persistence) since it's low effort
  relative to the delight it adds.
