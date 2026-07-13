import { useEffect, useMemo, useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { useData } from './lib/useData';
import { SchoolCard } from './components/SchoolCard';
import { PathCard } from './components/PathCard';
import { FilterBar, type DirectMedFilter } from './components/FilterBar';
import { CertaintyExplainer } from './components/CertaintyExplainer';
import { DataMethodologyExplainer } from './components/DataMethodologyExplainer';
import { SchoolMap } from './components/SchoolMap';
import { StartLanding } from './components/StartLanding';
import { SectionHeader } from './components/SectionHeader';
import { CareerCompareTable } from './components/CareerCompareTable';
import { NotesList } from './components/NotesList';
import type { FamilyCostFlag, DistanceCategory } from './types/school';
import type { Program } from './types/program';
import { GROUP_ORDER, PATH_GROUP_LABELS, type PathGroup } from './types/path';
import { useWishlistStore, type WishlistTier } from './store/wishlistStore';
import { usePlanStore } from './store/planStore';

interface Filters {
  buckets: string[];
  statuses: string[];
  costFlags: string[];
  directMed: DirectMedFilter;
  // null = not narrowed by the user yet; falls back to the full data range.
  minPrice: number | null;
  maxPrice: number | null;
}

// 4-tab structure per docs/ux_redesign_plan.md: Start · Explore Careers ·
// Schools · My Plan (renamed from Wishlist). "Schools & Programs" was
// renamed to just "Schools" in Phase 2.5 — programs are now embedded inside
// their school's own card, not a separate standalone section.
type Tab = 'start' | 'careers' | 'schools' | 'plan';

const TABS: { id: Tab; label: string }[] = [
  { id: 'start', label: 'Start' },
  { id: 'careers', label: 'Explore Careers' },
  { id: 'schools', label: 'Schools' },
  { id: 'plan', label: 'My Plan' },
];

const WISHLIST_TIER_ORDER: WishlistTier[] = ['reach', 'target', 'safety'];
const WISHLIST_TIER_TITLES: Record<WishlistTier, string> = {
  reach: 'Reach',
  target: 'Target',
  safety: 'Safety',
};

// Default school sort per Phase 2.5 review feedback ("cards seem randomly
// placed, no default sort") — closest to home first, matching the vision's
// distance-from-home framing.
const DISTANCE_ORDER: DistanceCategory[] = [
  'local',
  'regional_drive',
  'far_drive_or_short_flight',
  'far_from_home',
];

const EMPTY_FILTERS: Filters = {
  buckets: [],
  statuses: [],
  costFlags: [],
  directMed: 'any',
  minPrice: null,
  maxPrice: null,
};

// Simple nice-to-have filter persistence (docs/release_plan.md R2 item 4):
// keep the last-used filter selections so reopening the app doesn't reset
// them. Kept deliberately simple — plain localStorage, no store/migration.
// Bumped to v2 for the Phase 2.5 filter-shape change (single values -> arrays
// + price range); old v1 values are simply ignored/replaced.
const FILTERS_STORAGE_KEY = 'lucy-planner:filters:v2';

function loadStoredFilters(): Filters {
  try {
    const raw = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!raw) return EMPTY_FILTERS;
    const parsed = JSON.parse(raw);
    return {
      buckets: Array.isArray(parsed.buckets) ? parsed.buckets : [],
      statuses: Array.isArray(parsed.statuses) ? parsed.statuses : [],
      costFlags: Array.isArray(parsed.costFlags) ? parsed.costFlags : [],
      directMed: parsed.directMed === 'yes' || parsed.directMed === 'no' ? parsed.directMed : 'any',
      minPrice: typeof parsed.minPrice === 'number' ? parsed.minPrice : null,
      maxPrice: typeof parsed.maxPrice === 'number' ? parsed.maxPrice : null,
    };
  } catch {
    return EMPTY_FILTERS;
  }
}

