# Data Dictionary

Project: Healthcare Pathway Planner
Status: Draft
Purpose: Define the data files and fields used by the app

## Why this file exists

This project has two kinds of data:

1. **Narrative research notes** in `research/`
2. **Structured app data** in `data/`

The app should eventually read mostly from structured JSON files, but the research notes remain useful because they explain where the data came from and why certain schools or programs were included.

---

# File map

## Research files

These are working notes. They can include prose, citations, caveats, rankings, open questions, and research-log entries.

```text id="xz4dol"
research/
  candidate_school_universe.md
  school_fast_sweep_nj.md
  school_scorecard_sweep_nj.md
  school_fast_sweep_regional_public_urban.md
  school_scorecard_sweep_regional_public_urban.md
  school_fast_sweep_private_premed_stem.md
  school_scorecard_sweep_private_premed_stem.md
  school_fast_sweep_elite_reach.md
  school_scorecard_sweep_elite_reach.md
  program_fast_sweep_bsmd_early_assurance.md
  research_log.md
  source_list.md
  open_questions.md
```

## Data files

These are structured files that the app can read.

```text id="2sr5d9"
data/
  programs_medical_pathways.json
  schools_undergrad.json
  paths.json
  specialties.json
  salary_sources.json
  assumptions.json
  sources.json
```

## Documentation files

These explain the logic behind the app.

```text id="35s3uf"
docs/
  decision_framework.md
  scoring_model.md
  program_certainty_model.md
  data_dictionary.md
```

---

# data/programs_medical_pathways.json

This file stores BS/MD, BA/MD, early-assurance, guaranteed-admission, and guaranteed-interview programs.

These are not ordinary school records. They are medical-pathway program records.

## Top-level structure

```json id="44u32v"
[
  {
    "id": "tcnj_njms_7yr",
    "name": "TCNJ / Rutgers New Jersey Medical School Seven-Year Medical Program"
  }
]
```

Each item in the array is one program.

---

## Program identity fields

### `id`

Unique machine-readable identifier.

Example:

```json id="g86hkp"
"id": "tcnj_njms_7yr"
```

Rules:

* Lowercase
* No spaces
* Use underscores
* Stable over time

---

### `name`

Human-readable program name.

Example:

```json id="7cen6h"
"name": "TCNJ / Rutgers New Jersey Medical School Seven-Year Medical Program"
```

---

### `program_type`

Short description of the program structure.

Examples:

```json id="clw7z0"
"program_type": "3+4 BS/MD"
```

```json id="9g57rr"
"program_type": "8-year BA/BS + MD"
```

```json id="srrh06"
"program_type": "Early Assurance / Linkage"
```

---

### `apply_stage`

When the student applies.

Allowed values for now:

```text id="cj6uw5"
high_school_senior
after_starting_college
high_school_senior_or_incoming_first_year
```

Example:

```json id="an1ro3"
"apply_stage": "high_school_senior"
```

---

## School identity fields

### `undergraduate_school`

The undergraduate institution.

Example:

```json id="jx79nw"
"undergraduate_school": "The College of New Jersey"
```

---

### `medical_school`

The affiliated medical school.

Example:

```json id="smxpdb"
"medical_school": "Rutgers New Jersey Medical School"
```

---

### `medical_degree`

The degree awarded by the medical school.

Allowed values for now:

```text id="x6n318"
MD
DO
MD_or_DO
```

Example:

```json id="vgymql"
"medical_degree": "MD"
```

---

## Timeline fields

### `years_undergrad`

Number of undergraduate years before medical-school phase.

Example:

```json id="8mhw1c"
"years_undergrad": 3
```

---

### `years_medical`

Number of medical-school years.

Example:

```json id="h9kzax"
"years_medical": 4
```

---

### `total_years`

Total planned program length.

Example:

```json id="4lyfa8"
"total_years": 7
```

---

## Certainty fields

### `medical_seat_certainty`

Detailed phrase describing how certain the medical-school seat is.

Example:

```json id="9bu9p8"
"medical_seat_certainty": "conditional_dual_admission"
```

This field can be more specific than `certainty_category`.

---

### `certainty_category`

Standardized category used by the app for grouping and sorting.

Current allowed values:

