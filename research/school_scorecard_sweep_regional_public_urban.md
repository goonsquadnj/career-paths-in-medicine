# School Scorecard Sweep — Regional Public / Urban Clinical Ecosystem Schools

Research date: 2026-07-09
Project: Healthcare Pathway Planner
Batch: Regional public / urban clinical ecosystem schools
Status: Draft research notes before JSON conversion

## Purpose

This file adds standardized outcome and ROI-style data for the regional public / urban clinical ecosystem schools.

This complements:

```text
research/school_fast_sweep_regional_public_urban.md
```

The fast-sweep file focused on official school costs, pre-health advising, clinical ecosystem, and special pathways.

This file focuses on:

* College Scorecard average annual cost / net price
* Graduation rate
* Acceptance rate
* Median earnings
* Median debt where available
* Preliminary ROI interpretation
* Parent ROI notes

## Important definitions and limitations

College Scorecard’s average annual cost is not the same as sticker price. Its glossary describes average annual cost as average net price for federal-aid students, calculated from tuition, fees, books, supplies, and living costs minus average grants and scholarships.

College Scorecard’s data download page says the data available on Scorecard were last updated June 10, 2026.

College Scorecard is the preferred source for standardized federal data on costs, debt, graduation rates, admissions test scores, acceptance rates, and post-college earnings.

Important limitation:

> School-level earnings are not pure school quality. They reflect major mix, region, student background, labor markets, and whether students go directly to work or continue to graduate/professional school.

For Lucy’s planner, these numbers should be treated as broad ROI signals, not premed-specific outcomes.

---

# Summary table

| School                                | Avg annual cost / net price |                  Graduation rate |                Acceptance rate |                                                              Median earnings |                             Median debt | Notes                                                                   |
| ------------------------------------- | --------------------------: | -------------------------------: | -----------------------------: | ---------------------------------------------------------------------------: | --------------------------------------: | ----------------------------------------------------------------------- |
| University of Pittsburgh              |                     $30,434 |   82%–86% depending source/field |                         58.08% |                         $73,701 Scorecard display; $66,125 10-year CampusROI |                                 $24,250 | Strong health-sciences ecosystem, but costly for NJ family              |
| Penn State University Park            |                     $32,875 |                             ~86% | 57.61% / ~61% depending source |                         $76,659 Scorecard display; $63,435 10-year CampusROI |                                 $25,000 | Broad flagship value, but expensive OOS                                 |
| University of Maryland - College Park |                     $15,678 | 85%–88.6% depending source/field |                         44.79% |                         $84,365 Scorecard display; $82,860 10-year CampusROI |                                 $19,000 | Strong ROI signal, but NJ family faces OOS sticker price                |
| University of Delaware                |                     $17,799 |        ~80%–84% depending source | 65.11% / ~71% depending source | $77,675 Scorecard display; $72,950 10-year secondary Scorecard-derived value | ~$21,000–$24,861 depending source/field | Good regional-public signal, but OOS cost matters                       |
| Stony Brook University                |                     $18,784 |       75.6%–78% depending source |                         42.71% |                                                                      $81,850 |                                 $18,228 | Strong SUNY science/medical ecosystem, solid ROI                        |
| Binghamton University                 |                     $21,620 |        ~82%–84% depending source |                          38.6% |                                                                      $80,304 |                                 $19,500 | Strong SUNY academic/value signal, less clinical-urban than Pitt/Temple |
| Temple University                     |                     $28,198 |                              75% |                         80.45% |                         $67,232 Scorecard display; $63,727 10-year CampusROI |                                 $24,395 | Urban clinical exposure, fair ROI, major-sensitive                      |
| Drexel University                     |                     $38,509 |       74%–78.2% depending source |                         77.53% |                         $91,041 Scorecard display; $84,648 10-year CampusROI |                                 $25,325 | Strong earnings/co-op signal, high net/sticker price                    |

Data-quality note: where direct College Scorecard search snippets did not expose every field, secondary tools using College Scorecard data are labeled as such. Before final JSON conversion, the exact Scorecard API/download fields should be pulled directly and standardized.

---

# 1. University of Pittsburgh

## College Scorecard / ROI values

College Scorecard shows University of Pittsburgh-Pittsburgh Campus with:

* Average annual cost: $30,434
* Graduation rate: 82%
* Median earnings: $73,701
* Median total debt after graduation: $24,250
* Typical monthly loan payment: $257

College Board BigFuture lists Pitt’s acceptance rate at 58.08% and graduation rate at 84%.

