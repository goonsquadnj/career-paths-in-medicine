# School Scorecard Sweep — NJ / Local Anchor Schools

Research date: 2026-07-09
Project: Lucy Healthcare Pathway Planner
Batch: NJ/local anchor schools
Status: Draft research notes before JSON conversion

## Purpose

This file adds standardized outcomes data for the NJ/local anchor schools.

This is meant to complement:

```text
research/school_fast_sweep_nj.md
```

The first NJ file focused on official school pages: cost of attendance, pre-health advising, accelerated programs, and strategic role.

This file focuses on College Scorecard / ROI-style metrics:

* Average annual cost / net price
* Graduation rate
* Acceptance rate
* Median earnings
* Median debt where available
* Preliminary ROI notes

## Important definitions and limitations

College Scorecard’s “Average Annual Cost” is not sticker price. It is closer to average net price: cost after average grants and scholarships for federal-aid students. College Scorecard pages describe cost as tuition, living costs, books/supplies, and fees minus average grants and scholarships for federal financial aid recipients. This can differ materially from the official cost of attendance and from what a higher-income family actually pays.

College Scorecard’s data download page says the downloadable data were last updated June 10, 2026.

Graduation rate definitions can vary across Scorecard views. College Scorecard’s glossary describes graduation rate for degree-granting schools as the proportion of entering students who graduated from the school within 8 years, regardless of full-time/part-time status or prior postsecondary experience. Other IPEDS/Scorecard documentation also uses 150% of normal time for certain graduation-rate fields. For this project, the exact data field should be stored later in `sources.json` / `data_dictionary.md`.

Median earnings are useful, but they are not pure “school quality.” Earnings are affected by major mix, geography, student background, and whether graduates go directly to work or continue to graduate/professional school. For Lucy’s planner, school-level earnings should be treated as a broad ROI signal, not a premed-specific outcome.

---

# Summary table

| School                             | Avg annual cost / net price | Graduation rate |      Acceptance rate |             Median earnings |      Median debt | Notes                                                |
| ---------------------------------- | --------------------------: | --------------: | -------------------: | --------------------------: | ---------------: | ---------------------------------------------------- |
| Rutgers University - New Brunswick |                     $24,406 |             84% |                  58% |                     $77,933 |         ~$21,500 | Strong NJ public flagship baseline                   |
| The College of New Jersey          |                     $27,646 |             86% |                  62% |                     $72,068 |         ~$23,250 | Strong smaller public/value option                   |
| Rowan University                   |                     $22,408 |             72% |                  78% |                     $62,686 |         ~$20,500 | Practical NJ health ecosystem option                 |
| New Jersey Institute of Technology |                     $16,504 |             80% |                  65% |                     $91,874 | ~$21,000–$21,500 | Strong STEM/ROI option                               |
| Rutgers University - Newark        |                     $19,703 |             71% |                  TBD |                     $77,933 |         ~$21,500 | Urban Rutgers / NJMS-proximity option                |
| Stevens Institute of Technology    |                     $41,346 |             87% |                 ~48% |                    $112,538 |         ~$27,000 | High-ROI private STEM option, expensive net price    |
| Seton Hall University              |                     $31,446 |             70% | TBD / ~73% secondary | $76,919 / $70,196 secondary |         ~$22,750 | Private pre-health/nursing/business-sensitive option |

Notes:

* Values marked with `~` are from secondary sites that report they are using College Scorecard API data. These should be verified directly against the Scorecard API or downloaded dataset before final JSON conversion.
* Acceptance-rate values are from College Scorecard snippets when available. For Seton Hall, secondary sources show approximately 73%, but this should be verified against official admissions/CDS or Scorecard API.
* Median earnings values vary slightly across Scorecard snippets and third-party API mirrors depending on release year and data field. We should standardize the exact field later.

---

# 1. Rutgers University - New Brunswick

## College Scorecard values

* Average annual cost / net price: $24,406
* Graduation rate: 84%
* Acceptance rate: 58%
* Median earnings: $77,933
* Median debt: approximately $21,500 from CampusROI, which states it uses College Scorecard API data

Sources:

* College Scorecard search result for average annual cost, acceptance rate, and median earnings.
* College Scorecard result for graduation rate and median earnings.
* CampusROI mirror of College Scorecard API for median debt and additional ROI fields.

