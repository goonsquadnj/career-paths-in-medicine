# Healthcare Pathway Planner

A personal planning tool for a father and daughter (Lucy) exploring healthcare
college and career paths together — undergraduate schools, direct-med / BS-MD /
early-assurance programs, and healthcare career paths — optimizing for **best
overall ROI** (value, fit, outcomes, feasibility, happiness), not prestige or
max salary alone.

Start here for the full picture:

- [`docs/vision.md`](docs/vision.md) — the north star: who it's for, the
  philosophy, and how it's actually meant to be used
- [`docs/product_backlog.md`](docs/product_backlog.md) — every planned feature,
  organized into epics with intent
- [`docs/architecture.md`](docs/architecture.md) — the tech stack and why
- [`docs/release_plan.md`](docs/release_plan.md) — staged releases (R0–R8+)
- [`docs/model_strategy.md`](docs/model_strategy.md) — which Claude model to use
  for which kind of work

## What this is (today)

**R0 — Foundation.** A React + Vite + TypeScript app (in `app/`) that browses the
current school and program data with filters and a plain-English explainer of
the medical-pathway certainty model. This is the base everything else builds on.

## How to run locally

```bash
cd app
npm install
npm run dev
# Open the printed local URL (default http://localhost:5173/)
```

`npm run dev` and `npm run build` automatically sync the latest JSON from
`../data` into `app/public/data/` first (see `app/scripts/sync-data.mjs`) —
`data/` is always the source of truth; never edit the synced copies directly.

## Repo structure

```
career-paths-in-medicine/
├── data/                     # Source-of-truth JSON data
│   ├── schools_undergrad.json          # Merged school master list (v1: 27 schools)
│   ├── programs_medical_pathways.json  # Medical pathway / BS-MD / early-assurance programs
│   ├── sources.json                    # Source registry (many are stubs — see TODO.md)
│   └── ...                             # Staging files, paths/salary/assumptions (in progress)
├── docs/                     # Product strategy, architecture, and data model docs
├── research/                 # Research notes — how schools/programs were selected (preserved)
├── app/                      # The React + Vite + TypeScript app
│   ├── src/
│   │   ├── types/            # TypeScript types for schools & programs
│   │   ├── components/       # SchoolCard, ProgramCard, FilterBar, CertaintyExplainer
│   │   ├── lib/               # Data loading, formatting, bucket color helpers
│   │   └── App.tsx
│   ├── public/data/          # Synced copy of ../data (git-ignored, do not edit)
│   └── scripts/sync-data.mjs
├── ROADMAP.md                # Research process for building the school/program universe
└── TODO.md                   # Open items
```

## Data quality disclaimer

**v1 data — verify all values before making any decisions.**

School costs, College Scorecard values, program requirements, GPA minimums,
MCAT minimums, and continuation policies all change annually. Many
`sources.json` records are stubs without verified URLs. Unverified fields are
`null` with a note, not guessed. This tool is a personal planning aid, not a
definitive admissions guide — always check official school and program pages
directly.

## Rules

- Never invent facts. Unverified stays `null` with a note.
- Do not delete `docs/` or `research/` notes.
- `data/` is the source of truth; `app/public/data/` is a synced build artifact.