CampusROI, which says it uses U.S. Department of Education College Scorecard data, lists Pitt with average net price of $30,434, 10-year median earnings of $66,125, 6-year median earnings of $44,300, graduation rate of 85.5%, median debt of $24,250, and a payback period of 8.4 years.

## Preliminary ROI interpretation

Pitt has a strong health-sciences ecosystem case, but the ROI is not a slam dunk for a New Jersey family if Lucy pays close to out-of-state pricing.

Its value is not mainly “cheap school.” Its value is:

* Urban research university
* Strong pre-health ecosystem
* UPMC / health sciences adjacency
* Pitt School of Medicine ecosystem
* High-reach medical guaranteed-admission option

## Parent ROI note

Pitt should be framed as:

> Strong health-sciences ecosystem, but cost-sensitive for a NJ family.

The key question is:

> Does Pitt buy Lucy enough additional clinical/research ecosystem value over Rutgers, Rowan, TCNJ, or NJIT to justify the higher likely cost?

## Current app role

Likely v1 inclusion.

Best category:

> Urban health-sciences research university / strong pre-health ecosystem / cost-sensitive OOS public.

---

# 2. Penn State University Park

## College Scorecard / ROI values

College Scorecard shows Pennsylvania State University-Main Campus with:

* Average annual cost: $32,875
* Median earnings: $76,659

College Board BigFuture lists Penn State University Park’s acceptance rate at 57.61%.

CampusROI, using College Scorecard data, lists Penn State Main Campus with average net price of $32,875, 10-year median earnings of $63,435, 6-year median earnings of $43,600, graduation rate of 86.1%, median debt of $25,000, and estimated payback period of 9.5 years.

## Preliminary ROI interpretation

Penn State has strong broad-brand and large-flagship value, but the ROI case is weaker for a New Jersey premed student than for an in-state Pennsylvania student.

The good:

* Strong graduation rate
* Huge alumni network
* Big-campus option value
* Broad majors if Lucy pivots

The concern:

* High average annual cost / OOS cost posture
* Less distinctive clinical ecosystem than Pitt, Temple, Drexel, Stony Brook, Rutgers-Newark, or Rowan
* Not obviously better than Rutgers NB for a NJ premed student unless Lucy strongly prefers the fit

## Parent ROI note

Penn State should be framed as:

> Large flagship / broad option-value school, not a specialized premed bargain for a NJ family.

The key question is:

> Is Penn State materially better for Lucy than Rutgers or TCNJ, or is it mainly a familiar regional brand at a higher cost?

## Current app role

Possible v1 inclusion.

Best category:

> Large regional flagship / broad option value / expensive OOS comparison.

---

# 3. University of Maryland - College Park

## College Scorecard / ROI values

College Scorecard shows University of Maryland-College Park with:

* Average annual cost: $15,678
* Median earnings: $84,365

Another College Scorecard result shows a graduation rate of 85%, average annual cost of $15,678, and median earnings of $84,365.

College Board BigFuture lists UMD’s acceptance rate at 44.79%, graduation rate at 88%, SAT range 1410–1520, and ACT range 32–35.

CampusROI, using College Scorecard data, lists UMD with average net price of $15,678, 10-year median earnings of $82,860, 6-year median earnings of $50,100, graduation rate of 88.6%, median debt of $19,000, and an estimated payback period of 4.2 years.

## Preliminary ROI interpretation

UMD has one of the strongest ROI signals in this batch.

The challenge is that College Scorecard average net price can be misleading for a NJ family because it reflects average net price for federal-aid students, not necessarily the out-of-state sticker price Lucy would face.

The good:

* Strong earnings signal
* Strong graduation rate
* Strong academic/STEM reputation
* Strong regional brand
* Good option value if Lucy pivots

The concern:

* Out-of-state sticker price for a NJ family may be much higher than Scorecard average annual cost
* Need to model actual net price, not just Scorecard average net price
* Not specifically “medical school path” unless combined with fit, advising, clinical/research access, or major

## Parent ROI note

UMD should be framed as:

> Strong regional public research university with excellent outcome signals, but actual NJ-family cost must be modeled separately.

The key question is:

> Does UMD’s academic/STEM/option value justify paying more than Rutgers, TCNJ, NJIT, or Rowan?

## Current app role

Medium-high v1 inclusion.

Best category:

> Strong regional public research university / STEM + pre-health breadth / actual-cost-sensitive.

---

# 4. University of Delaware

## College Scorecard / ROI values