function App() {
  const { schools, programs, paths, loading, error } = useData();
  const [tab, setTab] = useState<Tab>('start');
  const [filters, setFilters] = useState<Filters>(loadStoredFilters);
  const [highlightedSchoolId, setHighlightedSchoolId] = useState<string | null>(null);
  // Map is secondary/collapsed by default (docs/ux_redesign_plan.md: "the
  // current dataset is too small for the map to dominate").
  const [showMap, setShowMap] = useState(false);
  // Which career groups the Start landing routed into; empty = show all
  // groups (the "not sure yet" / default state).
  const [careerGroupFilter, setCareerGroupFilter] = useState<PathGroup[]>([]);
  // Explore Careers view mode (docs/ux_redesign_plan.md Phase 3).
  const [careersView, setCareersView] = useState<'grouped' | 'compare'>('grouped');
  const wishlist = useWishlistStore((s) => s.wishlist);
  const plan = usePlanStore();

  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const buckets = useMemo(
    () => Array.from(new Set(schools.map((s) => s.school_bucket))).sort(),
    [schools],
  );
  const statuses = useMemo(
    () => Array.from(new Set(schools.map((s) => s.v1_status))).sort(),
    [schools],
  );
  const costFlags = useMemo(
    () =>
      Array.from(
        new Set(schools.map((s) => s.family_cost_flag).filter((v): v is FamilyCostFlag => !!v)),
      ).sort(),
    [schools],
  );

  // Full data-driven bounds for the net-price range slider. Falls back to a
  // sane default before schools have loaded.
  const priceBounds = useMemo((): readonly [number, number] => {
    const prices = schools
      .map((s) => s.scorecard_avg_annual_cost)
      .filter((p): p is number => p != null);
    if (prices.length === 0) return [0, 100000] as const;
    const min = Math.floor(Math.min(...prices) / 1000) * 1000;
    const max = Math.ceil(Math.max(...prices) / 1000) * 1000;
    return [min, max] as const;
  }, [schools]);

  const effectiveMinPrice = filters.minPrice ?? priceBounds[0];
  const effectiveMaxPrice = filters.maxPrice ?? priceBounds[1];

  const filteredSchools = useMemo(() => {
    const priceNarrowed = effectiveMinPrice > priceBounds[0] || effectiveMaxPrice < priceBounds[1];

    return schools
      .filter((s) => {
        if (filters.buckets.length > 0 && !filters.buckets.includes(s.school_bucket)) return false;
        if (filters.statuses.length > 0 && !filters.statuses.includes(s.v1_status)) return false;
        if (
          filters.costFlags.length > 0 &&
          (!s.family_cost_flag || !filters.costFlags.includes(s.family_cost_flag))
        )
          return false;
        if (filters.directMed === 'yes' && !s.has_direct_med_program) return false;
        if (filters.directMed === 'no' && s.has_direct_med_program) return false;
        // Only enforce the price band once the user has actually narrowed it —
        // otherwise a school with an unverified null price would be silently
        // excluded even at "full range" (never assume it's in range if unknown).
        if (priceNarrowed) {
          if (s.scorecard_avg_annual_cost == null) return false;
          if (
            s.scorecard_avg_annual_cost < effectiveMinPrice ||
            s.scorecard_avg_annual_cost > effectiveMaxPrice
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        const ai = DISTANCE_ORDER.indexOf(a.distance_from_home_category);
        const bi = DISTANCE_ORDER.indexOf(b.distance_from_home_category);
        if (ai !== bi) return ai - bi;
        return a.name.localeCompare(b.name);
      });
  }, [schools, filters, priceBounds, effectiveMinPrice, effectiveMaxPrice]);

  // Direct-med program records keyed by id, so each school can embed its own
  // matched program(s) inline instead of a separate standalone list
  // (docs/ux_redesign_plan.md Phase 2.5).
  const programsById = useMemo(() => {
    const map = new Map<string, Program>();
    for (const p of programs) map.set(p.id, p);
    return map;
  }, [programs]);

  // Paths visible under the current Start-routed group filter — shared by
  // both the grouped-cards view and the Compare table (Phase 3).
  const visiblePaths = useMemo(
    () =>
      careerGroupFilter.length === 0
        ? paths
        : paths.filter((p) => careerGroupFilter.includes(p.group)),
    [paths, careerGroupFilter],
  );

  const groupedPaths = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      paths: visiblePaths.filter((p) => p.group === group),
    })).filter((g) => g.paths.length > 0);
  }, [visiblePaths]);

  const wishlistedSchools = useMemo(() => {
    const grouped: Record<WishlistTier, typeof schools> = { reach: [], target: [], safety: [] };
    for (const school of schools) {
      const t = wishlist[school.id];
      if (t) grouped[t].push(school);
    }
    return grouped;
  }, [schools, wishlist]);

  // Clicking a map pin (or a wishlist card) jumps to the Schools tab, scrolls
  // to that school's card, and briefly highlights it.
  const handleSelectSchool = (schoolId: string) => {
    setTab('schools');
    // Wait a tick for the Schools tab (and its card grid) to render.
    requestAnimationFrame(() => {
      const el = document.getElementById(`school-card-${schoolId}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    setHighlightedSchoolId(schoolId);
    window.setTimeout(() => setHighlightedSchoolId((cur) => (cur === schoolId ? null : cur)), 2500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-8">
      {tab !== 'start' && (
        <header>
          <h1 className="font-display text-3xl font-normal text-stone-900">
            Healthcare Pathway Planner
          </h1>
          <p className="mt-1 text-stone-600">
            v1 data — a planning aid, not final admissions advice.
          </p>
        </header>
      )}

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Error loading data: {error}
        </p>
      )}

      {loading && <p className="text-gray-500">Loading…</p>}

      {!loading && !error && (
        <>
          <div className="flex gap-2 border-b border-stone-200 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 min-h-11 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
                  tab === t.id
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'start' && (
            <StartLanding
              onChoose={(groups) => {
                setCareerGroupFilter(groups);
                setTab('careers');
              }}
            />
          )}

          {tab === 'careers' && (
            <section className="flex flex-col gap-5">
              <SectionHeader
                title="Explore careers"
                subtitle="Fifteen healthcare career paths — what each one actually involves, how long training takes, and who it tends to fit. Salary is deliberately left qualitative for now; see Epic K for the eventual cross-checked comparison."
              />

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-lg border border-stone-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setCareersView('grouped')}
                    aria-pressed={careersView === 'grouped'}
                    className={`min-h-11 px-4 text-sm font-medium ${
                      careersView === 'grouped'
                        ? 'bg-brand-600 text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setCareersView('compare')}
                    aria-pressed={careersView === 'compare'}
                    className={`min-h-11 px-4 text-sm font-medium border-l border-stone-300 ${
                      careersView === 'compare'
                        ? 'bg-brand-600 text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Compare
                  </button>
                </div>

                {careerGroupFilter.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCareerGroupFilter([])}
                    className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-600 hover:bg-stone-50"
                  >
                    Show all careers
                  </button>
                )}
              </div>

              {careersView === 'compare' ? (
                <CareerCompareTable paths={visiblePaths} />
              ) : (
                groupedPaths.map(({ group, paths: groupPaths }) => (
                  <div key={group} className="flex flex-col gap-3">
                    <h3 className="font-display text-xl font-normal text-stone-800">
                      {PATH_GROUP_LABELS[group]}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {groupPaths.map((path) => (
                        <PathCard key={path.id} path={path} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          )}

          {tab === 'schools' && (
            <section className="flex flex-col gap-4">
              <SectionHeader
                title="Schools"
                subtitle="Which schools might support the path you're exploring — cost, outcomes, pre-health ecosystem, and any direct-med pathway, side by side. Sorted closest to home first."
              />

              <div className="flex flex-col gap-2">
                <DataMethodologyExplainer />
                <CertaintyExplainer />
              </div>

              <FilterBar
                buckets={buckets}
                statuses={statuses}
                costFlags={costFlags}
                selectedBuckets={filters.buckets}
                selectedStatuses={filters.statuses}
                selectedCostFlags={filters.costFlags}
                directMed={filters.directMed}
                minPrice={effectiveMinPrice}
                maxPrice={effectiveMaxPrice}
                priceBounds={priceBounds}
                onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
                onClear={() => setFilters(EMPTY_FILTERS)}
                visibleCount={filteredSchools.length}
                totalCount={schools.length}
              />

              <button
                type="button"
                onClick={() => setShowMap((v) => !v)}
                className="self-start flex items-center gap-2 min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                <MapIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {showMap ? 'Hide map' : 'Show map'}
              </button>
              {showMap && <SchoolMap schools={filteredSchools} onSelectSchool={handleSelectSchool} />}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSchools.map((school) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    highlighted={school.id === highlightedSchoolId}
                    programs={school.direct_med_program_ids
                      .map((id) => programsById.get(id))
                      .filter((p): p is Program => p != null)}
                  />
                ))}
              </div>
            </section>
          )}

          {tab === 'plan' && (
            <section className="flex flex-col gap-6">
              <SectionHeader
                title="My plan"
                subtitle="Your own working list — mark schools reach / target / safety from a school card, and they'll show up here, grouped by tier. It sticks around across visits (saved in this browser)."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-4">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                    Selected career path
                  </label>
                  <select
                    value={plan.selectedPathId ?? ''}
                    onChange={(e) => plan.setSelectedPathId(e.target.value || null)}
                    className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">Not decided yet</option>
                    {paths.map((path) => (
                      <option key={path.id} value={path.id}>
                        {path.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-4">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                    Preferred training route
                  </label>
                  <textarea
                    value={plan.preferredRoute}
                    onChange={(e) => plan.setPreferredRoute(e.target.value)}
                    placeholder="e.g. value undergrad in-state, then aim for a strong medical school"
                    rows={3}
                    className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm resize-y"
                  />
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-4">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                    Open questions
                  </label>
                  <NotesList
                    notes={plan.openQuestions}
                    onAdd={plan.addOpenQuestion}
                    onRemove={plan.removeOpenQuestion}
                    placeholder="e.g. what does a net price calculator say for us?"
                  />
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-4">
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                    Next steps
                  </label>
                  <NotesList
                    notes={plan.nextSteps}
                    onAdd={plan.addNextStep}
                    onRemove={plan.removeNextStep}
                    placeholder="e.g. schedule a Rutgers campus visit"
                  />
                </div>
              </div>

              {WISHLIST_TIER_ORDER.every((t) => wishlistedSchools[t].length === 0) && (
                <p className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
                  Nothing here yet. Go to Schools and use the tier buttons on a school
                  card to add one.
                </p>
              )}

              {WISHLIST_TIER_ORDER.map((t) =>
                wishlistedSchools[t].length > 0 ? (
                  <div key={t} className="flex flex-col gap-3">
                    <h3 className="font-display text-lg font-normal text-stone-800">
                      {WISHLIST_TIER_TITLES[t]}{' '}
                      <span className="text-sm font-normal text-stone-500">
                        ({wishlistedSchools[t].length})
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistedSchools[t].map((school) => (
                        <SchoolCard key={school.id} school={school} />
                      ))}
                    </div>
                  </div>
                ) : null,
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default App;
