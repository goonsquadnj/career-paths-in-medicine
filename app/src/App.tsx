import { useEffect, useMemo, useState } from 'react';
import { useData } from './lib/useData';
import { SchoolCard } from './components/SchoolCard';
import { ProgramCard } from './components/ProgramCard';
import { PathCard } from './components/PathCard';
import { FilterBar } from './components/FilterBar';
import { CertaintyExplainer } from './components/CertaintyExplainer';
import { SchoolMap } from './components/SchoolMap';
import { CERTAINTY_ORDER } from './types/program';
import type { FamilyCostFlag } from './types/school';
import { useWishlistStore, type WishlistTier } from './store/wishlistStore';

interface Filters {
  bucket: string;
  status: string;
  costFlag: string;
  directMed: string;
}

type Tab = 'schools' | 'programs' | 'paths' | 'wishlist';

const TABS: { id: Tab; label: string }[] = [
  { id: 'schools', label: 'Schools' },
  { id: 'programs', label: 'Programs' },
  { id: 'paths', label: 'Career Paths' },
  { id: 'wishlist', label: 'My Wishlist' },
];

const WISHLIST_TIER_ORDER: WishlistTier[] = ['reach', 'target', 'safety'];
const WISHLIST_TIER_TITLES: Record<WishlistTier, string> = {
  reach: 'Reach',
  target: 'Target',
  safety: 'Safety',
};

// Simple nice-to-have filter persistence (docs/release_plan.md R2 item 4):
// keep the last-used filter selections so reopening the app doesn't reset
// them. Kept deliberately simple — plain localStorage, no store/migration.
const FILTERS_STORAGE_KEY = 'lucy-planner:filters:v1';

function loadStoredFilters(): Filters {
  try {
    const raw = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!raw) return { bucket: '', status: '', costFlag: '', directMed: '' };
    const parsed = JSON.parse(raw);
    return {
      bucket: parsed.bucket ?? '',
      status: parsed.status ?? '',
      costFlag: parsed.costFlag ?? '',
      directMed: parsed.directMed ?? '',
    };
  } catch {
    return { bucket: '', status: '', costFlag: '', directMed: '' };
  }
}

function App() {
  const { schools, programs, paths, loading, error } = useData();
  const [tab, setTab] = useState<Tab>('schools');
  const [filters, setFilters] = useState<Filters>(loadStoredFilters);
  const [highlightedSchoolId, setHighlightedSchoolId] = useState<string | null>(null);
  const wishlist = useWishlistStore((s) => s.wishlist);

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

  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (filters.bucket && s.school_bucket !== filters.bucket) return false;
      if (filters.status && s.v1_status !== filters.status) return false;
      if (filters.costFlag && s.family_cost_flag !== filters.costFlag) return false;
      if (filters.directMed === 'yes' && !s.has_direct_med_program) return false;
      if (filters.directMed === 'no' && s.has_direct_med_program) return false;
      return true;
    });
  }, [schools, filters]);

  const sortedPrograms = useMemo(() => {
    return [...programs].sort((a, b) => {
      const ai = CERTAINTY_ORDER.indexOf(a.certainty_category);
      const bi = CERTAINTY_ORDER.indexOf(b.certainty_category);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [programs]);

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
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Lucy's Healthcare Pathway Planner</h1>
        <p className="mt-1 text-gray-600">
          Exploring undergraduate schools and medical pathway programs. v1 data — not final admissions
          advice. See the certainty explainer below before treating any program as a guarantee.
        </p>
      </header>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          Error loading data: {error}
        </p>
      )}

      {loading && <p className="text-gray-500">Loading…</p>}

      {!loading && !error && (
        <>
          <CertaintyExplainer />

          <div className="flex gap-2 border-b border-gray-200">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  tab === t.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'schools' && (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Schools</h2>
              <FilterBar
                buckets={buckets}
                statuses={statuses}
                costFlags={costFlags}
                bucket={filters.bucket}
                status={filters.status}
                costFlag={filters.costFlag}
                directMed={filters.directMed}
                onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
                visibleCount={filteredSchools.length}
                totalCount={schools.length}
              />
              <SchoolMap schools={filteredSchools} onSelectSchool={handleSelectSchool} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSchools.map((school) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    highlighted={school.id === highlightedSchoolId}
                  />
                ))}
              </div>
            </section>
          )}

          {tab === 'programs' && (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Medical Pathway Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </section>
          )}

          {tab === 'paths' && (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Career Paths</h2>
              <p className="text-sm text-gray-600">
                Baseline research on 15 healthcare career paths. Salary figures are intentionally
                left qualitative for now — see Epic K for the eventual cross-checked salary
                triangulation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paths.map((path) => (
                  <PathCard key={path.id} path={path} />
                ))}
              </div>
            </section>
          )}

          {tab === 'wishlist' && (
            <section className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
                <p className="mt-1 text-sm text-gray-600">
                  This is Lucy's own list — mark schools reach / target / safety from a school
                  card, and they'll show up here, grouped by tier. It sticks around across visits
                  (saved in this browser).
                </p>
              </div>

              {WISHLIST_TIER_ORDER.every((t) => wishlistedSchools[t].length === 0) && (
                <p className="rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  No schools tiered yet. Go to the Schools tab and use the Wishlist buttons on a
                  card to add one.
                </p>
              )}

              {WISHLIST_TIER_ORDER.map((t) =>
                wishlistedSchools[t].length > 0 ? (
                  <div key={t} className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {WISHLIST_TIER_TITLES[t]}{' '}
                      <span className="text-sm font-normal text-gray-500">
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
