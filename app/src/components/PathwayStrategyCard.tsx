import { useState } from 'react';
import type { School } from '../types/school';
import type { PathwayStrategy } from '../types/pathwayStrategy';
import { deriveUndergradCost } from '../lib/strategyCost';
import { fmtMoney } from '../lib/format';

const FLEXIBILITY_CLASSES: Record<string, string> = {
  high: 'text-green-700',
  medium: 'text-amber-700',
  low: 'text-red-700',
};

const CERTAINTY_CLASSES: Record<string, string> = {
  higher: 'text-green-700',
  typical: 'text-stone-700',
  lower: 'text-amber-700',
};

interface PathwayStrategyCardProps {
  strategy: PathwayStrategy;
  schools: School[];
  medicalSchoolCostRange: { low: number; high: number };
  onSeeSchools: (strategy: PathwayStrategy) => void;
}

export function PathwayStrategyCard({
  strategy,
  schools,
  medicalSchoolCostRange,
  onSeeSchools,
}: PathwayStrategyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const undergradCost = deriveUndergradCost(schools, strategy.undergrad_leg);

  const totalLow = undergradCost ? undergradCost.min4yr + medicalSchoolCostRange.low : null;
  const totalHigh = undergradCost ? undergradCost.max4yr + medicalSchoolCostRange.high : null;

  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm flex flex-col gap-4">
      <div>
        <h3 className="font-display text-xl font-normal text-stone-900">{strategy.name}</h3>
        <p className="text-sm text-stone-600 mt-1">{strategy.tagline}</p>
      </div>

      {/* Two-leg flow: undergrad -> grad -> endpoint */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800">
          {strategy.undergrad_leg.label}
        </span>
        <span className="text-brand-400 text-sm" aria-hidden>
          →
        </span>
        <span className="rounded-full border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800">
          {strategy.grad_leg.label}
        </span>
        <span className="text-brand-400 text-sm" aria-hidden>
          →
        </span>
        <span className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-700">
          Physician
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm border-t border-stone-100 pt-3">
        <div className="col-span-2">
          <span className="text-xs text-stone-500">Estimated total cost (undergrad + med school)</span>
          <div className="text-base font-semibold text-stone-900">
            {totalLow != null && totalHigh != null
              ? `${fmtMoney(totalLow)} – ${fmtMoney(totalHigh)}`
              : 'Not enough priced schools yet'}
          </div>
        </div>
        <div>
          <span className="text-xs text-stone-500">Flexibility</span>
          <div className={`font-medium capitalize ${FLEXIBILITY_CLASSES[strategy.tradeoffs.flexibility] ?? 'text-stone-700'}`}>
            {strategy.tradeoffs.flexibility}
          </div>
        </div>
        <div>
          <span className="text-xs text-stone-500">Admissions certainty</span>
          <div className={`font-medium capitalize ${CERTAINTY_CLASSES[strategy.tradeoffs.admissions_certainty] ?? 'text-stone-700'}`}>
            {strategy.tradeoffs.admissions_certainty}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="min-h-11 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          {expanded ? 'Hide details' : 'View details'}
        </button>
        <button
          type="button"
          onClick={() => onSeeSchools(strategy)}
          className="min-h-11 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          See matching schools →
        </button>
      </div>

      {expanded && (
        <div className="flex flex-col gap-3 border-t border-stone-100 pt-3 text-sm text-stone-700">
          <p>{strategy.logic}</p>

          {strategy.best_for.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Best for</div>
              <ul className="list-disc list-inside">
                {strategy.best_for.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {strategy.watch_outs.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Watch outs</div>
              <ul className="list-disc list-inside text-red-700">
                {strategy.watch_outs.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {undergradCost && (
            <p className="text-xs text-stone-400">
              Undergrad range uses sticker cost (not Scorecard's aid-adjusted net
              price — see "How to read this data" on Schools), derived from{' '}
              {undergradCost.schoolCount} school{undergradCost.schoolCount === 1 ? '' : 's'} in
              this app's current data — {fmtMoney(undergradCost.min4yr)} –{' '}
              {fmtMoney(undergradCost.max4yr)} for 4 years. Real financial aid can lower this a
              lot, especially at need-aid-generous elite schools.
            </p>
          )}
        </div>
      )}
    </article>
  );
}
