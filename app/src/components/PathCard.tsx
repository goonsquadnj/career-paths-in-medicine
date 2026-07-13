import { useState } from 'react';
import type { Path } from '../types/path';

// Compact comparison card per docs/ux_redesign_plan.md Phase 2 — replaces the
// old wall-of-text card. Structured fields up front; deep prose (what it is,
// admissions notes, lifestyle, salary, best-for/watch-outs) sits behind
// "View details" (progressive disclosure, per docs/design_system.md).

const DIFFICULTY_CLASSES: Record<string, string> = {
  low: 'text-green-700',
  moderate: 'text-amber-700',
  high: 'text-orange-700',
  very_high: 'text-red-700',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  very_high: 'Very high',
};

export function PathCard({ path }: { path: Path }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm flex flex-col gap-3">
      <div>
        <h3 className="text-lg font-medium text-stone-900">{path.name}</h3>
        <p className="text-sm text-stone-600 mt-1">{path.best_fit}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
        <div>
          <span className="text-xs text-stone-500">Training length</span>
          <div className="font-medium text-stone-800">{path.training_length_short}</div>
        </div>
        <div>
          <span className="text-xs text-stone-500">Admissions difficulty</span>
          <div
            className={`font-medium ${DIFFICULTY_CLASSES[path.admissions_difficulty] ?? 'text-stone-700'}`}
          >
            {DIFFICULTY_LABELS[path.admissions_difficulty] ?? path.admissions_difficulty}
          </div>
        </div>
        <div>
          <span className="text-xs text-stone-500">Med school required?</span>
          <div className="font-medium text-stone-800">
            {path.requires_medical_school ? 'Yes' : 'No'}
          </div>
        </div>
        <div>
          <span className="text-xs text-stone-500">Patient-care intensity</span>
          <div className="font-medium text-stone-800 capitalize">{path.patient_care_level}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="self-start min-h-11 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        {expanded ? 'Hide details' : 'View details'}
      </button>

      {expanded && (
        <div className="flex flex-col gap-3 border-t border-stone-100 pt-3 text-sm text-stone-700">
          <p>{path.what_they_do}</p>

          <div>
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
              Admissions
            </div>
            <p>{path.admissions_difficulty_notes}</p>
          </div>

          <div>
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
              Lifestyle
            </div>
            <p>{path.lifestyle_notes}</p>
          </div>

          <p className="italic text-stone-500">{path.salary_range_notes}</p>

          {path.best_for.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Best for
              </div>
              <ul className="list-disc list-inside">
                {path.best_for.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {path.watch_outs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Watch outs
              </div>
              <ul className="list-disc list-inside text-red-700">
                {path.watch_outs.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
