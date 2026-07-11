import type { Program } from '../types/program';
import { CERTAINTY_LABELS } from '../types/program';
import { fmtDataStatus, humanize } from '../lib/format';

const CONFIDENCE_CLASSES: Record<string, string> = {
  high: 'text-green-700',
  medium_high: 'text-green-700',
  medium: 'text-amber-700',
  low: 'text-gray-500',
};

const CERTAINTY_BADGE_CLASSES: Record<string, string> = {
  direct_medical_pathway: 'bg-green-100 text-green-800',
  conditional_medical_school_seat: 'bg-blue-100 text-blue-800',
  guaranteed_admission_with_high_continuation_requirements: 'bg-amber-100 text-amber-800',
  provisional_acceptance: 'bg-orange-100 text-orange-800',
  early_assurance_after_enrollment: 'bg-yellow-100 text-yellow-800',
  guaranteed_interview_not_admission: 'bg-red-100 text-red-800',
  regular_premed_with_advising: 'bg-gray-100 text-gray-800',
};

export function ProgramCard({ program }: { program: Program }) {
  const badgeLabel = CERTAINTY_LABELS[program.certainty_category] ?? program.certainty_category;
  const badgeClass = CERTAINTY_BADGE_CLASSES[program.certainty_category] ?? 'bg-gray-100 text-gray-800';

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm flex flex-col gap-2">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
        <p className="text-sm text-gray-500">
          {program.undergraduate_school} &rarr; {program.medical_school}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <span className={`self-start rounded px-2 py-0.5 text-xs font-medium ${badgeClass}`}>{badgeLabel}</span>
        {program.medical_seat_certainty && (
          <p className="text-xs text-gray-500">{humanize(program.medical_seat_certainty)}</p>
        )}
      </div>

      <div className="text-sm text-gray-700 grid grid-cols-2 gap-x-3 gap-y-1">
        <div>
          <span className="text-gray-500">Total years</span>
          <div>{program.total_years}</div>
        </div>
        <div>
          <span className="text-gray-500">Type</span>
          <div>{program.program_type}</div>
        </div>
        {program.college_gpa_minimum != null && (
          <div>
            <span className="text-gray-500">Min GPA</span>
            <div>{program.college_gpa_minimum}</div>
          </div>
        )}
        {program.mcat_policy && (
          <div className="col-span-2">
            <span className="text-gray-500">MCAT</span>
            <div>{program.mcat_policy}</div>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {program.strategic_value && (
        <p className="text-sm text-gray-600 italic">{program.strategic_value}</p>
      )}

      {program.best_for.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Best for</div>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {program.best_for.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {program.watch_outs.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Watch outs</div>
          <ul className="list-disc list-inside text-sm text-red-700">
            {program.watch_outs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-gray-100 pt-1.5 text-xs text-gray-400 flex flex-col gap-0.5">
        <p>
          <span className={`font-medium ${CONFIDENCE_CLASSES[program.source_confidence] ?? 'text-gray-500'}`}>
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
                    className="underline text-brand-700 hover:text-brand-800"
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
    </article>
  );
}