```text id="k3ozf1"
direct_medical_pathway
conditional_medical_school_seat
guaranteed_admission_with_high_continuation_requirements
provisional_acceptance
early_assurance_after_enrollment
guaranteed_interview_not_admission
regular_premed_with_advising
```

Example:

```json id="jrnxma"
"certainty_category": "conditional_medical_school_seat"
```

---

### `interview_guarantee`

Whether the program guarantees an interview.

Allowed values:

```json id="ecxfd6"
true
false
null
```

Use `null` when unknown or not applicable.

Example:

```json id="xsxjbu"
"interview_guarantee": true
```

---

### `admission_guarantee`

Whether admission to medical school is guaranteed.

Current allowed values:

```text id="i5quhz"
conditional
not_guaranteed
unknown
```

Example:

```json id="l25vmo"
"admission_guarantee": "conditional"
```

---

## MCAT fields

### `mcat_required`

Whether the MCAT is required.

Allowed values:

```json id="e3n85s"
true
false
null
```

Use `null` when not verified.

Example:

```json id="1msczp"
"mcat_required": true
```

---

### `mcat_minimum`

Minimum MCAT score, if specified.

Use `null` if no minimum is listed or not verified.

Example:

```json id="n1skfz"
"mcat_minimum": 517
```

---

### `mcat_policy`

Plain-English explanation of the MCAT rule.

Example:

```json id="e2efgc"
"mcat_policy": "MCAT required with minimum composite score of 517 within stated attempt/timing limits."
```

---

## GPA and course fields

### `college_gpa_minimum`

Minimum college GPA, if known.

Use `null` if not known.

Example:

```json id="0ulv4u"
"college_gpa_minimum": 3.7
```

---

### `science_gpa_minimum`

Minimum science GPA, if known.

Use `null` if not known.

Example:

```json id="b5jwac"
"science_gpa_minimum": 3.7
```

---

### `course_grade_minimum`

Minimum grade in prerequisite or premedical courses.

Use `null` if not known.

Example:

```json id="47ctnb"
"course_grade_minimum": "B or better in all premedical courses"
```

---

### `known_academic_requirements`

Array of plain-English known requirements.

Example:

```json id="idtcwb"
"known_academic_requirements": [
  "Maintain cumulative undergraduate GPA of 3.70.",
  "Maintain BCPM GPA of 3.70.",
  "Achieve minimum composite MCAT score of 517."
]
```

Rules:

* Keep each requirement short.
* Avoid unsourced claims.
* Add “verify annually” when program rules may change.

---

## Cost and strategy fields

### `application_deadline`

Known or approximate deadline.

Example:

```json id="s3o5aw"
"application_deadline": "November 1, verify annually"
```

---

### `cost_category`

Short cost label.

Examples:

```text id="n9tc79"
NJ public value
private aid-dependent
elite private need-aid
OOS public cost-sensitive
public mission-driven
private STEM aid-dependent
```

---

### `strategic_value`

Plain-English explanation of why the program matters.

Example:

```json id="ujc9jc"
"strategic_value": "NJ public direct-med high-reach program that may reduce uncertainty and save one year."
```

---

### `best_for`

Array of student-fit statements.

Example:

```json id="9clo2h"
"best_for": [
  "High-achieving NJ student strongly committed to medicine as a high-school senior",
  "Student who wants a public-value undergrad path linked to Rutgers NJMS"
]
```

---

### `watch_outs`

Array of warnings or caveats.

Example:

```json id="qm3cwh"
"watch_outs": [
  "Treat as high reach, not the base plan.",
  "Program reduces uncertainty but may reduce flexibility."
]
```

---

### `app_label`

Short label displayed on cards.

Example:

```json id="f5kx3q"
"app_label": "NJ public direct-med high-reach / 3+4 BS/MD"
```

---

## Source and quality fields

### `source_confidence`

How confident we are in the record.

Current allowed values:

```text id="tjcmzl"
high
medium_high
medium
low
```

Example:

```json id="93s2ny"
"source_confidence": "medium_high"
```

---

### `data_status`

Current state of the record.

Examples:

```text id="srwh0n"
starter_record_verify_current_cycle
starter_record_split_md_do_later
complete_for_v1
needs_review
```

---

### `sources`

Array of source objects.

Example:

```json id="g9md5b"
"sources": [
  {
    "name": "TCNJ Seven-Year Medical Program",
    "type": "official_program_page",
    "url": "https://biology.tcnj.edu/academics/medical-careers/7-year-medical-program/"
  }
]
```

