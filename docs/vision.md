# Vision & Intent

Project: Healthcare Pathway Planner
Status: Living document — this is the north star
Last updated: 2026-07-09

> This document exists so the *intent* behind this project is never lost. The
> feature backlog says *what* we might build. This says *why it exists* and
> *how we actually want to use it*. When a decision is unclear, come back here.

---

## What this really is

This is a **shared decision-making tool for a father and his daughter, Lucy**,
to explore healthcare-related college and career paths together — and to make a
big, expensive, multi-year decision with eyes open.

It is not a college-ranking site. It is not a prestige chase. It is not a
salary-maximizer. It is a **thinking tool and a planning companion** that grows
with Lucy from roughly two years before applications, through the application
season, and into the moment where real offers and real money are on the table.

It should be something Lucy *wants* to open — beautiful, easy, and usable on her
phone — not a spreadsheet her dad makes her look at.

---

## The people

- **Lucy** — the student. She may or may not want to be a doctor. She might land
  on NP, PA, nursing, dentistry, research, biotech, public health, health tech,
  or something else entirely. The tool must respect that uncertainty and keep her
  options open rather than lock her into "MD or bust."
- **Jeff (dad)** — the co-planner and the person funding it. Cares about ROI,
  feasibility, and his daughter's genuine happiness and fit — in that blend, not
  any one of them alone.

They use it **together**. That means honesty, shared inputs, and the ability for
each of them to open it on their own device and see the same plan (eventually).

---

## The philosophy (the part that must not get diluted)

1. **Best overall ROI, not best outcome.** The goal is the best *return on
   investment* — value, fit, outcomes, feasibility, and happiness weighed
   together — not the highest possible salary, not the most prestigious name, not
   the "best school she can get into." A cheaper school that fits well and keeps
   options open can beat a famous expensive one.

2. **Treat Lucy like an adult.** Show her the real dynamics: cost, debt, delayed
   earnings, admission odds, the chance she changes her mind. Don't hide the
   tradeoffs or pre-decide for her. Help her reason, don't just recommend.

3. **Undergrad and grad are two decisions, not one.** Almost every path is a
   *combination*: e.g. "safety/value undergrad → prestige grad," or "prestige
   undergrad → state or no grad school, to keep options open." The tool should
   make people think in **paths/journeys**, not single schools.

4. **Honesty about uncertainty.** Program "guarantees" are often conditional.
   Salary figures vary wildly by source and methodology. Data needs verification.
   The tool should always show *how sure we are* and *where the number came
   from* — never launder a guess as a fact. (See `program_certainty_model.md`
   and the salary-triangulation intent below.)

5. **Keep the escape hatches visible.** Medicine is one path. If Lucy pivots to
   PA, nursing, research, biotech, public health, psychology, or health tech, the
   plan shouldn't fall apart. "Option value" is a first-class factor.

---

## How we actually want to use it (the lived workflow)

This is the story of a real session, start to finish. Everything in the backlog
should serve some part of this arc.

1. **Start with what matters.** Answer a few human questions — Do I want to help
   people? Make a good living? What kind of care/patients? Doctor, nurse, NP, or
   not sure yet? Big school or small? Close to home or far? Beautiful campus or
   doesn't matter? Budget? These are inputs *and* preferences, and they get
   remembered.

2. **Pick (or get suggested) a path/journey.** e.g. local-value undergrad →
   prestige medical, or prestige undergrad → keep options open. Maybe Lucy picks
   it; maybe the tool proposes a few based on her answers.

3. **Get suggested schools for that path** — separately for the undergrad leg and
   the grad leg — filtered by her preferences and, increasingly, by her academic
   profile.

4. **Browse honestly.** Each school shows a real profile (US-News-style): cost,
   admit rate, SAT/ACT range, grad rate, earnings, ROI, pre-health ecosystem,
   clinical access, watch-outs. Browse as cards *and* on a map.

5. **Winnow to a wishlist.** Check the ones she's interested in. Organize into
   **reach / target / safety** tiers. This is *her* list, and it persists.

6. **Refine over time.** As she takes the PSAT10, PSAT11, and SAT, she updates her
   scores. The tool re-tiers her schools ("if you raise your SAT to X, these open
   up"; "these are now realistic"). She adds stretch goals or trims expectations
   as reality comes in. Treat her like an adult about where she stands.

7. **Compare scenarios.** Save "Plan A" vs "Plan B" — different paths, different
   school mixes — and compare total cost vs. likely earnings, fit, and risk.

8. **Plan the road trips.** Group schools she wants to visit into a few trips
   across the visit season, sequence the stops on the map, and — for fun — surface
   things to see in each city. This should feel like a father-daughter adventure.

9. **Run the season.** A timeline lays out what to do when: test dates, study
   windows, visits, essay work, ED/EA/RD deadlines, decision dates. As she
   applies, she tracks it: applied? submitted? heard back? decision date?

10. **Reckon with real money.** When offers and scholarship awards come in, plug
    in the actual numbers. All-in cost and ROI recompute, and the ranking shifts —
    "this 90k/yr school gave 50% off, which changes everything."

Not all of this exists yet. Most of it doesn't. But every feature should trace
back to a step in this arc.

---

## What "done well" feels like

- Lucy opens it on her phone without being asked.
- A hard tradeoff becomes a clear, honest picture instead of an argument.
- The expensive-but-famous option and the cheap-but-great-fit option sit side by
  side with real numbers, and the *right* choice for *her* becomes obvious.
- Two years of decisions, tests, visits, and applications stay organized in one
  place instead of scattered across memory and browser tabs.
- Nobody mistakes a "guaranteed interview" for a guaranteed seat, or a national
  median salary for what a real pediatrician makes.

---

## Non-negotiables / guardrails

- **Never invent facts.** Unverified stays `null` with a note. Show confidence.
- **Never reframe metric polarity to flatter a school.** Report the tradeoff.
- **ROI framing over prestige/salary framing**, always.
- **Mobile-first enough that Lucy will actually use it.**
- **Her data is hers** — persisted, portable, and never surprising.

---

## Publishing intent

- Versioned on **GitHub** (safekeeping + history).
- Published on **Cloudflare** at a real URL Lucy can open from her phone.
- Grows in **stages over ~a year**, timed to Lucy's actual application arc — not
  built all at once. See `release_plan.md`.
