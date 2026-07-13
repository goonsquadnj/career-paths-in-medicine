# Design System

Project: Healthcare Pathway Planner
Status: Locked direction (2026-07-11) — approved by Jeff off the Start-landing mockup
Owner of taste: Opus (defines this + builds signature screens + reviews gates).
Sonnet implements mechanical screens **against these constraints** — it should
not invent visual choices; when unsure, match a pattern defined here.

> The R0-R2 UI read as a generic Tailwind template. This system exists to give
> the app a considered, editorial "planning companion" feel — and to give Sonnet
> concrete constraints so output stops drifting back to defaults.

## Voice & feel

Calm, editorial, confident — a thinking companion, not a dashboard or SaaS
template. Generous whitespace, strong typographic hierarchy, **one** warm accent
(teal) used sparingly to mark "the way forward." Most of the screen is quiet
neutral; teal is a signal, not wallpaper. Warm, human copy (see the Start
landing). Sentence case everywhere. No walls of text — progressive disclosure.

## Typography

- **Display / large headings: a serif** — this is the single biggest lever that
  moves the app away from generic. Use **Fraunces** (Google Fonts, variable,
  warm optical-size serif) for the hero headline and major section headlines.
  Swappable via one CSS var if we ever change our minds.
- **Body / UI: system sans** (existing `system-ui` stack) — fast, clean, neutral.
- Set up in `index.css`: `@import` Fraunces, add `--font-display` to `@theme`
  (`--font-display: "Fraunces", Georgia, serif;`) so `font-display` utility works.

Type ramp (concrete):

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero display | Fraunces | 32–40px | 400 | Start landing headline, big moments |
| Section headline | Fraunces | 24px | 400–500 | top of each tab/section |
| Card title (h3) | sans | 18px | 500 | school/path/program name |
| Body | sans | 16px | 400 | line-height ~1.6 |
| Secondary | sans | 14px | 400 | subheads, supporting copy |
| Meta / label | sans | 12–13px | 400–500 | confidence line, chip text |

Only two weights: 400 and 500. Avoid 600/700 (reads heavy/generic).

## Color

- **Accent = teal**, via the existing `brand-*` scale (`app/src/index.css`,
  `@theme`). Kept named `brand` (not `teal`) so the backlogged theme-picker can
  repoint it. Use it for: active tab underline, primary buttons, selected/active
  states, the "path forward" tint (`bg-brand-50` + `text-brand-800` on selected
  surfaces, `border-brand-500` accents). **One accent per view** — don't scatter.
- **Neutrals = warm** — prefer Tailwind `stone-*` over cool `gray`/`slate` for
  text, borders, and surfaces, to shed the clinical feel. Targets: body text
  `stone-800`, secondary `stone-500`, hairline borders `stone-200`, page bg
  `stone-50`, cards `white`. Apply in new/signature components now; migrate other
  components from `gray-*` to `stone-*` as they're touched (no big-bang churn).
- **Semantic colors stay semantic** — red/amber/green only for risk, status,
  and confidence (e.g. GPA risk, reach/target/safety), never decoration.
- Keep the QA-fix chip discipline: bucket = a small tier **dot** (see
  `bucketColors.ts`), status = dot+text, direct-med = one solid pill. Don't
  reintroduce same-shape same-saturation "pastel soup" chips.

## Spacing, shape, surfaces

- Generous whitespace; let sections breathe. Card internal padding ~`p-5`.
- Cards: white bg, **hairline** border (`border border-stone-200`), `rounded-xl`
  (12px), minimal/no shadow (`shadow-sm` max). Selected: `border-brand-500` +
  `bg-brand-50`.
- Controls (buttons, selects): `rounded-lg` (8px), min 44px tap target (keep the
  QA mobile-ergonomics fixes).
- Section rhythm: `gap-8` between major sections, `gap-4` within.

## Component patterns

- **SectionHeader** (reusable): serif headline (24px) + one-line sans subhead
  (`stone-500`). Every tab/section opens with this. No caveats in it — those go
  inline/expandable where relevant.
- **EntryTile** (Start / Path Finder): icon (teal), a human-sentence title (15px
  /500), one-line subtext (`stone-500`). Hairline border, hover → `border-brand-300`
  + subtle bg. The "not sure yet" tile gets the accent treatment (`bg-brand-50`,
  full width) — uncertainty is the expected, reassured default.
- **Compact card** (paths, later): title + a few structured chips/rows + a "View
  details" disclosure for prose. One primary thing per card; demote the rest.
- **Tabs**: text + active teal underline (existing pattern), 44px tall.

## Guardrails (what NOT to do)

- No heavy font weights (600/700). No Title Case. No emoji.
- No multi-color same-shape chip rows. One accent per view.
- Don't bury the primary signal (ROI note, key metric) in muted italic at the
  bottom — give it visual weight.
- Cool clinical gray → warm stone as components are touched.
- Honesty visuals stay: confidence/sources line remains on data cards.