## Preliminary ROI interpretation

Rutgers NB remains the key in-state public flagship baseline.

The financial story is strong for a New Jersey resident:

* Net price is materially below private STEM/pre-health options like Stevens and Seton Hall.
* Median earnings are strong for a broad public flagship.
* Debt appears manageable relative to earnings.
* The major caveat is that premed-specific value depends on Lucy earning strong grades, finding advising/research/clinical opportunities, and navigating a large school.

## Parent ROI note

Rutgers NB is probably the most important comparison point in the app.

Any private or elite undergrad should be compared against the Rutgers baseline:

> What incremental value are we buying above Rutgers, and is it worth the cost, GPA risk, or stress?

---

# 2. The College of New Jersey

## College Scorecard values

* Average annual cost / net price: $27,646
* Graduation rate: 86%
* Acceptance rate: 62%
* Median earnings: $72,068
* Median debt: approximately $23,250 from CampusROI, which states it uses College Scorecard API data

Sources:

* College Scorecard result for average annual cost, median earnings, and acceptance rate.
* College Scorecard result for graduation rate and median earnings.
* CampusROI mirror of College Scorecard API for median debt and ROI fields.

## Preliminary ROI interpretation

TCNJ looks like a strong smaller-public value option.

The financial story:

* Slightly higher average annual cost than Rutgers NB in Scorecard data.
* Very strong graduation rate.
* Strong but somewhat lower median earnings than Rutgers NB and NJIT.
* Median debt appears reasonable.

## Parent ROI note

TCNJ’s potential value is not just cost. It may offer a smaller, more undergraduate-focused environment than Rutgers.

The key question:

> Would Lucy be more likely to thrive academically at TCNJ than at a larger flagship like Rutgers?

For premed, that could matter more than a small difference in school-level median earnings.

---

# 3. Rowan University

## College Scorecard values

* Average annual cost / net price: $22,408
* Graduation rate: 72%
* Acceptance rate: 78%
* Median earnings: $62,686
* Median debt: approximately $20,500 from secondary College Scorecard mirrors

Sources:

* College Scorecard result for average annual cost, acceptance rate, and median earnings.
* College Scorecard result for graduation rate and median earnings.
* Secondary College Scorecard mirror showing median debt and related data.

## Preliminary ROI interpretation

Rowan is cost-effective and relevant because of its health-professions ecosystem, but its school-level earnings and graduation-rate metrics are lower than Rutgers NB, TCNJ, NJIT, and Stevens.

That does not make Rowan a bad choice. It means Rowan’s inclusion in the app should be tied to a specific strategic role:

* NJ public health-professions ecosystem
* MD/DO relevance through Rowan medical-school ecosystem
* Practical option for a student who may prefer Rowan’s environment
* Possible accelerated-path relevance

## Parent ROI note

Rowan should not be framed as “best ROI” in the general school-level sense. It should be framed as:

> Practical NJ health ecosystem option, potentially strong if the fit and pathway are right.

---

# 4. New Jersey Institute of Technology

## College Scorecard values

* Average annual cost / net price: $16,504
* Graduation rate: 80%
* Acceptance rate: 65%
* Median earnings: $91,874
* Median debt: approximately $21,000–$21,500 from secondary College Scorecard mirrors

Sources:

* College Scorecard result for average annual cost and median earnings.
* College Scorecard result for graduation rate and median earnings.
* College Scorecard result for acceptance rate.
* CampusROI mirror of College Scorecard API for debt and ROI notes.

## Preliminary ROI interpretation

NJIT is one of the strongest pure ROI schools in this NJ batch.

The financial story:

* Lowest average annual cost among this NJ group.
* Strong graduation rate.
* Very strong school-level earnings.
* Median debt appears manageable relative to earnings.

But the premed interpretation is more complicated.

NJIT’s strong ROI likely reflects engineering, computing, technology, and STEM salary outcomes. That is excellent if Lucy likes STEM, biomedical engineering, data, AI, health tech, or wants a strong fallback.

It does not automatically mean NJIT is the best classic premed environment.

## Parent ROI note

NJIT should be framed as:

> Excellent STEM/ROI and health-tech fallback option, with premed/BS-MD relevance, but likely higher GPA-risk depending on major.

