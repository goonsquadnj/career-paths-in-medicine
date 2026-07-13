import { useEffect, useState } from 'react';
import type { School } from '../types/school';
import type { Program } from '../types/program';
import type { Path } from '../types/path';
import type { PathwayStrategiesData } from '../types/pathwayStrategy';
import type { Assumptions } from '../types/assumptions';

interface DataState {
  schools: School[];
  programs: Program[];
  paths: Path[];
  pathwayStrategies: PathwayStrategiesData | null;
  assumptions: Assumptions | null;
  loading: boolean;
  error: string | null;
}

// Loads the static JSON data files (synced from ../../data at build/dev time —
// see scripts/sync-data.mjs) once on mount.
export function useData(): DataState {
  const [state, setState] = useState<DataState>({
    schools: [],
    programs: [],
    paths: [],
    pathwayStrategies: null,
    assumptions: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [schoolsRes, programsRes, pathsRes, strategiesRes, assumptionsRes] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}data/schools_undergrad.json`),
          fetch(`${import.meta.env.BASE_URL}data/programs_medical_pathways.json`),
          fetch(`${import.meta.env.BASE_URL}data/paths.json`),
          fetch(`${import.meta.env.BASE_URL}data/pathway_strategies.json`),
          fetch(`${import.meta.env.BASE_URL}data/assumptions.json`),
        ]);

        if (!schoolsRes.ok) throw new Error(`schools fetch failed: ${schoolsRes.status}`);
        if (!programsRes.ok) throw new Error(`programs fetch failed: ${programsRes.status}`);
        if (!pathsRes.ok) throw new Error(`paths fetch failed: ${pathsRes.status}`);
        if (!strategiesRes.ok) throw new Error(`pathway strategies fetch failed: ${strategiesRes.status}`);
        if (!assumptionsRes.ok) throw new Error(`assumptions fetch failed: ${assumptionsRes.status}`);

        const [schools, programs, paths, pathwayStrategies, assumptions] = await Promise.all([
          schoolsRes.json() as Promise<School[]>,
          programsRes.json() as Promise<Program[]>,
          pathsRes.json() as Promise<Path[]>,
          strategiesRes.json() as Promise<PathwayStrategiesData>,
          assumptionsRes.json() as Promise<Assumptions>,
        ]);

        if (!cancelled) {
          setState({
            schools,
            programs,
            paths,
            pathwayStrategies,
            assumptions,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            schools: [],
            programs: [],
            paths: [],
            pathwayStrategies: null,
            assumptions: null,
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
