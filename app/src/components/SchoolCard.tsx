import type { School } from '../types/school';
import { fmtCurrency, fmtMoney, fmtPct, humanize } from '../lib/format';
import { bucketChipClass } from '../lib/bucketColors';
import { useWishlistStore, type WishlistTier } from '../store/wishlistStore';

const STATUS_CLASSES: Record<string, string> = {
  likely_include: 'bg-green-100 text-green-800',
  possible_include: 'bg-yellow-100 text-yellow-800',
};
const DEFAULT_STATUS_CLASS = 'bg-gray-100 text-gray-700';

const GPA_CLASSES: Record<string, string> = {
  low: 'text-green-700',
  medium: 'text-amber-700',
  high: 'text-red-700',
};

const TIER_LABELS: Record<WishlistTier, string> = {
  reach: 'Reach',
  target: 'Target',
  safety: 'Safety',
};

const TIER_ACTIVE_CLASSES: Record<WishlistTier, string> = {
  reach: 'bg-red-600 text-white border-red-600',
  target: 'bg-amber-500 text-white border-amber-500',
  safety: 'bg-green-600 text-white border-green-600',
};

const TIER_INACTIVE_CLASS = 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50';

function WishlistTierPicker({ schoolId }: { schoolId: string }) {
  const tier = useWishlistStore((s) => s.wishlist[schoolId]);
  const toggleTier = useWishlistStore((s) => s.toggleTier);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-gray-500">Wishlist:</span>
      <div className="flex gap-1">
        {(Object.keys(TIER_LABELS) as WishlistTier[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggleTier(schoolId, t)}
            className={`rounded border px-2 py-0.5 text-xs font-medium transition-colors ${
              tier === t ? TIER_ACTIVE_CLASSES[t] : TIER_INACTIVE_CLASS
            }`}
            aria-pressed={tier === t}
          >
            {TIER_LABELS[t]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SchoolCard({ school, highlighted }: { school: School; highlighted?: boolean }) {
  return (
    <article
      id={`school-card-${school.id}`}
      className={`rounded-lg border bg-white p-4 shadow-sm flex flex-col gap-2 transition-shadow ${
        highlighted ? 'border-blue-400 ring-2 ring-blue-300' : 'border-gray-200'
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
        <p className="text-sm text-gray-500">{school.location}</p>
      </div>

      <WishlistTierPicker schoolId={school.id} />

      <div className="flex flex-wrap gap-1.5">
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${bucketChipClass(school.school_bucket)}`}>
          {school.school_bucket}
        </span>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[school.v1_status] ?? DEFAULT_STATUS_CLASS}`}
        >
          {humanize(school.v1_status)}
        </span>
        {school.has_direct_med_program && (
          <span className="rounded px-2 py-0.5 text-xs font-medium bg-violet-100 text-violet-800">
            Has direct-med program
          </span>
        )}
      </div>

      <hr className="border-gray-100" />

      <div className="text-sm text-gray-700 grid grid-cols-2 gap-x-3 gap-y-1">
        <div>
          <span className="text-gray-500">Scorecard net price</span>
          <div>{fmtCurrency(school.scorecard_avg_annual_cost)}</div>
        </div>
        <div>
          <span className="text-gray-500">Cost flag</span>
          <div>{humanize(school.family_cost_flag)}</div>
        </div>
        <div>
          <span className="text-gray-500">Grad rate</span>
          <div>{fmtPct(school.scorecard_graduation_rate)}</div>
        </div>
        <div>
          <span className="text-gray-500">Acceptance</span>
          <div>{fmtPct(school.scorecard_acceptance_rate)}</div>
        </div>
        <div>
          <span className="text-gray-500">SAT average</span>
          <div>{school.scorecard_sat_average ?? 'n/a'}</div>
        </div>
        <div>
          <span className="text-gray-500">Earnings (10yr)</span>
          <div>{fmtMoney(school.scorecard_median_earnings_10yr)}</div>
        </div>
      </div>

      {school.gpa_risk && (
        <p className={`text-xs font-medium ${GPA_CLASSES[school.gpa_risk] ?? 'text-gray-600'}`}>
          GPA risk: {school.gpa_risk}
        </p>
      )}

      {school.parent_roi_note && (
        <p className="text-sm text-gray-600 italic">{school.parent_roi_note}</p>
      )}
    </article>
  );
}
