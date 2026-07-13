import { useEffect, useMemo, useState } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { useData } from './lib/useData';
import { SchoolCard } from './components/SchoolCard';
import { ProgramCard } from './components/ProgramCard';
import { PathCard } from './components/PathCard';
import { FilterBar } from './components/FilterBar';
import { CertaintyExplainer } from './components/CertaintyExplainer';
import { SchoolMap } from './components/SchoolMap';
import { StartLanding } from './components/StartLanding';
import { SectionHeader } from './components/SectionHeader';
import { CERTAINTY_ORDER } from './types/program';
import type { FamilyCostFlag } from './types/school';
import { useWishlistStore, type WishlistTier } from './store/wishlistStore';

interface Filters {
  bucket: string;
  status: string;
  costFlag: string;
  directMed: string;
}

// 4-tab structure per docs/ux_redesign_plan.md: Start · Explore Careers ·
// Schools & Programs (merged) · My Plan (renamed from Wishlist).
type Tab = 'start' | 'careers' | 'schools' | 'plan';

const TABS: { id: Tab; label: string }[] = [
  { id: 'start', label: 'Start' },
  { id: 'careers', label: 'Explore Careers' },
  { id: 'schools', label: 'Schools & Programs' },
  { id: 'plan', label: 'My Plan' },
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
  const [tab, setTab] = useState<Tab>('start');
  const [filters, setFilters] = useState<Filters>(loadStoredFilters);
  const [highlightedSchoolId, setHighlightedSchoolId] = useState<string | null>(null);
  // Map is secondary/collapsed by default (docs/ux_redesign_plan.md: "the
  // current dataset is too small for the map to dominate").
  const [showMap, setShowMap] = useState(false);
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

          {tab === 'start' && <StartLanding onChoose={() => setTab('careers')} />}

          {tab === 'careers' && (
            <section className="flex flex-col gap-4">
              <SectionHeader
                title="Explore careers"
                subtitle="Fifteen healthcare career paths — what each one actually involves, how long training takes, and who it tends to fit. Salary is deliberately left qualitative for now; see Epic K for the eventual cross-checked comparison."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paths.map((path) => (
                  <PathCard key={path.id} path={path} />
                ))}
              </div>
            </section>
          )}

          {tab === 'schools' && (
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title="Schools & programs"
                  subtitle="Which schools might support the path you're exploring — cost, outcomes, and pre-health ecosystem, side by side."
                />
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

                <button
                  type="button"
                  onClick={() => setShowMap((v) => !v)}
                  className="self-start flex items-center gap-2 min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                >
                  <MapIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {showMap ? 'Hide map' : 'Show map'}
                </button>
                {showMap && (
                  <SchoolMap schools={filteredSchools} onSelectSchool={handleSelectSchool} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSchools.map((school) => (
                    <SchoolCard
                      key={school.id}
                      school={school}
                      highlighted={school.id === highlightedSchoolId}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-stone-200 pt-8">
                <SectionHeader
                  title="Medical pathway programs"
                  subtitle="BS/MD, BA/MD, and early-assurance programs — how much admissions certainty each one actually removes."
                />
                <CertaintyExplainer />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedPrograms.map((program) => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === 'plan' && (
            <section className="flex flex-col gap-6">
              <SectionHeader
                title="My plan"
                subtitle="Your own working list — mark schools reach / target / safety from a school card, and they'll show up here, grouped by tier. It sticks around across visits (saved in this browser)."
              />

              {WISHLIST_TIER_ORDER.every((t) => wishlistedSchools[t].length === 0) && (
                <p className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
                  Nothing here yet. Go to Schools & Programs and use the tier buttons on a school
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
