import { useEffect, useState } from 'react';
import type { School } from '../types/school';
import type { Program } from '../types/program';

interface DataState {
  schools: School[];
  programs: Program[];
  loading: boolean;
  error: string | null;
}

// Loads the static JSON data files (synced from ../../data at build/dev time —
// see scripts/sync-data.mjs) once on mount.
export function useData(): DataState {
  const [state, setState] = useState<DataState>({
    schools: [],
    programs: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [schoolsRes, programsRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}data/schools_undergrad.json`),
          fetch(`${import.meta.env.BASE_URL}data/programs_medical_pathways.json`),
        ]);

        if (!schoolsRes.ok) throw new Error(`schools fetch failed: ${schoolsRes.status}`);
        if (!programsRes.ok) throw new Error(`programs fetch failed: ${programsRes.status}`);

        const [schools, programs] = await Promise.all([
          schoolsRes.json() as Promise<School[]>,
          programsRes.json() as Promise<Program[]>,
        ]);

        if (!cancelled) {
          setState({ schools, programs, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            schools: [],
            programs: [],
            loading: false,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