Rules:

* Prefer official program pages.
* Use official medical-school pages when possible.
* Secondary sources should be labeled clearly.
* Do not mix source URLs into prose if the structured field can hold them.

---

# data/schools_undergrad.json

This file will store undergraduate school records.

This file has not been populated yet, but the research files already contain the raw material.

## Proposed top-level structure

```json id="h8g23l"
[
  {
    "id": "rutgers_new_brunswick",
    "name": "Rutgers University - New Brunswick"
  }
]
```

Each item in the array is one undergraduate school.

---

## School identity fields

### `id`

Unique machine-readable school ID.

Example:

```json id="4edqvo"
"id": "rutgers_new_brunswick"
```

---

### `name`

Human-readable school name.

Example:

```json id="bmo69v"
"name": "Rutgers University - New Brunswick"
```

---

### `school_type`

Broad institution type.

Allowed values:

```text id="j0181o"
public
private
```

---

### `location`

City/state or region.

Example:

```json id="9dw12h"
"location": "New Brunswick, NJ"
```

---

### `latitude` / `longitude`

Decimal-degree coordinates for the school's main campus, used to plot the
school on the R2 map (`SchoolMap`). Real, publicly-documented campus
coordinates — not estimated or invented. Precision is roughly 4 decimal
places (main-campus-landmark level, not a specific building), which is
sufficient for state/regional zoom levels.

Example:

```json id="lat9dol"
"latitude": 40.5008,
"longitude": -74.4474
```

---

### `distance_from_home_category`

Useful for Jeff/Lucy.

Possible values:

```text id="whejre"
local
regional_drive
far_drive_or_short_flight
far_from_home
```

---

## Strategic category fields

### `school_bucket`

Primary school category.

Possible values:

```text id="lv62i6"
NJ public value
NJ private
regional public
urban clinical ecosystem
private pre-health/STEM
private co-op/career
private regional brand
liberal arts pre-health
elite general prestige
elite biomedical/research
elite medical ecosystem
elite health-tech/STEM
direct-med relevant
```

---

### `strategic_role`

Plain-English explanation of why the school is included.

Example:

```json id="b7d3ei"
"strategic_role": "NJ public flagship/value premed baseline"
```

---

### `v1_status`

Whether the school should likely appear in the first app version.

Allowed values:

```text id="nimqd3"
likely_include
possible_include
research_only
exclude_for_now
```

---

### `why_included`

Short explanation for the app or research view.

Example:

```json id="lt1x7z"
"why_included": "Defines the NJ in-state public flagship baseline against which private and out-of-state options should be compared."
```

---

## Cost fields

### `official_cost_of_attendance`

Total official cost of attendance, when available.

Use `null` if not researched.

---

### `official_cost_in_state`

For public schools, official in-state cost.

Use `null` for private schools.

---

### `official_cost_out_of_state`

For public schools, official out-of-state cost.

Use `null` for private schools.

---

### `scorecard_avg_annual_cost`

College Scorecard average annual cost / average net price.

Important:

> This is not necessarily Jeff’s family cost.

---

### `family_cost_flag`

Practical cost label for this family.

Allowed values:

```text id="7mb55n"
NJ_in_state_value
OOS_public_cost_sensitive
private_aid_dependent
elite_need_aid_only
likely_full_pay_warning
net_price_calculator_required
```

---

### `cost_notes`

Plain-English cost caveats.

Example:

```json id="z6oqms"
"cost_notes": "College Scorecard net price may be much lower than the likely cost for a high-income NJ family."
```

---

## College Scorecard fields

### `scorecard_unit_id`

Federal unit ID.

Example:

```json id="iioz3p"
"scorecard_unit_id": "186380"
```

---

### `scorecard_avg_annual_cost`

Average annual cost / net price from College Scorecard.

Example:

```json id="w7h1mg"
"scorecard_avg_annual_cost": 24406
```

---

### `scorecard_graduation_rate`

Graduation rate as decimal.

Example:

```json id="h9zi02"
"scorecard_graduation_rate": 0.84
```

---

### `scorecard_acceptance_rate`

Acceptance rate as decimal.

Example:

```json id="lyirmw"
"scorecard_acceptance_rate": 0.58
```

---

