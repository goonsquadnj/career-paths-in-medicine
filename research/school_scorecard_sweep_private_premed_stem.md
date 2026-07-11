# School Scorecard Sweep — Private Pre-Health / STEM / Regional Name-Brand Schools

Research date: 2026-07-09
Project: Healthcare Pathway Planner
Batch: Private pre-health / STEM / regional name-brand schools
Status: Draft research notes before JSON conversion

## Purpose

This file adds standardized outcome and ROI-style data for the private pre-health / STEM / regional name-brand schools.

This complements:

```text
research/school_fast_sweep_private_premed_stem.md
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

College Scorecard is the preferred standardized source for federal data on costs, student debt, graduation rates, admissions test scores, acceptance rates, diversity, and post-college earnings. College Scorecard’s data page says the data were last updated June 10, 2026.

College Scorecard’s “average annual cost” is average net price for students who receive federal financial aid. It includes tuition, fees, books, supplies, and living costs, minus average grants and scholarships. This is not the same as sticker price and may not reflect what a higher-income family actually pays.

School-level earnings are useful, but they are not pure “school quality.” They reflect major mix, region, student background, labor markets, and whether students go directly to work or continue to graduate/professional school.

For Lucy’s planner, these numbers should be treated as broad ROI signals, not premed-specific outcomes.

---

# Summary table

| School                  | Avg annual cost / net price |           Graduation rate |        Acceptance rate |                                       Median earnings |                                   Median debt | Notes                                                                                                          |
| ----------------------- | --------------------------: | ------------------------: | ---------------------: | ----------------------------------------------------: | --------------------------------------------: | -------------------------------------------------------------------------------------------------------------- |
| Case Western Reserve    |                     $41,190 |                      ~87% |         ~37% secondary |          $87,989 10-year CampusROI; $89,300 secondary |     $24,000 CampusROI; $21,488 CollegeFactual | Strong private pre-health/STEM ecosystem, expensive net price                                                  |
| Boston University       |           $24,402 CampusROI |                ~88.7%–89% |                   ~11% |                             $83,238 10-year CampusROI |                             $23,250 CampusROI | Strong urban research/pre-health; surprisingly good net-price signal, but family-specific net price may differ |
| Northeastern University |                     $30,915 |                    ~90.5% | TBD / highly selective | $101,903 Scorecard display; $92,538 10-year CampusROI |                             $24,250 CampusROI | Strong co-op / earnings signal, high cost, pathway-planning complexity                                         |
| Villanova University    |   $43,756 Scorecard display | ~89%–92% depending source |                    TBD |       $104,228 Scorecard display; ~$100,423 secondary |                    ~$25,000–$25,874 secondary | Strong earnings/graduation signal, but expensive and less medically distinctive                                |
| Lehigh University       |           $36,931 CampusROI |            ~89% secondary |                    TBD |                            $105,584 10-year CampusROI |                        $21,960 CampusROI blog | Strong private STEM/business/health option-value signal                                                        |
| Lafayette College       |   $34,433 Scorecard display |                  ~88%–89% |                    TBD |  $91,758 Scorecard display; $91,410 10-year CampusROI | $17,000 field-of-study snippet; $16,000 Money | Strong liberal arts ROI signal, smaller advising model                                                         |
| University of Rochester |   $29,278 Scorecard display |                      ~86% |                   ~40% |  $87,197 Scorecard display; $79,042 10-year CampusROI |                                           TBD | Strong research/medical-center/REMS case, net price must be verified                                           |

Data-quality note:

* Direct College Scorecard snippets often expose average cost and median earnings, but not every debt/admissions field.
* CampusROI states it uses U.S. Department of Education College Scorecard API data. Use it as a useful mirror for missing debt/ROI fields, but verify directly against the Scorecard API/download before final JSON conversion.
* BigFuture, Money, CollegeFactual, Niche, and other secondary sources are useful for triangulation but should be labeled as secondary.

---

# 1. Case Western Reserve University

## College Scorecard / ROI values

College Scorecard shows Case Western Reserve University with average annual cost of $41,190.

CampusROI, which says it uses College Scorecard data, lists Case Western with:

* Average net price: $41,190
* Total four-year net cost: implied $164,760
* Median earnings 6 years post-entry: $69,900
* Median earnings 10 years post-entry: $87,989
* Median debt: $24,000
* Six-year completion rate: 87.2%
* Estimated payback period: 5.8 years

Secondary sources also report Case Western with about 87% graduation rate and roughly $89,300 earnings within 10 years of enrollment. Treat these as secondary confirmation, not the canonical source.

## Preliminary ROI interpretation

Case Western’s ROI signal is good but not cheap.

The financial story:

* High average net price compared with NJ publics.
* Strong graduation/completion signal.
* Strong earnings signal, though not as high as Stevens, Northeastern, Lehigh, or Villanova in the broader school-level data.
* Debt signal appears manageable relative to earnings.

Its app value is not purely ROI. Its real strategic value is:

* Private pre-health/STEM ecosystem
* Major hospital proximity
* Cleveland Clinic / University Hospitals / VA clinical context
* Strong biomedical and research identity
* Strong fallback value if Lucy likes STEM or health tech

## Parent ROI note

Case Western should be framed as:

> Private pre-health/STEM ecosystem school with unusually strong hospital proximity, but high net/sticker cost.

The key question is:

> Does Case buy Lucy enough pre-health ecosystem value over Rutgers, Rowan, Stony Brook, Pitt, or Temple to justify the extra cost?

## Current app role

Likely v1 inclusion.

Best category:

> Private pre-health/STEM/hospital ecosystem.

---

# 2. Boston University

## College Scorecard / ROI values

College Scorecard identifies Boston University as a highly selective private university with an acceptance rate of 11%.

BigFuture lists Boston University with:

* Acceptance rate: 11.1%
* Graduation rate: 89%
* SAT range: 1430–1510
* ACT range: 32–34
* Average per year after aid: about $25K

CampusROI, which says it uses College Scorecard-derived data, lists Boston University with:

* Average net price: $24,402
* Total four-year net cost: $97,608
* Median earnings 10 years after enrollment: $83,238
* Median debt at graduation: $23,250
* Graduation rate: 88.7%
* Estimated payback period: 4.9 years

## Preliminary ROI interpretation

BU’s ROI signal is better than its sticker price would suggest, because average net price after aid appears much lower than official cost of attendance.

The good:

* Strong graduation rate.
* Strong selectivity/prestige signal.
* Strong urban research/Boston ecosystem.
* Solid earnings signal.
* Manageable reported median debt relative to earnings.

The concern:

* BU’s sticker price is very high, and Jeff’s family-specific net price may be materially higher than the federal-aid-student average net price.
* BU is a large urban private university; opportunity access may require self-direction.
* Boston medical ecosystem is attractive but does not automatically make BU a better premed ROI than Rutgers, TCNJ, Stony Brook, Pitt, or Case.

## Parent ROI note

BU should be framed as:

> Large private urban research/pre-health school in a major medical city; potentially strong if net price is reasonable, but not worth assuming from sticker prestige alone.

The key question is:

> At Lucy’s actual net price, does BU offer enough pre-health/research/brand value to beat lower-cost options?

## Current app role

Likely v1 inclusion.

Best category:

> Private urban research/pre-health / Boston ecosystem / aid-sensitive.

---

# 3. Northeastern University

## College Scorecard / ROI values

College Scorecard shows Northeastern University with:

* Average annual cost: $30,915
* Median earnings: $101,903

CampusROI, using College Scorecard data, lists Northeastern with:

* Average net price: $30,915
* Total four-year net cost: $123,660
* Median earnings 10 years post-entry: $92,538
* Median earnings 6 years post-entry: $57,800
* Median debt: $24,250
* Estimated monthly loan payment: $257
* Six-year graduation rate: 90.5%
* Estimated payback period: 4.6 years

Money also reports Northeastern with 91% graduation rate and median student debt of $24,250.

## Preliminary ROI interpretation

Northeastern has one of the strongest broad ROI signals in this private batch.

The good:

* Strong earnings signal.
* Strong graduation signal.
* Co-op model may support career readiness.
* Strong health/STEM/business/data/tech fallback value.
* Boston urban context.

The concern:

* High cost.
* Co-op sequencing may complicate traditional premed timelines unless planned carefully.
* Strong school-level earnings likely reflect co-op, business, STEM, computing, and career-oriented majors; that does not automatically equal “best premed launchpad.”
* Need to verify how premed students manage co-ops, MCAT timing, and clinical exposure.

## Parent ROI note

Northeastern should be framed as:

> Private co-op/career/health-tech school with excellent earnings signal, but premed sequencing and net price matter.

The key question is:

> Is Lucy interested enough in experiential learning, health tech, STEM, data, public health, or career flexibility for Northeastern’s co-op model to be a real feature?

## Current app role

Likely v1 inclusion.

Best category:

> Private co-op / health-tech / career-oriented fallback / Boston ecosystem.

---

# 4. Villanova University

## College Scorecard / ROI values

College Scorecard shows Villanova University with:

* Average annual cost: $43,756
* Median earnings: $104,228

College Scorecard search also shows Villanova’s graduation rate around 89%.

CollegeFactual reports Villanova graduation rate around 89.8% and average bachelor’s-recipient earnings around $100,423. Treat this as secondary support.

Money reports Villanova with:

* Graduation rate: 91%
* Median student debt: $25,874
* Average merit grant: $28,799

Other secondary debt sources show Villanova median debt around $25,000 across borrower segments. Treat these as secondary until verified directly against Scorecard.

## Preliminary ROI interpretation

Villanova’s broad outcome signal is strong:

* Very high earnings signal.
* Strong graduation signal.
* Strong regional/private brand.
* Potentially good merit-aid signal for some students.

But Villanova’s premed-specific case is less distinctive than Case, Pitt, Stony Brook, Temple, Drexel, BU, or Rochester.

Villanova may be attractive if Lucy values:

* Private campus environment
* Regional brand
* Smaller/more personal feel than a large public
* Formal health-professions advising
* Catholic/Augustinian identity
* Strong general undergraduate option value

## Parent ROI note

Villanova should be framed as:

> Strong regional private brand with excellent broad outcomes, but not a uniquely medical-ecosystem school.

The key question is:

> Is Villanova’s fit, support, and broad option value worth the high net price compared with NJ public options?

## Current app role

Possible v1 inclusion.

Best category:

> Private regional brand / campus-fit / strong broad outcomes / aid-dependent.

---

# 5. Lehigh University

## College Scorecard / ROI values

College Scorecard’s Lehigh page is available, but the snippet did not expose every field in search.

CampusROI, using College Scorecard-derived data, lists Lehigh with:

* Average net price: $36,931
* Total four-year net cost: $147,724
* Median earnings 10 years after enrollment: $105,584
* Estimated payback period: 4.1 years
* ROI score: 93/100

A CampusROI blog gives more explicit Lehigh figures:

* Average net price: $36,931
* Median 10-year earnings: $105,584
* Median debt: $21,960

Lehigh’s official admissions page reports average starting salary of 2025 graduates at $77K and mid-career salary of $147,300, citing PayScale ranking context. Treat this as school-reported outcome marketing and not a federal Scorecard metric.

## Preliminary ROI interpretation

Lehigh has a very strong broad ROI signal.

The good:

* Strong 10-year earnings signal.
* Strong STEM/business/health option value.
* Strong regional private brand.
* Formal pre-health advising from the prior fast sweep.
* Potentially strong fallback if Lucy pivots away from medicine.

The concern:

* High net/sticker cost.
* Less obviously a dense medical-center ecosystem than Case, Pitt, Temple, Drexel, BU, Stony Brook, or Rochester.
* Strong earnings likely reflect business, engineering, STEM, and regional employer outcomes, not specifically premed.

## Parent ROI note

Lehigh should be framed as:

> Strong private STEM/business/health option-value school, not primarily a medical-ecosystem pick.

The key question is:

> Does Lehigh offer Lucy enough fit and fallback value to justify paying more than Rutgers, TCNJ, NJIT, or Stevens?

## Current app role

Possible v1 inclusion.

Best category:

> Private STEM/business/health option-value / regional brand / aid-dependent.

---

# 6. Lafayette College

## College Scorecard / ROI values

College Scorecard shows Lafayette College with:

* Average annual cost: $34,433
* Median earnings: $91,758

A College Scorecard field-of-study snippet for Lafayette shows median total debt of $17,000 for the displayed biology-related field page, but this should not be treated as the whole-school median debt without direct Scorecard verification.

CampusROI, using College Scorecard data, lists Lafayette with:

* Average net price: $34,433
* Total four-year net cost: $137,732
* Median earnings 10 years after enrollment: $91,410
* Estimated payback period: 4.9 years
* ROI score: 92/100

Money reports Lafayette with:

* Graduation rate: 89%
* Median student debt: $16,000
* Average merit grant: $24,658

## Preliminary ROI interpretation

Lafayette has a strong liberal arts / smaller-college ROI signal.

The good:

* Strong earnings signal for a liberal arts college.
* Strong graduation signal.
* Lower average net price than some private peers, though still much higher than many public options.
* Smaller undergraduate-focused environment.
* Potentially strong advising/fit.

The concern:

* Less direct medical-center/research density than Case, Pitt, Temple, Drexel, BU, Rochester, Stony Brook, or Rutgers.
* Med-school acceptance data from schools like this can be self-selected and committee-filtered.
* High sticker price means actual net price matters.

## Parent ROI note

Lafayette should be framed as:

> Smaller liberal arts pre-health option with strong broad outcomes and advising potential, but not a clinical/research ecosystem play.

The key question is:

> Would Lucy benefit enough from a smaller undergraduate-focused environment to justify the cost?

## Current app role

Possible v1 inclusion.

Best category:

> Liberal arts pre-health / smaller advising model / fit-support option.

---

# 7. University of Rochester

## College Scorecard / ROI values

College Scorecard shows University of Rochester with:

* Average annual cost: $29,278
* Median earnings: $87,197

College Scorecard also lists University of Rochester acceptance rate at 40%.

BigFuture lists University of Rochester with:

* Acceptance rate: 40.13%
* Graduation rate: 86%
* SAT range: 1420–1500
* Average per year after aid: about $61K

CampusROI, using College Scorecard data, lists University of Rochester with:

* Average net price: $29,278
* Total four-year net cost: $117,112
* Median earnings 10 years after enrollment: $79,042
* Estimated payback period: 5.8 years
* ROI score: 85/100

## Preliminary ROI interpretation

Rochester has a good but not dominant ROI signal.

Its app value is more strategic than purely financial:

* Private research university
* Medical-center adjacency
* Strong pre-health advising
* REMS direct-med relevance
* Flexible curriculum
* Strong option value if Lucy likes research/science

The discrepancy between BigFuture’s average per year after aid around $61K and Scorecard/CampusROI average annual cost around $29K is a useful warning: net price estimates can differ depending on data definition, aid population, and source. For Jeff’s family, a net price calculator or actual aid award would matter more than generic averages.

## Parent ROI note

Rochester should be framed as:

> Private research/medical-center school with direct-med relevance and flexible curriculum, but actual net price must be checked carefully.

The key question is:

> Does Rochester’s medical/research ecosystem and REMS optionality justify the net cost versus Case, Pitt, Stony Brook, Rutgers, or Rowan?

## Current app role

Likely v1 inclusion.

Best category:

> Private research / medical-center adjacency / REMS direct-med high-reach.

---

# Preliminary rankings by lens

## Best broad ROI signal in this batch

1. Lehigh University
2. Northeastern University
3. Lafayette College
4. Villanova University
5. Boston University
6. Case Western Reserve University
7. University of Rochester

Important: this is not a “best for Lucy” ranking. It is a rough interpretation from available net price, earnings, graduation, and debt data. It is also sensitive to which earnings metric is used.

## Best premed / healthcare ecosystem signal

1. Case Western Reserve University
2. University of Rochester
3. Boston University
4. Northeastern University
5. Lehigh University
6. Villanova University
7. Lafayette College

Important: this is a qualitative pathway ranking, not a sourced numerical ranking.

## Best “should appear in v1” candidates from this batch

Likely include:

1. Case Western Reserve University
2. Northeastern University
3. University of Rochester
4. Boston University

Possible include:

5. Lehigh University
6. Villanova University
7. Lafayette College

---

# What this batch teaches

## 1. Private schools split into different lanes

The app should not treat all private schools as the same.

Useful labels:

* Case Western: private pre-health/STEM/hospital ecosystem
* BU: large private urban research/pre-health
* Northeastern: private co-op/career/health-tech
* Villanova: private regional brand/campus fit
* Lehigh: private STEM/business/health option value
* Lafayette: small liberal arts pre-health/advising
* Rochester: private research/medical-center/REMS

## 2. High sticker price is not the same as average net price

Official costs often approach $90K–$100K, but Scorecard/CampusROI average net prices are lower for aid recipients. For Jeff’s family, generic average net price may not apply.

Recommended data fields:

```json
{
  "official_cost_of_attendance": null,
  "scorecard_avg_annual_cost": null,
  "family_net_price_estimate": null,
  "merit_aid_likelihood": null,
  "need_aid_likelihood": null,
  "cost_confidence": "official | scorecard | estimated | award-letter-needed"
}
```

## 3. Broad ROI and premed value are different

Lehigh, Northeastern, Villanova, and Lafayette have strong broad earnings signals.

Case Western and Rochester may be more compelling for pre-health/medicine strategy because of hospital/research/medical-school context.

BU sits in the middle: expensive but strong urban research/pre-health setting with solid outcome data.

## 4. STEM/career outcomes can distort premed interpretation

Northeastern, Lehigh, Case Western, and Stevens may look strong partly because of STEM, business, computing, engineering, finance, and co-op outcomes.

That is good if Lucy wants option value. It is not proof that these schools are better premed launchpads.

## 5. The app should show “why included”

A private school earns a v1 spot only if it teaches a distinct lesson:

* Case: hospital ecosystem
* Northeastern: co-op/career/health-tech
* Rochester: REMS/medical-center/flexible curriculum
* BU: Boston urban research
* Lehigh: private STEM/business/health option value
* Villanova: regional private/campus fit
* Lafayette: liberal arts advising/fit

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
3. Whether median debt should come directly from Scorecard API/download rather than CampusROI, Money, CollegeFactual, or other secondary sources.
4. Whether acceptance rate should come from Scorecard, Common Data Set, BigFuture, or official admissions pages.
5. Whether average annual cost should be stored separately from official cost of attendance.
6. How to handle need-based vs. merit-based aid for a high-income NJ family.
7. Whether each school’s clinical ecosystem is actually accessible to undergraduate students.

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
  "official_cost_of_attendance": null,
  "family_cost_flag": "private | aid_dependent | likely_full_pay | merit_possible",
  "source_confidence": "high | medium | low",
  "scorecard_notes": ""
}
```

