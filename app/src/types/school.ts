// Types for data/schools_undergrad.json — see docs/data_dictionary.md for the
// authoritative field-by-field spec. Keep these in sync as the schema grows.

export type SchoolType = 'public' | 'private';

export type DistanceCategory =
  | 'local'
  | 'regional_drive'
  | 'far_drive_or_short_flight'
  | 'far_from_home';

export type V1Status =
  | 'likely_include'
  | 'possible_include'
  | 'research_only'
  | 'exclude_for_now';

export type FamilyCostFlag =
  | 'NJ_in_state_value'
  | 'OOS_public_cost_sensitive'
  | 'private_aid_dependent'
  | 'elite_need_aid_only'
  | 'likely_full_pay_warning'
  | 'net_price_calculator_required';

export type AdvisingStrength = 'strong' | 'moderate' | 'unclear';

export type EcosystemStrength =
  | 'very_strong'
  | 'strong'
  | 'moderate'
  | 'limited'
  | 'unclear';

export type GpaRisk = 'low' | 'medium' | 'high' | 'unclear';

export type SourceConfidence = 'high' | 'medium_high' | 'medium' | 'low';

export interface School {
  id: string;
  name: string;
  school_type: SchoolType;
  location: string;
  latitude: number;
  longitude: number;
  distance_from_home_category: DistanceCategory;

  school_bucket: string;
  strategic_role: string;
  v1_status: V1Status;
  why_included: string;

  official_cost_of_attendance: number | null;
  official_cost_in_state: number | null;
  official_cost_out_of_state: number | null;

  scorecard_unit_id: string | null;
  scorecard_avg_annual_cost: number | null;
  scorecard_graduation_rate: number | null;
  scorecard_acceptance_rate: number | null;
  scorecard_median_earnings_10yr: number | null;
  scorecard_median_earnings_6yr: number | null;
  scorecard_median_debt: number | null;
  scorecard_sat_average: number | null;
  scorecard_notes: string | null;

  family_cost_flag: FamilyCostFlag | null;
  cost_notes: string | null;

  prehealth_advising_strength: AdvisingStrength | null;
  prehealth_advising_notes: string | null;
  clinical_ecosystem_strength: EcosystemStrength | null;
  clinical_ecosystem_notes: string | null;
  research_access_notes: string | null;

  has_direct_med_program: boolean;
  direct_med_program_ids: string[];
  early_assurance_notes: string | null;

  gpa_risk: GpaRisk | null;
  gpa_risk_notes: string | null;
  student_fit_notes: string | null;
  parent_roi_note: string | null;

  // Scoring fields — reserved for the future scoring model (docs/release_plan.md R3/R4).
  premed_ecosystem_score: number | null;
  value_score: number | null;
  broad_option_value_score: number | null;
  fit_score: number | null;
  cost_risk_score: number | null;
  overall_school_score: number | null;

  source_confidence: SourceConfidence;
  data_status: string;
  sources: string[];
}
