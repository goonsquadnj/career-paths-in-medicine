import type { Path } from '../types/path';
import { humanize } from '../lib/format';

const CATEGORY_CLASSES: Record<string, string> = {
  clinical: 'bg-rose-100 text-rose-800',
  non_clinical: 'bg-cyan-100 text-cyan-800',
};

const CARE_LEVEL_CLASSES: Record<string, string> = {
  high: 'text-red-700',
  medium: 'text-amber-700',
  low: 'text-green-700',
};

export function PathCard({ path }: { path: Path }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm flex flex-col gap-2">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{path.name}</h3>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${CATEGORY_CLASSES[path.category] ?? 'bg-gray-100 text-gray-800'}`}
        >
          {humanize(path.category)}
        </span>
        {path.requires_medical_school && (
          <span className="rounded px-2 py-0.5 text-xs font-medium bg-violet-100 text-violet-800">
            Requires medical school
          </span>
        )}
      </div>

      <p className="text-sm text-gray-700">{path.what_they_do}</p>

      <hr className="border-gray-100" />

      <div className="text-sm text-gray-700 grid grid-cols-1 gap-y-1">
        <div>
          <span className="text-gray-500">Training length</span>
          <div>{path.training_length_years}</div>
        </div>
        <div>
          <span className="text-gray-500">Typical degrees</span>
          <div>{path.typical_degrees.join(', ')}</div>
        </div>
        <div>
          <span className="text-gray-500">Patient-care intensity</span>
          <div className={`font-medium ${CARE_LEVEL_CLASSES[path.patient_care_level] ?? 'text-gray-600'}`}>
            {humanize(path.patient_care_level)}
          </div>
        </div>
      </div>

      {path.admissions_difficulty_notes && (
        <div className="text-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Admissions</div>
          <p className="text-gray-700">{path.admissions_difficulty_notes}</p>
        </div>
      )}

      {path.lifestyle_notes && (
        <div className="text-sm">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Lifestyle</div>
          <p className="text-gray-700">{path.lifestyle_notes}</p>
        </div>
      )}

      {path.salary_range_notes && (
        <p className="text-sm text-gray-600 italic">{path.salary_range_notes}</p>
      )}

      {path.best_for.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Best for</div>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {path.best_for.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {path.watch_outs.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Watch outs</div>
          <ul className="list-disc list-inside text-sm text-red-700">
            {path.watch_outs.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
