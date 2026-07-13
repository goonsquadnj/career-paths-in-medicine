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
  med-school cost/outcome numbers. Fine for teaching strategy.
- **Cost/benefit stays honest:** undergrad cost = **real net-price ranges
  derived live from our actual school data** per bucket tier; grad-leg cost =
  qualitative or clearly-labeled assumption (real ROI math is Epic K, deferred);
  flexibility / admissions-certainty = qualitative. No laundered precision.

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

(May trim to 4 at build time if two feel redundant — Value Play vs.
Debt-Minimizer are close; keep both only if they teach distinctly.)

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
  undergrad-cost (real range) · flexibility (qualitative) · admissions-certainty
  (qualitative). Reuse the existing design system (serif headers, teal accent,
  stone neutrals, tier dots from `bucketColors.ts`).
- A short intro that states the hero insight up front (the "two decisions, don't
  overspend undergrad" lesson) — this is the teaching frame.
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

- **B1 — Teaching archetypes (this scope):** new bridge section, intro framing,
  the 4-5 archetype illustrations with live-derived undergrad cost + qualitative
  tradeoffs, links into Schools/programs. Editorial content authored carefully
  (Opus-worthy for the copy; Sonnet for the mechanical component build against
  authored content).
- **B2 — Build-your-own (fast-follow, meets Epic I):** pick undergrad leg + grad
  leg → see the tradeoff profile → save as a named scenario → Plan A vs. Plan B.
- **B3+ — Extend endpoints** beyond physician (PA, dentist, NP).

## Explicitly out of scope (v1)

- No fabricated medical-school data or per-school grad cost.
- No real ROI/dollar computation on the grad leg (that's Epic K).
- No non-physician endpoints yet.
- Naming of the section is TBD (working title "Strategies" / "Paths to Med
  School" — avoid colliding with Explore Careers' use of "path" for careers).