---

# Research log entry

Add this to `research/research_log.md`:

```text
Date: 2026-07-09
Research topic: College Scorecard / ROI metrics for private pre-health, STEM, and regional name-brand schools
Question: How do Case Western, BU, Northeastern, Villanova, Lehigh, Lafayette, and Rochester compare on standardized outcome and ROI-style metrics?
Sources checked:
- College Scorecard school pages and snippets
- College Scorecard glossary and data download page
- College Board BigFuture school profiles
- CampusROI College Scorecard-derived profiles
- Money and CollegeFactual where direct Scorecard snippets did not expose all fields
Findings:
- Case Western is a strong private pre-health/STEM/hospital ecosystem example but expensive.
- BU is a strong urban research/pre-health example with a better average-net-price signal than sticker price suggests, though family-specific net price may differ.
- Northeastern has a very strong co-op/career/earnings signal and useful health-tech fallback logic.
- Villanova has strong broad earnings and graduation signals but is less distinctive as a medical-ecosystem school.
- Lehigh has a strong broad ROI signal and good STEM/business/health option value.
- Lafayette has a strong liberal arts ROI signal and may represent the smaller-college advising/fit path.
- Rochester is valuable because of research/medical-center adjacency and REMS, even if its broad ROI signal is not the strongest in this batch.
Data added:
- Average annual cost / net price
- Graduation rate where available
- Acceptance rate where available
- Median earnings
- Median debt where available
- Parent ROI notes
Confidence:
- High for direct College Scorecard displayed values.
- Medium for CampusROI values that state they use College Scorecard data.
- Medium for BigFuture, Money, CollegeFactual, Niche, and other secondary sources.
Open questions:
- Pull exact direct College Scorecard API/download fields before JSON conversion.
- Standardize one default earnings metric.
- Add family-specific net price assumptions.
- Decide which of these schools make the v1 app list.
Next recommended step:
- Start elite/reach batch: Princeton, Penn, Johns Hopkins, Duke, Brown, Cornell, Columbia, Harvard, Yale, Stanford, MIT, University of Chicago.
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

## Strong v1 candidates from private pre-health / STEM batch

* Case Western Reserve University
* Northeastern University
* University of Rochester
* Boston University

## Possible v1 candidates

* Rutgers Newark
* Seton Hall
* University of Delaware
* Binghamton University
* Penn State University Park
* Lehigh University
* Villanova University
* Lafayette College

## Current working interpretation

The v1 school explorer should include enough schools to show the strategic map:

* NJ public value
* Smaller public value
* STEM/ROI fallback
* Urban clinical ecosystem
* Out-of-state public comparison
* Private co-op / pre-health
* Private research / medical-center
* Private regional brand / fit
* Liberal arts pre-health
* Elite/reach
* BS/MD / early assurance