College Scorecard shows University of Delaware with:

* Average annual cost: $17,799
* Median earnings: $77,675

College Board BigFuture lists University of Delaware’s acceptance rate at 65.11% and graduation rate at 84%.

Secondary Scorecard-derived sources vary slightly on earnings and debt. CollegeValueRanked says its data come from the U.S. Department of Education College Scorecard and lists University of Delaware at $17,799 net price and $72,950 median earnings.

AllNurses, using College Scorecard API data, lists University of Delaware with graduation rate of 79.2%, median debt at graduation of $21,000, retention rate of 92%, and median earnings ten years after enrollment of $72,950.

## Preliminary ROI interpretation

Delaware looks like a solid regional public from an outcomes perspective, but the value for a NJ family depends heavily on out-of-state cost and merit aid.

The good:

* Solid graduation rate
* Good earnings signal
* Familiar regional campus option
* Potentially attractive health sciences / nursing / pre-health environment

The concern:

* Out-of-state cost can move Delaware into private-school territory
* It may not be obviously better than Rutgers or TCNJ unless Lucy strongly prefers the fit or receives meaningful aid
* Need to model direct-admit nursing/health sciences separately if relevant

## Parent ROI note

Delaware should be framed as:

> Solid regional public campus-fit option, but not automatically a better value than NJ in-state choices.

The key question is:

> Is Delaware better enough for Lucy to justify paying more than NJ options?

## Current app role

Possible v1 inclusion.

Best category:

> Regional public / campus-fit / health-sciences option / OOS cost-sensitive.

---

# 5. Stony Brook University

## College Scorecard / ROI values

College Scorecard shows Stony Brook University with:

* Average annual cost: $18,784
* Median earnings: $81,850

College Board BigFuture lists Stony Brook’s acceptance rate at 42.71%, graduation rate at 78%, SAT range 1350–1480, and ACT range 29–34.

College Scorecard also shows median total debt after graduation of $18,228 and a typical monthly loan payment of $193.

CampusROI, using Scorecard data, describes Stony Brook as a strong-value public institution and lists median debt of $18,228, net price of $18,784, and a 75.6% completion rate.

## Preliminary ROI interpretation

Stony Brook has a strong combination of:

* Solid cost signal
* Strong earnings signal
* Modest debt signal
* Strong science/research reputation
* Medical-center ecosystem

For a NJ family, Stony Brook is still out-of-state, but it may be more strategically relevant for premed/science than some other OOS publics.

## Parent ROI note

Stony Brook should be framed as:

> Strong SUNY science/research/medical ecosystem option with good ROI signals, but still OOS for Lucy.

The key question is:

> Does Stony Brook’s science and medical ecosystem offer a meaningful advantage over Rutgers or Rowan for Lucy?

## Current app role

Likely v1 inclusion.

Best category:

> SUNY research / strong science / medical-center ecosystem / premed-relevant OOS comparison.

---

# 6. Binghamton University

## College Scorecard / ROI values

College Scorecard shows Binghamton University with:

* Average annual cost: $21,620
* Median earnings: $80,304

College Board BigFuture lists Binghamton’s acceptance rate at 38.6%, graduation rate at 84%, SAT range 1360–1480, and ACT range 31–34.

CampusROI, using College Scorecard data, lists Binghamton median debt of $19,500.

## Preliminary ROI interpretation

Binghamton has strong academic/value signals:

* Selective public
* Strong graduation rate
* Strong earnings signal
* Reasonable debt signal

The premed-specific case is less obvious than Stony Brook, Pitt, Temple, or Drexel because Binghamton is not as clearly tied to a large urban/medical-center ecosystem.

## Parent ROI note

Binghamton should be framed as:

> Strong SUNY academic/value option, but not necessarily a specialized premed ecosystem pick.

The key question is:

> Is Binghamton academically and financially compelling enough to beat Rutgers/TCNJ, or is it mostly a strong out-of-state public comparison?

## Current app role

Possible v1 inclusion.

Best category:

> Strong SUNY public academic/value option / traditional pre-health path.

---

# 7. Temple University

## College Scorecard / ROI values

College Scorecard shows Temple University with:

* Average annual cost: $28,198
* Median earnings: $67,232

College Board BigFuture lists Temple’s acceptance rate at 80.45%, graduation rate at 75%, and average per year after aid of $24K.

CampusROI, using College Scorecard data, lists Temple with average net price of $28,198, 10-year median earnings of $63,727, graduation rate of 75.0%, median debt of $24,395, and a payback period of 8.8 years.

