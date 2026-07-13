import type { School } from '../types/school';
import { bucketTier } from './bucketColors';
import type { StrategyUndergradLeg } from '../types/pathwayStrategy';

// Derives a REAL undergrad cost range live from the actual school dataset —
// never a hardcoded number (docs/paths_journeys_plan.md's core honesty
// constraint). Returns null if no matching schools have priced data yet.
export interface DerivedCostRange {
  min4yr: number;
  max4yr: number;
  schoolCount: number;
}

export function deriveUndergradCost(
  schools: School[],
  leg: StrategyUndergradLeg,
): DerivedCostRange | null {
  const matched = leg.program_linked
    ? schools.filter((s) => s.has_direct_med_program)
    : schools.filter((s) => (leg.bucket_tiers ?? []).includes(bucketTier(s.school_bucket)));

  // Deliberately use STICKER cost (official_cost_of_attendance, falling back
  // to official_cost_in_state), NOT scorecard_avg_annual_cost. Scorecard's
  // net price is aid-adjusted across the whole student body, and elite
  // schools' generous need-based aid drags their reported average down below
  // even in-state public schools (verified: elite net-price range $6k-$30k vs
  // value-tier $16k-$41k) — using it here would invert the entire lesson
  // this feature exists to teach (that prestige undergrad often costs more).
  // Sticker cost is the honest basis for a family not counting on maximal aid
  // (see vision.md's family_cost_flag framing — "elite_need_aid_only" /
  // "likely_full_pay_warning" already exist for exactly this reason).
  const prices = matched
    .map((s) => s.official_cost_of_attendance ?? s.official_cost_in_state)
    .filter((p): p is number => p != null);

  if (prices.length === 0) return null;

  return {
    min4yr: Math.min(...prices) * 4,
    max4yr: Math.max(...prices) * 4,
    schoolCount: matched.length,
  };
}

// Which real school_bucket string values fall under a given tier, derived
// from the live dataset — used to pre-filter Schools when a strategy card
// links out ("see matching schools"), so the link is never stale relative
// to whatever buckets actually exist in the data.
export function bucketsForTiers(schools: School[], tiers: string[]): string[] {
  const set = new Set<string>();
  for (const s of schools) {
    if (tiers.includes(bucketTier(s.school_bucket))) set.add(s.school_bucket);
  }
  return Array.from(set);
}
