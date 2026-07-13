# Paths & Journeys (Epic B) — Scope

Project: Healthcare Pathway Planner
Status: **Locked scope (2026-07-13)** — decisions confirmed by Jeff (Opus scoping session)
Maps to: `docs/product_backlog.md` Epic B, `vision.md` philosophy #3 ("undergrad
and grad are two decisions, not one"). Originally sequenced R4; never built.

> **The reframe (why this is teaching-first):** the backlog filed Epic B as "a
> path is a combination" — which reads like a *builder*. Jeff's framing sharpens
> it: the primary job is to **teach a mental model**, not to compute a plan. The
> lesson: becoming a physician is (usually) *two* decisions — undergrad, then
> med school, separated by four years — and you do **not** need to spend your
> whole budget/risk tolerance on the most prestigious undergrad you can get into.
> The interactive builder is secondary to landing that lesson.

## The hero insight this feature must land

Med-school admissions are driven mostly by **GPA, MCAT, and experiences** —
things earnable at *many* undergrads — so undergrad prestige matters far less on
the physician path than people assume. Blowing the budget on the most
prestigious undergrad is often *poor* ROI, because:
1. the expensive, decisive part comes *later* (med school), and
2. some prestige undergrads actively *hurt* the GPA med schools weight most.

Point 2 connects to data **we already have**: the `gpa_risk` field (Columbia,
Hopkins, UChicago already flagged "high" premed GPA pressure). So the app can
show "a prestige undergrad can *lower* your med-school odds" honestly, straight
from an existing field — not as an unsupported assertion.

## Locked decisions (Jeff, 2026-07-13)

1. **v1 = archetype illustrations first** (editorial, teaching). The
   build-your-own interactive flow is a fast-follow (where Epic B meets Epic I
   scenarios).
2. **Placement = a bridge step between Explore Careers and Schools** — its own
   section/tab: you've explored the *career*, now understand the *strategy* to
   get there, then go pick schools.
3. **v1 endpoint = MD/physician only.** Structure it to extend to other
   grad-requiring careers (PA, dentist, NP) later.

## Honesty constraints (shape what's buildable now)

- **No medical-school dataset exists** (only 27 undergrads + 11 BS/MD programs).
  The grad leg is therefore **archetypal, not specific-school** — no fabricated
  per-school med-school cost/outcome numbers. Fine for teaching strategy.
- **Cost/benefit stays honest:** undergrad cost = **real net-price ranges
  derived live from our actual school data** per bucket tier; grad-leg cost = a
  **single shared, sourced national assumption** (see Cost comparison below);
  flexibility / admissions-certainty = qualitative. No laundered precision.

## Cost comparison (v1) — the lesson, quantified

**Decision (Jeff, 2026-07-13): include an honest total-cost estimate in the v1
archetype illustrations; keep full ROIC in Epic K.**

The key realization that makes this honest *and* powerful: across physician
archetypes, **the med-school leg costs roughly the same regardless of undergrad
choice** — so the cost *difference* between archetypes is almost entirely the
**undergrad leg, which is exactly where we have real data.** That turns the
"don't overspend undergrad" lesson into a number: *"The Prestige Route costs
~$Xk more than The Value Play — and the entire difference is undergrad, for the
identical MD at the end."*

How each leg is costed, honestly:
- **Undergrad leg:** derived live from real `scorecard_avg_annual_cost` of the
  schools in the archetype's bucket tier(s) — shown as a **4-year range**, not a
  false point estimate. Labeled with the same caveat the app already surfaces
  (Scorecard *average net price* — understates full-pay families; run a net
  price calculator). Cross-reference the existing `DataMethodologyExplainer`.
- **Med-school leg:** a **single shared national assumption** (AAMC median
  4-year cost of attendance / median education debt), stored in
  `data/assumptions.json` with a real source + `accessed_date`, and rendered
  with an explicit "national median, not school-specific — same across every
  physician path here" label. Because it's constant across archetypes, it's
  honest to hold it fixed and lets the undergrad difference carry the story.
- **Total** = 4-yr undergrad range + the shared med-school assumption, always
  shown as a range with its assumption visible — never a single laundered figure.

