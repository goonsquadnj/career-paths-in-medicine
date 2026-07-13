# Preferences & Fit Onboarding — Scoping

Project: Healthcare Pathway Planner
Status: **Scoped, not built.** Raised by Jeff 2026-07-11 during Phase 2 review;
formal write-up per his request to treat it as real next work, not a quick add.

> This closes a real gap: `docs/vision.md`'s own lived workflow, step 1, already
> calls for this — *"Big school or small? Close to home or far? Beautiful
> campus or doesn't matter? Budget?"* — but the Start landing built in this
> redesign only captures **career interest**, never **fit preferences**. This
> doc is the honest scoping of what it would take to actually build that.
>
> Maps to `docs/product_backlog.md` **Epic C (Preferences & Inputs)**, R3/R4.

## The gap

Start → Explore Careers only asks "what kind of healthcare path interests
you." It never asks the second, equally important question the vision
specifies: *what do you want out of the undergraduate experience itself* —
distance, size, culture. Right now those can only be expressed as after-the-
fact filters on the Schools tab, which Lucy would have to already know exist.

## What Jeff asked about, split honestly by whether we can back it with data

| Preference | Data status | Sourcing plan |
|---|---|---|
| Distance from home | **Already a real field** (`distance_from_home_category`) | None needed — already used for the new default sort |
| School size (big/small) | **Not modeled yet** | Real, objective, sourceable — total enrollment from College Scorecard (`latest.student.size`) or IPEDS. Cheap to add via the existing `fetch-scorecard.mjs` pattern. |
| Diversity | **Not modeled yet** | Real, sourceable — IPEDS/Scorecard demographic breakdowns exist. Addable with real numbers and a methodology note (what "diversity" metric specifically, e.g. Simpson's diversity index or race/ethnicity breakdown — needs a clear, non-reductive framing). |
| "Party school" reputation | **Not modeled, and should not be invented** | This is third-party reputational survey data (Niche.com, Princeton Review-style rankings), not an objective fact. If added at all, it must be clearly attributed to its actual source with a confidence caveat — never presented as our own assessment. Open question below. |
| Sports culture / big-sports-school | **Partially real, partially reputational** | Division/conference (D1 vs. D3, Power Four vs. not) is a real, sourceable fact. "Big sports culture" as a vibe is reputational, same caveat as party-school reputation. |

**Guardrail carried over from the rest of this project:** anything reputational
gets sourced-and-attributed or it doesn't ship — this is the same discipline
already applied to `gpa_risk`/`parent_roi_note` (editorial, but sourced from
real research, never fabricated).

## Proposed shape (not yet built)

A **second onboarding layer**, after the existing Start career-interest tiles:
"What matters to you in a school?" — likely a short multi-select or a few
sliders (distance, size, maybe a couple of others once sourced), landing on
Schools with those preferences **pre-set as active filters** rather than
making Lucy set them twice. This is the natural extension of the toggle-chip
filter redesign already locked in for Phase 2.5 — the same chip components
would double as both the onboarding-answer UI and the filter UI.

Preferences should persist client-side (same localStorage pattern as the
wishlist store), consistent with `docs/architecture.md`'s persistence model
and the "generic until a profile is created" principle already locked for
Epic D.

## Open questions (need Jeff's call before building)

1. **Party-school / sports-culture reputation** — build it with clear
   third-party attribution (e.g. "Niche.com campus culture rating, not our
   assessment"), or leave it out of v1 entirely as too soft a signal for a
   ROI-focused tool? Leaning toward: leave out for now, revisit only if a
   credible, citable source is identified.
2. **Sequencing** — does this land right after Phase 4 (My Plan) of the
   current UX redesign, or get folded into the broader R3 (Her Profile & Fit)
   work already on the release plan, since R3 also introduces the academic
   profile (PSAT/SAT/GPA) and fit-tiering? There's real overlap — both are
   "ask Lucy things, then use the answers to shape what she sees."
   Recommendation: **treat this as the front door to R3**, not a separate
   mini-project — build them together so preferences and academic profile
   share one onboarding flow rather than two disconnected ones.
3. **Which new fields to source first** — school size is the cheapest/most
   valuable (uses the existing Scorecard fetch pipeline); diversity is next;
   reputational fields are parked per (1) above.

## Explicitly not doing yet

- Not adding party/sports "vibe" data without a clearly attributed source.
- Not building the onboarding UI itself until Jeff confirms sequencing
  (question 2 above).
- Not touching current Phase 2.5/3/4 work to accommodate this — it's additive,
  scoped separately, per Jeff's decision.
