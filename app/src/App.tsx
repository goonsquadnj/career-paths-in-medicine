import { useMemo, useState } from 'react';
import { useData } from './lib/useData';
import { SchoolCard } from './components/SchoolCard';
import { ProgramCard } from './components/ProgramCard';
import { FilterBar } from './components/FilterBar';
import { CertaintyExplainer } from './components/CertaintyExplainer';
import { CERTAINTY_ORDER } from './types/program';
import type { FamilyCostFlag } from './types/school';

interface Filters {
  bucket: string;
  status: string;
  costFlag: string;
  directMed: string;
}

function App() {
  const { schools, programs, loading, error } = useData();
  const [filters, setFilters] = useState<Filters>({
    bucket: '',
    status: '',
    costFlag: '',
    directMed: '',
  });

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Medical Pathway Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