This is a good example of why “school ROI” and “premed suitability” are different scores.

---

# 5. Rutgers University - Newark

## College Scorecard values

* Average annual cost / net price: $19,703
* Graduation rate: 71%
* Acceptance rate: TBD from primary search
* Median earnings: $77,933
* Median debt: approximately $21,500 from CampusROI, which states it uses College Scorecard API data

Sources:

* College Scorecard result for average annual cost and median earnings.
* College Scorecard result for graduation rate and median earnings.
* CampusROI mirror of College Scorecard API for median debt and ROI fields.

## Preliminary ROI interpretation

Rutgers-Newark looks financially attractive in the Scorecard data:

* Lower average annual cost than Rutgers NB and TCNJ.
* Median earnings are strong.
* Debt appears manageable.

But the graduation rate is meaningfully lower than Rutgers NB and TCNJ, so the app should not treat Rutgers-Newark as simply “Rutgers but cheaper.”

## Parent ROI note

Rutgers-Newark should be framed as:

> Urban public option with NJMS proximity and BA/MD relevance, but requiring careful fit analysis.

The key questions:

* Would Lucy like an urban campus?
* Is proximity to NJMS meaningfully useful?
* Is the BA/MD path realistic?
* Would Rutgers-Newark be a better or worse fit than Rutgers NB?

---

# 6. Stevens Institute of Technology

## College Scorecard values

* Average annual cost / net price: $41,346
* Graduation rate: 87%
* Acceptance rate: approximately 48% from CampusROI / secondary Scorecard mirror
* Median earnings: $112,538 in College Scorecard snippet; CampusROI lists $108,772 for 10-year earnings
* Median debt: approximately $27,000 from CampusROI, which states it uses College Scorecard API data

Sources:

* College Scorecard result for average annual cost and median earnings.
* College Scorecard result for graduation rate and median earnings.
* CampusROI mirror of College Scorecard API for debt, acceptance rate, 10-year earnings, and ROI notes.

## Preliminary ROI interpretation

Stevens has the highest earnings signal in this NJ batch and a strong graduation rate, but also a much higher average annual cost than NJ public options.

This is exactly why Stevens belongs in the app:

* It illustrates the high-ROI private STEM lane.
* It is not the same as a classic premed lane.
* Its strong salary numbers likely reflect engineering, computing, finance, and tech-heavy outcomes.
* It may be compelling if Lucy likes biomedical engineering, data, AI, health tech, or a strong non-med fallback.
* It is harder to justify purely as a “doctor path” if she would be paying a high net price and facing STEM GPA risk.

## Parent ROI note

Stevens should be framed as:

> High-ROI private STEM option; potentially excellent fallback value, but not automatically the best premed launchpad.

The question is not “Is Stevens good?” It is:

> Is Stevens good for Lucy’s likely healthcare path, and at what net price?

---

# 7. Seton Hall University

## College Scorecard values

* Average annual cost / net price: $31,446
* Graduation rate: 70%
* Acceptance rate: TBD from primary Scorecard result; secondary sources show about 73%
* Median earnings: $76,919 in a College Scorecard field-of-study snippet; CampusROI lists $70,196 for 10-year earnings
* Median debt: approximately $22,750 from CampusROI, which states it uses College Scorecard API data

Sources:

* College Scorecard result for average annual cost and median earnings.
* College Scorecard result for graduation rate and average annual cost.
* CampusROI mirror of College Scorecard API for debt, 10-year earnings, and ROI notes.
* College Board BigFuture secondary profile showing roughly $32K average per year after aid, SAT range, graduation rate, acceptance rate.

## Preliminary ROI interpretation

Seton Hall is more mixed.

The upside:

* Formal pre-health advising.
* Nearby private university option.
* Stronger case for nursing/business/healthcare-adjacent paths.
* Joint Bachelor’s/M.D. guaranteed-interview style pathway with Hackensack Meridian, from the prior research batch.

The concern:

* Higher net price than NJ publics.
* Graduation rate below Rutgers NB, TCNJ, Stevens, and NJIT.
* ROI varies heavily by major.
* Joint MD path is not guaranteed med-school admission.

## Parent ROI note

