# Architecture & Technology Strategy

Project: Lucy's Healthcare Pathway Planner
Status: **DECIDED (2026-07-09)** — React + Vite + TypeScript confirmed for R0
Last updated: 2026-07-09

> **Decision:** Front-end stack is **React + Vite + TypeScript** (with
> Tailwind/shadcn, MapLibre GL, Zustand + localStorage; Cloudflare Pages from
> GitHub). SvelteKit was the runner-up. The table below stands as the plan.

> This is my recommendation as the builder-partner, with rationale and the main
> alternatives. It's written to be decided, not just discussed. Nothing is built
> against it until you confirm.

---

## Guiding constraints (from the vision)

- Solo builder (Jeff), not a full-time front-end dev, building **with Claude**.
- Must be **visually appealing, easy, and mobile-first** (Lucy on her phone).
- Behaves like a **data-viz app**: filters, sliders, cards, tables, a map, a
  timeline, saved scenarios — lots of reactive state.
- **Persistence**: client-side first (her data sticks), server-side later
  (Lucy's phone ↔ Jeff's machine sync).
- **Deploy to Cloudflare, version on GitHub.** Grows over ~a year.
- Data grows on demand ("add Case Western").

---

## Recommendation at a glance

| Layer | Recommendation | Why |
|---|---|---|
| Language | **TypeScript** | The data model is deeply nested; types catch errors early and make Claude-assisted edits far safer. |
| Framework | **React + Vite** | Largest ecosystem (maps, sliders, tables, charts all first-class), the framework Claude writes most reliably, trivial Cloudflare deploy. |
| Styling/UI | **Tailwind CSS + shadcn/ui** | Good-looking, consistent, responsive defaults without a designer. Mobile-first out of the box. |
| Map | **MapLibre GL JS** | Open-source, no API token/billing, vector styling, route support for road trips. You already know it. |
| Client state | **Zustand** + a thin localStorage layer | Simple reactive store; easy to persist and rehydrate. |
| Hosting | **Cloudflare Pages** (auto-build from GitHub) | Matches your intent; preview deploys per branch; custom domain for Lucy. |
| Backend (later) | **Cloudflare Pages Functions** (Workers) | Same platform; serverless; only introduced when a feature needs it. |
| Server data (later) | **Cloudflare D1** (SQLite) for plans; **KV** for simple blobs | Structured, cheap, native to Cloudflare. |

**Primary alternative considered:** *SvelteKit* — less boilerplate and very
pleasant, but a smaller ecosystem and Claude is less fluent in it, which matters
for a solo builder leaning on Claude. **Staying vanilla** (today's prototype) was
rejected: the reactive state this vision needs (filters ⇄ map ⇄ wishlist ⇄
scenarios) becomes painful to hand-maintain fast.

---

## Why React + Vite (the one decision that shapes everything)

- **Ecosystem:** every widget in the backlog — map, range sliders, faceted
  filters, sortable/comparison tables, timeline, charts — has a mature,
  well-documented React component. Less custom code = faster, fewer bugs.
- **Claude fluency:** React has the most training data by a wide margin, so
  Claude-generated components are more likely correct on the first try — the
  single biggest productivity factor for a solo, non-expert builder.
- **TypeScript fit:** the rich school/program/path data benefits enormously from
  typed models shared across the app.
- **Cloudflare fit:** Vite → static build → Cloudflare Pages is a one-command,
  zero-friction deploy.

If you'd rather optimize for *simplest possible code to read* over *ecosystem +
Claude fluency*, SvelteKit is the fallback. My recommendation is React.

---

## Persistence strategy

**Phase 1 — client-side (localStorage), no backend.**
- Store preferences, academic profile, wishlist/tiers, and scenarios as JSON in
  `localStorage`, behind a small typed wrapper (versioned key, migration-friendly).
- **Not cookies:** cookies are tiny, sent on every request, and meant for auth —
  wrong tool for a plan. localStorage is the right fit; move to IndexedDB only if
  data outgrows it (unlikely for a while).
- This gets Lucy real persistence on *her* device with zero infrastructure.

**Phase 2 — server-side sync (only when cross-device is actually wanted).**
- Cloudflare **D1** (SQLite) for structured plans/scenarios; **KV** for simple
  key-value blobs.
- Identity: keep it dead simple for a family — a shared **family code/passphrase**
  or **Cloudflare Access**. Do *not* build full user auth early.
- Client stays the source of truth; server is a sync target. Offline-friendly.

---

## Data strategy

**Source of truth (now):** the JSON files in `data/`, served as static assets and
loaded by the app. Versioned in Git. Simple, safe, reviewable.

**Getting to "rich data" at scale (Epic E):**
- **College Scorecard API** (api.data.gov key) — cost, earnings, admit rate,
  SAT/ACT ranges, grad rate, debt. Authoritative and programmatic.
- **IPEDS / Common Data Set** where Scorecard is thin (admit stats, score ranges).
- Keep the `data_status` / `source_confidence` discipline on every field.

**"Add a school on demand" (Epic O):**
- **Now (dev-time):** ask Claude → it fetches Scorecard + official pages →
  commits a clean record to `data/`. Versioned, reviewable, no runtime risk.
- **Later (runtime):** a Pages Function calls the Scorecard API → returns a draft
  record → stored app-side (D1) and merged with the static base at load. Lets
  Lucy add a school without a code change.
- Model a **master universe** (addable) vs. the **loaded set** (active).

**Salary triangulation (Epic K):** never a single number. Pull BLS OES, Medscape,
AAMC, and MGMA/Doximity where available; store each with methodology notes; show a
**range**. BLS medians will read low for physicians — expected, and worth labeling
(national median vs. specialty mean; self-employment undercount).

---

## Deployment & repo

- **GitHub** repo (private is fine) → **Cloudflare Pages** connected for
  auto-build on push; branch preview URLs; a custom domain Lucy can bookmark.
- Migrate the current `src/` prototype into the React app during **R0**; keep
  `data/`, `docs/`, and `research/` as-is.
- Suggested app layout (finalized at R0):
  ```text
  /               → app root (Vite + config)
  /src            → React app (components, stores, types, lib)
  /data           → JSON data (imported or fetched as assets)
  /docs           → strategy + models (this file, vision, backlog, etc.)
  /research       → preserved research notes (never deleted)
  /functions      → Cloudflare Pages Functions (added when backend begins)
  ```

---

## Cost posture

Everything above sits comfortably in **free/low-cost tiers**: Cloudflare Pages,
Functions, D1, and KV all have generous free allowances; the Scorecard API is
free with a key. No paid map tokens (MapLibre + free basemaps). This should cost
approximately nothing to run for a family-scale app.

---

## Open technical questions

- Confirm **React vs. SvelteKit** (my rec: React) before R0.
- Basemap choice for MapLibre (free raster vs. self-hosted vector); revisit at R2.
- When (if ever) cross-device sync is worth the backend — defer until wanted.
- PSAT scale handling (the ~1520 oddity) — verify during R3 data work.