**Why NOT full ROIC in Epic B (the honest limit):** ROIC has a cost side and a
return side. For *physician* archetypes the **return side is ~constant** — an
MD's earnings track specialty and geography, not undergrad name (and where
undergrad might matter, our own `gpa_risk` data cuts *against* prestige, not for
it). So a cost comparison captures ~90% of the ROI insight for physician-only
v1 without guessing physician salaries Epic K hasn't sourced yet. Full ROIC
(lifetime earnings, delayed-earnings timing, break-even) earns its keep at the
**cross-endpoint** level (MD vs NP vs PA), which is Epic K + multi-endpoint —
deferred.

## The archetype set (v1 — physician endpoint)

Each is a two-leg flow: `[Undergrad strategy] → [Med-school strategy] → Physician`,
with an honest tradeoff profile. Working set (final copy authored at build time):

1. **The Value Play** — affordable/in-state undergrad → apply broadly to med
   school. Low debt before the expensive part; prestige-agnostic. *Undergrad leg
   → value-tier buckets.*
2. **The Prestige Route** — elite undergrad → med school. Brand/network/research,
   but high cost *before* med school, and grade-deflation risk (ties to
   `gpa_risk`). **The cautionary "blow your wad" case.** *→ elite-tier buckets.*
3. **The Hedge** — strong/prestige undergrad → *keep options open* (don't commit
   to med). Max optionality (pivot to PA/research/biotech/etc.), highest undergrad
   cost, med not de-risked. *→ mid/elite buckets; grad leg = keep-options-open.*
4. **The Early Bet** — direct-med (BS/MD): collapse two decisions into one as a
   HS senior. Trades flexibility for reduced admissions uncertainty; still has
   continuation requirements. *Links to the real 11 programs + certainty model.*
5. **The Debt-Minimizer** — cheapest viable undergrad, bank the savings for med
   school or a pivot. Lowest financial risk; fewer resources/ecosystem. *→
   value-tier, cost-sorted.*

