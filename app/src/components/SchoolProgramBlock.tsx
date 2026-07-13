import { useState } from 'react';
import type { Program } from '../types/program';
import { CERTAINTY_LABELS } from '../types/program';
import { fmtDataStatus, humanize } from '../lib/format';

// Embedded direct-med program block, shown inside a SchoolCard for schools
// that have one. Replaces the old standalone "Medical pathway programs"
// section (docs/ux_redesign_plan.md Phase 2.5 — Jeff: "why are we showing
// the same schools twice"). A program is an attribute of its school, not a
// separate destination, so it lives inside the school's own card now.

const CERTAINTY_BADGE_CLASSES: Record<string, string> = {
  direct_medical_pathway: 'bg-green-100 text-green-800',
  conditional_medical_school_seat: 'bg-blue-100 text-blue-800',
  guaranteed_admission_with_high_continuation_requirements: 'bg-amber-100 text-amber-800',
  provisional_acceptance: 'bg-orange-100 text-orange-800',
  early_assurance_after_enrollment: 'bg-yellow-100 text-yellow-800',
  guaranteed_interview_not_admission: 'bg-red-100 text-red-800',
  regular_premed_with_advising: 'bg-gray-100 text-gray-800',
};

const CONFIDENCE_CLASSES: Record<string, string> = {
  high: 'text-green-700',
  medium_high: 'text-green-700',
  medium: 'text-amber-700',
  low: 'text-gray-500',
};

export function SchoolProgramBlock({ program }: { program: Program }) {
  const [expanded, setExpanded] = useState(false);
  const badgeLabel = CERTAINTY_LABELS[program.certainty_category] ?? program.certainty_category;
  const badgeClass = CERTAINTY_BADGE_CLASSES[program.certainty_category] ?? 'bg-gray-100 text-gray-800';

  return (
    <div className="rounded-md border border-violet-200 bg-violet-50 px-3 py-2 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex items-center justify-between gap-2 text-left min-h-11"
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-violet-900">{program.name}</span>
          <span className={`self-start rounded px-2 py-0.5 text-xs font-medium ${badgeClass}`}>
            {badgeLabel}
          </span>
        </div>
        <span className="text-violet-400 shrink-0">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="flex flex-col gap-2 border-t border-violet-100 pt-2 text-sm text-violet-900">
          {program.medical_seat_certainty && (
            <p className="text-xs text-violet-700">{humanize(program.medical_seat_certainty)}</p>
          )}

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
            <div>
              <span className="text-xs text-violet-600">Total years</span>
              <div>{program.total_years}</div>
            </div>
            <div>
              <span className="text-xs text-violet-600">Type</span>
              <div>{program.program_type}</div>
            </div>
            {program.college_gpa_minimum != null && (
              <div>
                <span className="text-xs text-violet-600">Min GPA</span>
                <div>{program.college_gpa_minimum}</div>
              </div>
            )}
            {program.mcat_policy && (
              <div className="col-span-2">
                <span className="text-xs text-violet-600">MCAT</span>
                <div>{program.mcat_policy}</div>
              </div>
            )}
          </div>

          {program.strategic_value && <p className="italic text-violet-700">{program.strategic_value}</p>}

          {program.best_for.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                Best for
              </div>
              <ul className="list-disc list-inside">
                {program.best_for.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {program.watch_outs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                Watch outs
              </div>
              <ul className="list-disc list-inside text-red-700">
                {program.watch_outs.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="border-t border-violet-100 pt-1.5 text-xs text-violet-500 flex flex-col gap-0.5">
            <p>
              <span className={`font-medium ${CONFIDENCE_CLASSES[program.source_confidence] ?? 'text-violet-500'}`}>
                Confidence: {humanize(program.source_confidence)}
              </span>
              {' · '}
              {fmtDataStatus(program.data_status)}
            </p>
            {program.sources.length > 0 && (
              <p>
                Sources:{' '}
                {program.sources.map((src, i) => (
                  <span key={src.url || src.name}>
                    {i > 0 && ', '}
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-violet-700"
                      >
                        {src.name}
                      </a>
                    ) : (
                      src.name
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