Seton Hall should be included only if we want a private NJ pre-health / nursing / guaranteed-interview comparison.

It should not be framed as the default value path.

Better framing:

> Private pre-health option where net price and intended major matter a lot.

---

# Preliminary ranking by lens

## Best NJ/local value-prestige baseline

1. Rutgers New Brunswick
2. TCNJ
3. NJIT
4. Rutgers Newark
5. Rowan

## Best school-level earnings signal

1. Stevens
2. NJIT
3. Rutgers NB / Rutgers Newark
4. Seton Hall
5. TCNJ
6. Rowan

## Best premed-strategy representation for v1

1. Rutgers NB — flagship public value baseline
2. TCNJ — smaller public value + BS/MD relevance
3. Rowan — practical health-professions ecosystem
4. NJIT — STEM/health-tech + BS/MD lane
5. Stevens — high-ROI STEM/private fallback lane
6. Rutgers Newark — urban/NJMS proximity + BA/MD lane
7. Seton Hall — private pre-health / guaranteed interview / nursing-sensitive lane

## Best “must include” schools for v1 from this batch

These five should almost certainly be in v1:

1. Rutgers New Brunswick
2. TCNJ
3. Rowan
4. NJIT
5. Stevens

These two are useful if v1 has enough room:

6. Rutgers Newark
7. Seton Hall

---

# Data-quality flags before JSON conversion

Before converting these into `data/schools_undergrad.json`, verify:

1. Exact College Scorecard field definitions.
2. Whether median earnings should use:

   * 6 years after entry
   * 10 years after entry
   * median earnings after graduation
   * field-of-study earnings
3. Whether graduation rate should use:

   * Scorecard displayed graduation rate
   * IPEDS 150% completion
   * Scorecard 8-year completion
4. Whether median debt should come directly from Scorecard API/download rather than secondary mirrors.
5. Whether acceptance rate should come from Scorecard, Common Data Set, or official admissions pages.
6. Whether average annual cost should be stored separately from official cost of attendance.

Recommended future fields:

```json
{
  "scorecard_avg_annual_cost": null,
  "official_cost_of_attendance": null,
  "scorecard_graduation_rate": null,
  "scorecard_acceptance_rate": null,
  "scorecard_median_earnings": null,
  "scorecard_median_debt": null,
  "scorecard_data_year": null,
  "scorecard_unit_id": null,
  "scorecard_source_url": null,
  "scorecard_notes": ""
}
```

---

# Research log entry

Add this to `research/research_log.md`:

```text
Date: 2026-07-09
Research topic: College Scorecard / ROI metrics for NJ-local anchor schools
Question: How do the NJ/local schools compare on standardized federal outcomes metrics?
Sources checked:
- College Scorecard school result pages
- College Scorecard glossary and data download page
- CampusROI College Scorecard API mirrors for median debt and ROI fields where direct Scorecard snippets were incomplete
Findings:
- Rutgers NB is the key public flagship/value baseline.
- TCNJ has a very strong graduation-rate signal and good value profile.
- Rowan is practical and health-ecosystem relevant, but school-level earnings and graduation metrics are lower than Rutgers/TCNJ/NJIT/Stevens.
- NJIT has a very strong ROI signal, likely driven by STEM/tech major mix.
- Rutgers-Newark has attractive cost/earnings signals but a lower graduation rate than Rutgers NB/TCNJ.
- Stevens has the strongest earnings signal but a much higher average annual cost.
- Seton Hall is more net-price and major-sensitive, with stronger use cases around private pre-health, nursing, and guaranteed-interview-style pathways.
Data added:
- Average annual cost / net price
- Graduation rate
- Acceptance rate where available
- Median earnings
- Median debt where available from secondary Scorecard API mirrors
Confidence:
- High for values directly visible in College Scorecard snippets.
- Medium for values from CampusROI and other secondary mirrors that report College Scorecard API as their source.
Open questions:
- Pull direct College Scorecard API/downloaded dataset values for median debt and exact earnings field.
- Standardize which earnings metric the app will use.
- Decide whether to use Scorecard graduation rate or IPEDS 150% completion rate.
Next recommended step:
- Start regional public batch: Pitt, Penn State, Maryland, Delaware, Stony Brook, Binghamton, Temple, Drexel.
```