**TRIMMED TO 4 (2026-07-13, Opus copy-authoring pass):** Debt-Minimizer was
folded into The Value Play (its logical extreme — "staying local/commuting
drives undergrad debt to near zero"). Writing them out confirmed they'd read
as the same card twice. Final four (authored copy lives in
`data/pathway_strategies.json`): **Value Play** & **Prestige Route** (same
med-school destination, opposite undergrad spend — the core lesson), **The
Hedge** (when paying for prestige undergrad *is* justified — optionality when
unsure), **The Early Bet** (BS/MD — the different-shape option, certainty for
flexibility). Copy authored; intro framing + the shared med-school-cost note
are in the same file. Build (components + wiring + assumptions.json med-school
figure) is the remaining Sonnet work.

## Data model

New editorial data file (e.g. `data/pathway_strategies.json`), typed, small,
authored by us (it's teaching content, not fetched facts — labeled as such):

```json
{
  "id": "value_play",
  "name": "The Value Play",
  "tagline": "Spend little on undergrad, invest where it counts.",
  "endpoint": "md_do_physician",
  "undergrad_leg": {
    "label": "Affordable / in-state undergrad",
    "bucket_tiers": ["value"]        // links to Schools filter + derives real $ range
  },
  "grad_leg": {
    "kind": "med_school",            // med_school | keep_options_open | direct_med
    "label": "Apply broadly to med school"
  },
  "tradeoffs": {
    "flexibility": "high|medium|low",
    "admissions_certainty": "higher|typical|lower",
    "undergrad_cost": "derived"      // computed live from real school net-price in the tier
  },
  "logic": "Why this works and who it fits — plain English.",
  "best_for": [],
  "watch_outs": [],
  "notes": "editorial_strategy_archetype"
}
```

Key: **undergrad cost range is derived at render time** from the real
`scorecard_avg_annual_cost` of schools in the referenced bucket tier(s) — honest,
live, no hardcoded numbers. The Early Bet's leg links to real program IDs
instead of a bucket.

## Visual structure

- Each archetype = a compact **two-leg horizontal flow** illustration (undergrad
  chip → arrow → grad chip → "Physician"), plus a small tradeoff strip:
  **total est. cost (range, with the med-school assumption visible)** ·
  undergrad-cost (real range) · flexibility (qualitative) · admissions-certainty
  (qualitative). Reuse the existing design system (serif headers, teal accent,
  stone neutrals, tier dots from `bucketColors.ts`).
- A short intro that states the hero insight up front (the "two decisions, don't
  overspend undergrad" lesson) — this is the teaching frame.
- **The comparison is the payoff:** archetypes should be viewable side by side so
  the total-cost deltas are obvious at a glance (the whole point is that the
  Prestige Route's extra cost is all undergrad, same MD endpoint).
- Each archetype links out: undergrad leg → **Schools pre-filtered to that
  bucket tier**; Early Bet → the direct-med programs. Connects abstract strategy
  to concrete real data.
- Mobile-first (stacks vertically), 44px targets — same guardrails as everywhere.

## Connections to what already exists

- **School buckets** (`bucketColors.ts` value/mid/elite tiers) = the undergrad
  legs; archetypes route into the Schools filter.
- **11 BS/MD programs** + **certainty model** = the Early Bet archetype.
- **`gpa_risk`** = the evidence behind "prestige undergrad can hurt premed GPA."
- **Career Paths / roadmap** = the *linear* training sequence; this feature is
  the *strategic choices within* the college→med-school portion (complementary,
  not duplicative).

## Build phases

- **B1 — Teaching archetypes: done (2026-07-13).** New "Strategies" tab
  (bridge between Explore Careers and Schools) with the intro framing, the 4
  archetypes as side-by-side cards, live-derived undergrad cost + the shared
  AAMC med-school cost assumption (`data/assumptions.json`) → honest total-cost
  estimate, qualitative tradeoffs, "See matching schools" routing into a
  pre-filtered Schools tab (bucket-tier based, or direct-med-program based for
  The Early Bet). New files: `data/pathway_strategies.json` (authored content),
  `data/assumptions.json` (med-school cost/debt, AAMC-sourced), `types/
  pathwayStrategy.ts`, `types/assumptions.ts`, `lib/strategyCost.ts`,
  `components/PathwayStrategyCard.tsx`.

  **Real bug caught and fixed during live verification, not just assumed
  correct after a clean build:** the cost-derivation helper initially used
  `scorecard_avg_annual_cost` (Scorecard's aid-adjusted net price) for the
  undergrad leg, which made **The Prestige Route appear cheaper than The
  Value Play** ($274k-$518k vs $312k-$565k) — because elite schools'
  generous need-based aid drags their *average* net price below even in-state
  public schools (verified: elite net-price range $6k-$30k vs value-tier
  $16k-$41k). That inverted the entire lesson this feature exists to teach.
  Fixed by switching to sticker cost (`official_cost_of_attendance` falling
  back to `official_cost_in_state`) — the honest basis for a family not
  counting on maximal aid (matches the existing `family_cost_flag` framing:
  `elite_need_aid_only`, `likely_full_pay_warning`). Re-verified: Value Play
  $383k-$765k vs Prestige Route $616k-$799k — correct direction. Card copy
  updated to disclose it's sticker cost, not net price, and that aid can lower
  it substantially. Verified live: correct cost ordering across all 4 cards,
  both "See matching schools" routing paths (bucket-tier → 10 schools for
  Value Play; direct-med-program → 11 schools for The Early Bet), no console
  errors, clean build.
- **B2 — Build-your-own (fast-follow, meets Epic I):** pick undergrad leg + grad
  leg → see the tradeoff profile → save as a named scenario → Plan A vs. Plan B.
- **B3+ — Extend endpoints** beyond physician (PA, dentist, NP).

## Explicitly out of scope (v1)

- No fabricated *per-school* medical-school data. (A single shared, sourced,
  clearly-labeled *national* med-school cost assumption IS in scope — see Cost
  comparison — because it's honest and held constant across archetypes.)
- **No full ROIC / lifetime-earnings modeling.** Epic B compares *cost only*.
  Lifetime-earnings ROIC — which only meaningfully differentiates *across*
  endpoints (MD vs NP vs PA), not between physician archetypes — stays in Epic K
  with salary triangulation. Don't guess physician salary figures here.
- No non-physician endpoints yet.
- Naming of the section is TBD (working title "Strategies" / "Paths to Med
  School" — avoid colliding with Explore Careers' use of "path" for careers).