## Preliminary ROI interpretation

Temple’s ROI signal is fair, not elite, but Temple’s value in the app is not purely school-level earnings.

Temple belongs because it illustrates:

* Urban clinical exposure
* Temple Health / LKSOM ecosystem
* Philadelphia healthcare context
* Multiple health-profession pathways
* A public urban alternative to private Drexel

The concern is cost and major sensitivity. Temple may be very interesting for the right student and the right price, but it is not an obvious ROI winner versus NJ public options.

## Parent ROI note

Temple should be framed as:

> Urban clinical-exposure option with fair ROI; valuable for healthcare ecosystem comparison, but cost and fit matter.

The key question is:

> Does Temple’s urban healthcare ecosystem materially improve Lucy’s path versus NJ options?

## Current app role

Likely v1 inclusion.

Best category:

> Urban clinical exposure / Temple Health pathway / public Philadelphia comparison.

---

# 8. Drexel University

## College Scorecard / ROI values

College Scorecard shows Drexel University with:

* Average annual cost: $38,509
* Graduation rate: 74%
* Median earnings: $91,041

College Board BigFuture lists Drexel’s acceptance rate at 77.53%, graduation rate at 78%, and average per year after aid of $42K.

CampusROI, using College Scorecard data, lists Drexel with average net price of $38,509, total four-year net cost of $154,036, 10-year median earnings of $84,648, 6-year median earnings of $54,400, median debt of $25,325, estimated payback period of 5.9 years, and 6-year graduation rate of 78.2%.

## Preliminary ROI interpretation

Drexel has one of the strongest earnings signals in this batch, but it also has one of the highest average annual costs.

This is exactly why Drexel belongs in the app:

* Strong earnings / co-op signal
* Urban Philadelphia healthcare/research environment
* Private pre-health path
* BA/BS+MD early assurance option
* Health-tech / biomedical engineering / co-op fallback value

The challenge is that cost and program structure are complicated. Drexel’s quarter/co-op calendar and high sticker price mean net price and intended path matter a lot.

## Parent ROI note

Drexel should be framed as:

> High-cost, high-earnings, private urban co-op option; potentially useful for pre-health/health-tech, but aid and fit are critical.

The key question is:

> Is Drexel’s co-op/urban/pre-health structure worth the extra cost compared with Rutgers, NJIT, Rowan, Temple, or Pitt?

## Current app role

Likely v1 inclusion.

Best category:

> Private urban co-op / pre-health / health-tech fallback / BS+MD early assurance.

---

# Preliminary rankings by lens

## Best ROI signal in this batch

1. University of Maryland - College Park
2. Stony Brook University
3. Binghamton University
4. University of Delaware
5. Drexel University
6. University of Pittsburgh
7. Penn State University Park
8. Temple University

Important: this is not a “best for Lucy” ranking. It is a rough ROI-signal interpretation from available cost, earnings, graduation, and debt data.

## Best premed / healthcare ecosystem signal

1. University of Pittsburgh
2. Stony Brook University
3. Temple University
4. Drexel University
5. University of Maryland
6. University of Delaware
7. Binghamton University
8. Penn State University Park

Important: this is a qualitative pathway ranking, not a sourced numerical ranking.

## Best “should appear in v1” candidates from this batch

Likely include:

1. University of Pittsburgh
2. Stony Brook University
3. Temple University
4. Drexel University
5. University of Maryland

Possible include:

6. University of Delaware
7. Binghamton University
8. Penn State University Park

---

# What this batch teaches

## 1. OOS public schools need a high bar

Many regional public schools look attractive academically, but a New Jersey family may pay out-of-state pricing. That means the app should not treat “public” as automatically “value.”

## 2. Net price and sticker price must both be stored

College Scorecard average annual cost is useful, but Jeff’s actual family cost may be very different, especially at out-of-state publics or private schools.

Recommended data fields:

```json
{
  "official_cost_of_attendance_in_state": null,
  "official_cost_of_attendance_out_of_state": null,
  "scorecard_avg_annual_cost": null,
  "estimated_family_net_price": null,
  "merit_aid_likelihood": null
}
```

## 3. Premed ecosystem and ROI are different

Maryland and Binghamton may look excellent on broad ROI metrics. Pitt, Temple, and Drexel may be more interesting from a healthcare-pathway standpoint. Stony Brook may be strong on both.

## 4. Drexel and Stevens belong in the same “high-cost/high-earnings/private-STEM-or-co-op” conversation

