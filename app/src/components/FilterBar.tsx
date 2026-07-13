import { useState } from 'react';
import { statusLabel, costFlagLabel } from '../lib/labels';
import { fmtMoney } from '../lib/format';

export type DirectMedFilter = 'any' | 'yes' | 'no';

export interface FilterBarProps {
  buckets: string[];
  statuses: string[];
  costFlags: string[];
  selectedBuckets: string[];
  selectedStatuses: string[];
  selectedCostFlags: string[];
  directMed: DirectMedFilter;
  // Strategy-card hover preview (docs/paths_journeys_plan.md quick-filter
  // strip): buckets/direct-med value to ring-highlight WITHOUT applying them,
  // so hovering a strategy pill shows what it maps to before committing.
  previewBuckets?: string[];
  previewDirectMed?: DirectMedFilter | null;
  minPrice: number;
  maxPrice: number;
  priceBounds: readonly [number, number];
  onChange: (
    patch: Partial<{
      buckets: string[];
      statuses: string[];
      costFlags: string[];
      directMed: DirectMedFilter;
      minPrice: number;
      maxPrice: number;
    }>,
  ) => void;
  onClear: () => void;
  visibleCount: number;
  totalCount: number;
}

function toggleIn(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

// A group of toggle chips — all options visible at once, multi-select by
// clicking. Replaces the old single-select <select> dropdowns per
// docs/ux_redesign_plan.md Phase 2.5 (Jeff: "I can't multi-select... I'd want
// to see all the options in advance and just turn them on or off").
function ChipGroup({
  label,
  options,
  selected,
  previewed = [],
  onToggle,
  formatLabel,
}: {
  label: string;
  options: string[];
  selected: string[];
  previewed?: string[];
  onToggle: (value: string) => void;
  formatLabel?: (value: string) => string;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isActive = selected.includes(opt);
          // Preview = "this is what hovering a strategy pill would apply,"
          // deliberately a lighter ring rather than the solid selected fill
          // so it can't be mistaken for already-applied.
          const isPreviewed = !isActive && previewed.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              aria-pressed={isActive}
              className={`min-h-11 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600 text-white border-brand-600'
                  : isPreviewed
                    ? 'bg-white text-stone-600 border-brand-400 ring-2 ring-brand-300'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              {formatLabel ? formatLabel(opt) : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FilterBar({
  buckets,
  statuses,
  costFlags,
  selectedBuckets,
  selectedStatuses,
  selectedCostFlags,
  directMed,
  previewBuckets = [],
  previewDirectMed = null,
  minPrice,
  maxPrice,
  priceBounds,
  onChange,
  onClear,
  visibleCount,
  totalCount,
}: FilterBarProps) {
  // Filters default collapsed on mobile so they don't push the map and cards
  // far down the page before any content is visible (QA finding #4). Always
  // shown on sm+ screens regardless of this state.
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lo, hi] = priceBounds;
  const priceIsNarrowed = minPrice > lo || maxPrice < hi;
  const activeCount =
    selectedBuckets.length +
    selectedStatuses.length +
    selectedCostFlags.length +
    (directMed !== 'any' ? 1 : 0) +
    (priceIsNarrowed ? 1 : 0);

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="sm:hidden flex w-full min-h-11 items-center justify-between text-sm font-medium text-stone-700"
      >
        <span>Filters{activeCount > 0 ? ` (${activeCount} active)` : ''}</span>
        <span className="text-stone-400">{mobileOpen ? '−' : '+'}</span>
      </button>

      <div className={`${mobileOpen ? 'flex' : 'hidden'} sm:flex flex-col gap-4 mt-4 sm:mt-0`}>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
          <ChipGroup
            label="Bucket"
            options={buckets}
            selected={selectedBuckets}
            previewed={previewBuckets}
            onToggle={(v) => onChange({ buckets: toggleIn(selectedBuckets, v) })}
          />
          <ChipGroup
            label="Status"
            options={statuses}
            selected={selectedStatuses}
            onToggle={(v) => onChange({ statuses: toggleIn(selectedStatuses, v) })}
            formatLabel={statusLabel}
          />
          <ChipGroup
            label="Cost flag"
            options={costFlags}
            selected={selectedCostFlags}
            onToggle={(v) => onChange({ costFlags: toggleIn(selectedCostFlags, v) })}
            formatLabel={costFlagLabel}
          />
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
              Direct-med program
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { value: 'any', label: 'Any' },
                  { value: 'yes', label: 'Has program' },
                  { value: 'no', label: 'No program' },
                ] as const
              ).map((opt) => {
                const isActive = directMed === opt.value;
                const isPreviewed = !isActive && previewDirectMed === opt.value;
                return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ directMed: opt.value })}
                  aria-pressed={isActive}
                  className={`min-h-11 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white border-brand-600'
                      : isPreviewed
                        ? 'bg-white text-stone-600 border-brand-400 ring-2 ring-brand-300'
                        : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {opt.label}
                </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 max-w-md">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
            Net price range: {fmtMoney(minPrice)} – {fmtMoney(maxPrice)}
          </span>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={lo}
              max={hi}
              step={1000}
              value={minPrice}
              onChange={(e) => {
                const next = Math.min(Number(e.target.value), maxPrice);
                onChange({ minPrice: next });
              }}
              aria-label="Minimum net price"
              className="w-full accent-brand-600"
            />
            <input
              type="range"
              min={lo}
              max={hi}
              step={1000}
              value={maxPrice}
              onChange={(e) => {
                const next = Math.max(Number(e.target.value), minPrice);
                onChange({ maxPrice: next });
              }}
              aria-label="Maximum net price"
              className="w-full accent-brand-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-600 hover:bg-stone-100"
            >
              Clear filters
            </button>
          )}
          <span className="text-sm text-stone-500">
            Showing {visibleCount} of {totalCount} schools
          </span>
        </div>
      </div>
    </div>
  );
}
