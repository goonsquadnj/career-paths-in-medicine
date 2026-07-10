// Types for data/paths.json — see docs/data_dictionary.md's proposed schema
// and ROADMAP.md Step 4A. Salary is deliberately qualitative-only here;
// specific salary numbers are out of scope until Epic K (salary triangulation).

export type PathCategory = 'clinical' | 'non_clinical';

export type PatientCareLevel = 'high' | 'medium' | 'low';

export interface Path {
  id: string;
  name: string;
  category: PathCategory;

  what_they_do: string;
  typical_degrees: string[];
  training_length_years: string;
  requires_medical_school: boolean;
  patient_care_level: PatientCareLevel;

  admissions_difficulty_notes: string;
  salary_range_notes: string;
  lifestyle_notes: string;

  best_for: string[];
  watch_outs: string[];

  sources: string[];
  notes?: string;
}