Drexel’s earnings signal is strong, but the cost is high. Like Stevens, it may be valuable if Lucy likes STEM, co-op, health tech, biomedical engineering, or a practical career fallback. It is less obvious as a pure “pay a lot to be premed” choice.

## 5. Pitt and Temple are ecosystem plays

They may not win the pure ROI table, but they help illustrate the value of urban healthcare ecosystems and formal pathway/linkage programs.

---

# Data-quality flags before JSON conversion

Before converting these into `data/schools_undergrad.json`, verify:

1. Exact College Scorecard field definitions.
2. Whether the app’s default earnings field should be:

   * Scorecard displayed median earnings
   * 10-year median earnings after entry
   * 6-year earnings
   * field-of-study earnings
   * post-completion earnings
3. Whether graduation rate should use:

   * Scorecard displayed graduation rate
   * IPEDS 150% completion
   * Scorecard 8-year completion
4. Whether median debt should come directly from Scorecard API/download rather than CampusROI or other secondary mirrors.
5. Whether acceptance rate should come from Scorecard, Common Data Set, BigFuture, or official admissions pages.
6. How to flag out-of-state public pricing for a New Jersey resident.

Recommended future fields:

```json
{
  "scorecard_unit_id": null,
  "scorecard_avg_annual_cost": null,
  "scorecard_graduation_rate": null,
  "scorecard_acceptance_rate": null,
  "scorecard_median_earnings_display": null,
  "scorecard_median_earnings_10yr": null,
  "scorecard_median_debt": null,
  "scorecard_data_year": "2024-2025 / 2026 Scorecard release, verify",
  "official_cost_in_state": null,
  "official_cost_out_of_state": null,
  "nj_family_cost_flag": "in_state | out_of_state | private | aid_dependent",
  "source_confidence": "high | medium | low",
  "scorecard_notes": ""
}
```

---

# Research log entry

Add this to `research/research_log.md`:

```text
Date: 2026-07-09
Research topic: College Scorecard / ROI metrics for regional public and urban clinical ecosystem schools
Question: How do Pitt, Penn State, Maryland, Delaware, Stony Brook, Binghamton, Temple, and Drexel compare on standardized outcome and ROI-style metrics?
Sources checked:
- College Scorecard school pages and snippets
- College Scorecard glossary and data download page
- College Board BigFuture school profiles
- CampusROI College Scorecard-derived profiles where direct Scorecard snippets did not expose all fields
Findings:
- UMD, Stony Brook, Binghamton, and Delaware have strong broad ROI signals.
- Pitt, Temple, Drexel, and Stony Brook are especially useful for healthcare ecosystem comparisons.
- Drexel has a strong earnings signal but high average annual cost.
- Pitt has strong healthcare ecosystem value but is costly for a NJ family.
- Penn State has broad flagship option value but is not as distinctive for healthcare-pathway analysis.
- Out-of-state public schools must be evaluated against NJ in-state baselines, not simply treated as “public = value.”
Data added:
- Average annual cost / net price
- Graduation rate
- Acceptance rate
- Median earnings
- Median debt where available
- Parent ROI notes
Confidence:
- High for direct College Scorecard display values.
- Medium for values from CampusROI and other secondary tools that state they use College Scorecard data.
- Medium for BigFuture acceptance and graduation values.
Open questions:
- Pull exact direct College Scorecard API/download fields before JSON conversion.
- Standardize one default earnings metric.
- Add official net price calculator / merit aid notes.
- Decide which of these schools make the v1 app list.
Next recommended step:
- Start private pre-health / STEM / regional name-brand batch: Case Western, Boston University, Northeastern, Villanova, Lehigh, Lafayette, University of Rochester.
```

---

# Recommended v1 status after this batch

## Strong v1 candidates from NJ/local batch

* Rutgers New Brunswick
* TCNJ
* Rowan
* NJIT
* Stevens

## Strong v1 candidates from regional / urban batch

* University of Pittsburgh
* Stony Brook University
* Temple University
* Drexel University
* University of Maryland

## Possible v1 candidates

* Rutgers Newark
* Seton Hall
* University of Delaware
* Binghamton University
* Penn State University Park

## Current working interpretation

The v1 school explorer should not include every school researched. It should include enough schools to show the strategic map:

* NJ public value
* Smaller public value
* STEM/ROI fallback
* Urban clinical ecosystem
* Out-of-state public comparison
* Private co-op / pre-health
* Elite/reach
* BS/MD / early assurance