### `scorecard_median_earnings_10yr`

Ten-year post-entry earnings, if separately available.

Example:

```json id="c1u5ny"
"scorecard_median_earnings_10yr": 92538
```

---

### `scorecard_median_earnings_6yr`

Six-year post-entry earnings, if separately available.

Example:

```json id="jrd2mh"
"scorecard_median_earnings_6yr": 57800
```

---

### `scorecard_median_debt`

Median debt at graduation or after completion.

Example:

```json id="z9g3ez"
"scorecard_median_debt": 24250
```

---

### `scorecard_sat_average`

Average overall SAT score (`latest.admissions.sat_scores.average.overall` from
the College Scorecard API). Number or `null` — many schools don't report this
(test-optional policies, or the field is simply not populated in Scorecard for
that year). Do not guess a value; leave `null` with `scorecard_notes` context if
useful.

Example:

```json id="satavg1"
"scorecard_sat_average": 1410
```

---

### `scorecard_notes`

Caveats about Scorecard data.

Example:

```json id="iz2tri"
"scorecard_notes": "Earnings likely reflect major mix and should not be interpreted as premed-specific salary."
```

---

## Pre-health fields

### `prehealth_advising_strength`

Qualitative label.

Allowed values:

```text id="0hja4o"
strong
moderate
unclear
```

---

### `prehealth_advising_notes`

Plain-English summary of advising resources.

---

### `clinical_ecosystem_strength`

Qualitative label.

Allowed values:

```text id="2vwf6c"
very_strong
strong
moderate
limited
unclear
```

---

### `clinical_ecosystem_notes`

Plain-English notes about nearby hospitals, medical schools, clinical access, or urban context.

---

### `research_access_notes`

Notes about undergrad research opportunities, if known.

---

## Program/pathway fields

### `has_direct_med_program`

Boolean.

```json id="fx1qio"
"has_direct_med_program": true
```

---

### `direct_med_program_ids`

Array linking to `data/programs_medical_pathways.json`.

Example:

```json id="wy387x"
"direct_med_program_ids": [
  "tcnj_njms_7yr"
]
```

---

### `early_assurance_notes`

Plain-English notes about early assurance, linkage, or guaranteed interview pathways.

---

## Fit and risk fields

### `gpa_risk`

Qualitative estimate.

Allowed values:

```text id="m7k8kk"
low
medium
high
unclear
```

---

### `gpa_risk_notes`

Plain-English explanation.

Example:

```json id="u7d9ta"
"gpa_risk_notes": "STEM-heavy environment could create GPA pressure for a premed student."
```

---

### `student_fit_notes`

Notes about campus style, size, urban/suburban/rural environment, or culture.

---

### `parent_roi_note`

Parent-facing summary.

Example:

```json id="j8qj1n"
"parent_roi_note": "Strong NJ public baseline; any private or OOS option needs to justify incremental cost over this."
```

---

## Scoring fields

These can be added later after we define the scoring model.

```json id="7hgvvr"
{
  "premed_ecosystem_score": null,
  "value_score": null,
  "broad_option_value_score": null,
  "fit_score": null,
  "cost_risk_score": null,
  "overall_school_score": null
}
```

Do not rush these. It is better to populate clean facts first and add scores later.

---

## Source fields

### `sources`

Array of source IDs or embedded source objects.

Preferred long-term approach:

```json id="uvxnp1"
"sources": [
  "rutgers_nb_cost_2025_26",
  "rutgers_hpo",
  "scorecard_rutgers_nb"
]
```

This links to:

```text id="c9j9nm"
data/sources.json
```

Starter approach:

```json id="zt3ry9"
"sources": [
  {
    "name": "Rutgers Cost of Attendance",
    "type": "official_cost_page",
    "url": "..."
  }
]
```

Either approach is acceptable for v1.

---

# data/sources.json

This file will eventually store reusable source records.

## Proposed structure

```json id="vlbau7"
[
  {
    "id": "scorecard_data_download",
    "name": "College Scorecard Data Download",
    "type": "federal_data",
    "publisher": "U.S. Department of Education",
    "url": "https://collegescorecard.ed.gov/data/",
    "accessed_date": "2026-07-09",
    "notes": "Used for cost, earnings, debt, admissions, and graduation metrics."
  }
]
```

## Source fields

### `id`

Unique source ID.

