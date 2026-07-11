# Model Strategy

Project: Healthcare Pathway Planner
Status: Living document
Last updated: 2026-07-09

> Which Claude model to use for which kind of work, so we don't default to the
> most expensive option out of habit. Flag the model at the start of each
> release/tranche; switch deliberately, not by default.

---

## Routing table

| Task type | Model | Examples |
|---|---|---|
| Design / reasoning / hard-to-reverse decisions | **Opus** | Fit/probability model (R3), path logic & scenario comparison (R4), salary triangulation methodology + ROI math (R6), data-schema design |
| Build / scaffold / port / mechanical work | **Sonnet** (default) | R0 scaffolding, component building, wiring deploys, most of R1–R2 |
| Bulk/repetitive data & validation | **Sonnet** (or Haiku for trivial cases) | Scorecard API fetches, formatting records, JSON validation |
| Trivial lookups / search | **Haiku** (via Explore agents) | "where is X", single-file reads, greps |

## How this maps to agents

- Scaffolding / data-fetch / parallel build agents → **Sonnet**
- A genuine design problem worth offloading → **Opus** agent (rare — usually
  better done in the main thread while the session itself is on Opus)
- Search/recon → **Haiku** / Explore agent

## Working rhythm

- **Default session model: Sonnet.** Live here for execution.
- **Flip to Opus** for design-heavy tranches — currently flagged: **R3** (fit
  tiering), **R4** (paths/scenarios), **R6** (salary triangulation + ROI math).
- I'll call out the recommended model at the start of each tranche; you flip the
  session model manually via the model selector (I can't change it from here —
  I only control the models used by agents I spawn).
- Drop back to Sonnet once the design decisions for that tranche are locked.

## Consistency note

This project is personal, separate from Jeffrey's work-context model-routing
guidance (his CLAUDE.md / DDNP work). Keep this table as the source of truth for
this repo specifically.
