// Types for data/assumptions.json — shared planning assumptions used across
// features. Every estimate carries source_confidence/data_status per the
// project's honesty discipline (never a laundered single figure).

export interface SourcedEstimate {
  source_confidence: 'high' | 'medium_high' | 'medium' | 'low';
  data_status: string;
  notes: string;
  sources: { name: string; url: string; accessed_date: string }[];
}

export interface MedicalSchoolCostEstimate extends SourcedEstimate {
  public_low: number;
  private_high: number;
  display_range: string;
  basis: string;
}

export interface MedicalSchoolDebtEstimate extends SourcedEstimate {
  amount: number;
  display: string;
  basis: string;
}

export interface Assumptions {
  inflation_rate: number;
  student_loan_interest_rate: number | null;
  undergrad_years_default: number;
  medical_school_years_default: number;
  residency_years_default: number;
  parent_budget_soft_cap: number;
  home_state: string;
  medical_school_4yr_cost_estimate: MedicalSchoolCostEstimate;
  medical_school_median_debt_estimate: MedicalSchoolDebtEstimate;
}
