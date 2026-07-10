import { useState } from 'react';

// Plain-English explainer for the medical-pathway certainty model.
// Content ported from docs/program_certainty_model.md — keep in sync if that
// document's levels or wording change.
const LEVELS = [
  {
    label: 'Direct medical pathway',
    body: 'The strongest-certainty category. The student is admitted into a structured undergraduate-to-medical-school path, usually as a high-school senior, and proceeds to the affiliated medical school after completing program requirements.',
  },
  {
    label: 'Conditional medical-school seat',
    body: 'Can meaningfully reduce uncertainty, but the seat depends on meeting GPA, course, interview, MCAT, or other continuation rules.',
  },
  {
    label: 'Guaranteed admission (high requirements)',
    body: 'May use "guaranteed admission" language, but still requires very high performance such as a high MCAT score and strong college GPA. Not a free pass.',
  },
  {
    label: 'Provisional acceptance / early assurance',
    body: 'Provides early structure or provisional acceptance, but may not guarantee the final medical-school seat. Some programs begin only after the student has already started college.',
  },
  {
    label: 'Guaranteed interview only',
    body: 'Guarantees an interview with the medical school if requirements are met, but does not guarantee admission. An advantage, not a seat.',
  },
  {
    label: 'Regular premed path',
    body: 'The normal path: complete undergrad, take prerequisites, earn clinical/research/service experience, take the MCAT, and apply broadly. Most flexibility, least admissions certainty.',
  },
];

export function CertaintyExplainer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-semibold text-gray-900">
          Direct Medicine Programs: How Much Certainty Do They Really Give You?
        </span>
        <span className="text-gray-400">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          <p className="text-sm text-gray-600 italic">
            Some programs sound like they guarantee medical school, but the details matter. A true
            direct-med path, a conditional seat, a provisional early-assurance path, and a guaranteed
            interview are very different. This planner separates those categories so you can see how
            much uncertainty each program actually removes.
          </p>
          <ol className="flex flex-col gap-2">
            {LEVELS.map((level, i) => (
              <li key={level.label} className="text-sm">
                <span className="font-medium text-gray-900">
                  {i + 1}. {level.label}
                </span>
                <p className="text-gray-600">{level.body}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