### `name`

Human-readable source name.

### `type`

Source type.

Possible values:

```text id="h1ag4s"
official_cost_page
official_program_page
official_advising_page
official_med_school_page
federal_data
school_reported_outcome
secondary_scorecard_mirror
secondary_profile
anecdotal_forum
```

### `publisher`

Organization that published the source.

### `url`

Source URL.

### `accessed_date`

Date we accessed or recorded the source.

### `notes`

Short notes on what the source supports.

### `confidence`

Source confidence.

Allowed values:

```text id="26vwl6"
high
medium
low
```

---

# data/paths.json

Populated (2026-07-09) with 15 baseline healthcare career-path records: MD/DO
physician, PA, RN, NP, CRNA, dentist, clinical psychologist, psychiatrist,
physical therapist, pharmacist, public health, biomedical research, biotech/
pharma, health tech/data/AI, healthcare administration.

## Fields

```json id="zwr8xe"
{
  "id": "md_do_physician",
  "name": "MD/DO Physician",
  "category": "clinical",
  "group": "physician",
  "training_length_short": "~11-15 yrs post-HS",
  "admissions_difficulty": "very_high",
  "roadmap": ["High school", "College (premed)", "Medical school", "Residency", "Optional fellowship", "Practice"],
  "best_fit": "Students who want the broadest clinical scope of practice...",
  "training_length_years": null,
  "typical_degrees": [],
  "requires_medical_school": true,
  "patient_care_level": "high",
  "salary_range_notes": "",
  "lifestyle_notes": "",
  "best_for": [],
  "watch_outs": [],
  "sources": []
}
```

### `category`

`"clinical"` or `"non_clinical"`.

### `group` (added Phase 2, docs/ux_redesign_plan.md)

Career grouping used by the Start landing routing and the Explore Careers
grouped layout. Allowed values:

```text
physician
nursing
advanced_clinical
mental_health
research_public_health_tech
```

### `training_length_short` (added Phase 2)

A short (~25 char) summary of `training_length_years`, e.g. `"~11-15 yrs
post-HS"`. Derived from the existing prose — not a new fact.

### `admissions_difficulty` (added Phase 2)

Enum summarizing `admissions_difficulty_notes`:

```text
low
moderate
high
very_high
```

### `roadmap` (added Phase 2)

Array of 4-7 short step strings (e.g. `["High school", "College", "Medical
school", "Residency", "Practice"]`) — a simplified visual timeline, not a
detailed flowchart. Derived from `training_length_years`.

### `best_fit` (added Phase 2)

One sentence distilled from `best_for[0]`, for the compact card view.

### `salary_range_notes`

**Deliberately qualitative only.** No specific salary numbers or short salary
labels anywhere in this file — see Epic K (salary triangulation) for the
eventual cross-checked, sourced comparison. Do not add a short "salary
outlook" field to compact cards; this is a locked decision (Jeff, 2026-07-11).

---

# data/specialties.json

This file will store medical specialties later.

Examples:

```text id="psgi75"
Family medicine
Internal medicine
Pediatrics
Emergency medicine
Psychiatry
Dermatology
Anesthesiology
Radiology
Surgery
OB/GYN
Neurology
Pathology
```

Do not prioritize this yet. Lucy does not need specialty selection now.

---

# data/salary_sources.json

This file will store salary-source metadata.

Possible sources later:

```text id="qfzq1u"
BLS Occupational Outlook Handbook
AAMC specialty data
MGMA, if available
Medscape compensation reports
AAPA salary reports
AACN / nursing salary sources
ADA / dental salary sources
APA / psychology salary sources
```

Use carefully. Salary data varies a lot by geography, experience, specialty, and employment model.

---

# data/assumptions.json

This file will store assumptions used by calculators.

Examples:

```json id="d2f22y"
{
  "inflation_rate": 0.03,
  "student_loan_interest_rate": null,
  "undergrad_years_default": 4,
  "medical_school_years_default": 4,
  "residency_years_default": 3,
  "parent_budget_soft_cap": 200000,
  "home_state": "NJ"
}
```

This file will matter when we build cost and ROI calculators.

---

# Recommended immediate next step

Now that the data dictionary exists, the next useful file is:

```text id="qd62ic"
data/sources.json
```

That gives us a clean place to store source records before we convert schools into structured JSON.
