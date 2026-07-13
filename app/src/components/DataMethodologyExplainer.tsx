import { useState } from 'react';

// Plain-English explainer for what the school-data numbers actually mean.
// Added per Phase 2.5 review feedback (docs/ux_redesign_plan.md) — Jeff asked
// directly "what does Scorecard net price even mean, is that for a medical
// degree or more generally?" The honest caveats already existed in
// `scorecard_notes`/`cost_notes` per record but were never explained
// up-front. Same collapsed-by-default pattern as CertaintyExplainer.
const ITEMS = [
  {
    label: 'Scorecard net price',
    body: 'The average amount students who received aid actually paid, after aid, averaged across the whole student body — not the sticker price, and not your family\'s price. A school with generous need-based aid (e.g. an Ivy) can show a very low number here even though full-pay families pay close to the full sticker cost. Check the sticker/official cost fields and run a net price calculator for your actual situation.',
  },
  {
    label: 'Earnings (10yr / 6yr)',
    body: 'Median earnings of all graduates of that school, in any major, 10 (or 6) years after they first enrolled — not premed-specific, not adjusted for who went on to medical school versus something else entirely. Useful as a broad signal, not a premed outcome.',
  },
  {
    label: 'Grad rate, acceptance rate, SAT average',
    body: 'Straightforward institutional statistics from the College Scorecard API (a real US Dept. of Education database) — these mean what they say.',
  },
  {
    label: 'GPA risk (our assessment)',
    body: 'This is an editorial judgment call from research on each school\'s academic culture (grade deflation, intro-science intensity, Core Curriculum load, etc.) — not an official statistic anyone measured. It reflects how much pressure a premed student might feel keeping their GPA up at that specific school, not admissions requirements.',
  },
] as const;

export function DataMethodologyExplainer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-stone-200 bg-white">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left min-h-11"
      >
        <span className="font-medium text-stone-900">How to read this data</span>
        <span className="text-stone-400">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          <p className="text-sm text-stone-600 italic">
            Every number here comes from a real source (mostly the College Scorecard API), but
            "real" doesn't mean "means what you'd assume." A few things worth knowing before you
            read too much into any single figure.
          </p>
          <dl className="flex flex-col gap-2">
            {ITEMS.map((item) => (
              <div key={item.label} className="text-sm">
                <dt className="font-medium text-stone-900">{item.label}</dt>
                <dd className="text-stone-600">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
