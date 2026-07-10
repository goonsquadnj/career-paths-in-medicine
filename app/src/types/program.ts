// Types for data/programs_medical_pathways.json — see docs/program_certainty_model.md
// for the certainty framework and docs/data_dictionary.md for field specs.

export type ProgramApplyStage =
  | 'high_school_senior'
  | 'after_starting_college'
  | 'high_school_senior_or_incoming_first_year';

export type MedicalDegree = 'MD' | 'DO' | 'MD_or_DO';

export type CertaintyCategory =
  | 'direct_medical_pathway'
  | 'conditional_medical_school_seat'
  | 'guaranteed_admission_with_high_continuation_requirements'
  | 'provisional_acceptance'
  | 'early_assurance_after_enrollment'
  | 'guaranteed_interview_not_admission'
  | 'regular_premed_with_advising';

export type AdmissionGuarantee = 'conditional' | 'not_guaranteed' | 'unknown';

export type SourceConfidence = 'high' | 'medium_high' | 'medium' | 'low';

export interface ProgramSource {
  name: string;
  type: string;
  url: string;
}

export interface Program {
  id: string;
  name: string;
  program_type: string;
  apply_stage: ProgramApplyStage;

  undergraduate_school: string;
  medical_school: string;
  medical_degree: MedicalDegree;

  years_undergrad: number;
  years_medical: number;
  total_years: number;

  medical_seat_certainty: string;
  certainty_category: CertaintyCategory;
  interview_guarantee: boolean | null;
  admission_guarantee: AdmissionGuarantee;

  mcat_required: boolean | null;
  mcat_minimum: number | null;
  mcat_policy: string | null;

  college_gpa_minimum: number | null;
  science_gpa_minimum: number | null;
  course_grade_minimum: string | null;
  known_academic_requirements: string[];

  application_deadline: string | null;
  cost_category: string;
  strategic_value: string;
  best_for: string[];
  watch_outs: string[];
  app_label: string;

  source_confidence: SourceConfidence;
  data_status: string;
  sources: ProgramSource[];
}

// Certainty level ordering used for sort + the certainty explainer.
// Mirrors docs/program_certainty_model.md "Suggested sort order".
export const CERTAINTY_ORDER: CertaintyCategory[] = [
  'direct_medical_pathway',
  'conditional_medical_school_seat',
  'guaranteed_admission_with_high_continuation_requirements',
  'provisional_acceptance',
  'early_assurance_after_enrollment',
  'guaranteed_interview_not_admission',
  'regular_premed_with_advising',
];

export const CERTAINTY_LABELS: Record<CertaintyCategory, string> = {
  direct_medical_pathway: 'Direct medical pathway',
  conditional_medical_school_seat: 'Conditional medical-school seat',
  guaranteed_admission_with_high_continuation_requirements:
    'Guaranteed admission (high requirements)',
  provisional_acceptance: 'Provisional acceptance',
  early_assurance_after_enrollment: 'Early assurance after enrollment',
  guaranteed_interview_not_admission: 'Guaranteed interview only',
  regular_premed_with_advising: 'Regular premed path',
};
