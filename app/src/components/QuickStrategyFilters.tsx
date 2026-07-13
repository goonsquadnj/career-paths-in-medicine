import type { PathwayStrategy } from '../types/pathwayStrategy';

// A compact 4-pill strip on the Schools tab, ties the Strategies tab's
// teaching content to the filter chips below it (docs/paths_journeys_plan.md
// — Jeff: "add these same 4 as filters on the schools tab and make it clear
// how these 4 map to the other filter groups"). No taglines/copy here — the
// full teaching cards live on Strategies; this is the "I already get it,
// just filter" shortcut. Hover previews which chips it maps to (ring, via
// FilterBar's previewBuckets/previewDirectMed); click applies for real.
interface QuickStrategyFiltersProps {
  strategies: PathwayStrategy[];
  onHover: (strategy: PathwayStrategy | null) => void;
  onApply: (strategy: PathwayStrategy) => void;
}

export function QuickStrategyFilters({ strategies, onHover, onApply }: QuickStrategyFiltersProps) {
  if (strategies.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
        Quick strategy filter
      </span>
      <div className="flex flex-wrap gap-1.5">
        {strategies.map((strategy) => (
          <button
            key={strategy.id}
            type="button"
            onMouseEnter={() => onHover(strategy)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(strategy)}
            onBlur={() => onHover(null)}
            onClick={() => onApply(strategy)}
            className="min-h-11 rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-medium text-stone-700 hover:border-brand-400 hover:bg-brand-50"
          >
            {strategy.name}
          </button>
        ))}
      </div>
    </div>
  );
}
