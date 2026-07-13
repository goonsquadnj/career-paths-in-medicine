// Types for data/pathway_strategies.json (Epic B — see docs/paths_journeys_plan.md).
// Editorial teaching content: named archetypes for "how do I actually get to
// [career endpoint]" as an undergrad-leg + grad-leg combination. v1 covers the
// physician endpoint only. Undergrad cost is deliberately NOT stored here —
// it's derived live from real school data at render time (see
// lib/strategyCost.ts) so it can never drift from the actual dataset.

export type StrategyBucketTier = 'value' | 'mid' | 'elite';
export type GradLegKind = 'med_school' | 'keep_options_open' | 'direct_med';
export type Flexibility = 'high' | 'medium' | 'low';
export type AdmissionsCertainty = 'higher' | 'typical' | 'lower';

export interface StrategyUndergradLeg {
  label: string;
  bucket_tiers?: StrategyBucketTier[];
  program_linked?: boolean;
}

export interface StrategyGradLeg {
  kind: GradLegKind;
  label: string;
}

export interface StrategyTradeoffs {
  flexibility: Flexibility;
  admissions_certainty: AdmissionsCertainty;
  undergrad_cost: 'derived';
}

export interface PathwayStrategy {
  id: string;
  name: string;
  tagline: string;
  undergrad_leg: StrategyUndergradLeg;
  grad_leg: StrategyGradLeg;
  logic: string;
  best_for: string[];
  watch_outs: string[];
  tradeoffs: StrategyTradeoffs;
  notes: string;
}

export interface PathwayStrategiesData {
  endpoint: string;
  endpoint_label: string;
  intro: {
    title: string;
    body: string;
  };
  med_school_cost_note: string;
  strategies: PathwayStrategy[];
}
