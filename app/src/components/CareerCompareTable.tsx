import type { Path } from '../types/path';
import { PATH_GROUP_LABELS } from '../types/path';
import { DIFFICULTY_CLASSES, difficultyLabel } from '../lib/labels';

// Analytical comparison view for Explore Careers (docs/ux_redesign_plan.md
// Phase 3). Columns are exactly the structured, non-invented fields already
// on each Path record — no salary column, no fabricated scores (per the
// locked decision to keep career-path data honestly qualitative).
export function CareerCompareTable({ paths }: { paths: Path[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50">
            <th className="px-4 py-3 font-medium text-stone-500 whitespace-nowrap">Path</th>
            <th className="px-4 py-3 font-medium text-stone-500 whitespace-nowrap">Group</th>
            <th className="px-4 py-3 font-medium text-stone-500 whitespace-nowrap">Training length</th>
            <th className="px-4 py-3 font-medium text-stone-500 whitespace-nowrap">Med school?</th>
            <th className="px-4 py-3 font-medium text-stone-500 whitespace-nowrap">Patient care</th>
            <th className="px-4 py-3 font-medium text-stone-500 whitespace-nowrap">Admissions</th>
            <th className="px-4 py-3 font-medium text-stone-500">Best fit</th>
          </tr>
        </thead>
        <tbody>
          {paths.map((path) => (
            <tr key={path.id} className="border-b border-stone-100 last:border-0">
              <td className="px-4 py-3 font-medium text-stone-900 whitespace-nowrap">{path.name}</td>
              <td className="px-4 py-3 text-stone-600 whitespace-nowrap">
                {PATH_GROUP_LABELS[path.group]}
              </td>
              <td className="px-4 py-3 text-stone-700 whitespace-nowrap">
                {path.training_length_short}
              </td>
              <td className="px-4 py-3 text-stone-700 whitespace-nowrap">
                {path.requires_medical_school ? 'Yes' : 'No'}
              </td>
              <td className="px-4 py-3 text-stone-700 capitalize whitespace-nowrap">
                {path.patient_care_level}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`font-medium ${DIFFICULTY_CLASSES[path.admissions_difficulty] ?? 'text-stone-700'}`}>
                  {difficultyLabel(path.admissions_difficulty)}
                </span>
              </td>
              <td className="px-4 py-3 text-stone-600 min-w-[16rem]">{path.best_fit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
