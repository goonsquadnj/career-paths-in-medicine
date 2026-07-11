# School Scorecard Sweep — Elite / Reach / Name-Brand Schools

Research date: 2026-07-09
Project: Healthcare Pathway Planner
Batch: Elite / reach / name-brand schools
Status: Draft research notes before JSON conversion

## Purpose

This file adds standardized outcome and ROI-style data for elite/reach schools.

This complements:

```text
research/school_fast_sweep_elite_reach.md
```

The fast-sweep file focused on official cost, pre-health advising, medical ecosystem, strategic role, and fit questions.

This file focuses on:

* College Scorecard average annual cost / net price
* Graduation rate
* Acceptance/selectivity where available
* Median earnings
* Median debt where available
* ROI interpretation
* Parent ROI notes

## Important definitions and limitations

College Scorecard is the preferred federal source for college-level cost, debt, graduation-rate, admissions, and earnings data. The Scorecard data page says the downloadable data were last updated June 10, 2026.

College Scorecard’s average annual cost is not sticker price. Its glossary describes average annual cost as average net price for federal-aid students after grants and scholarships. This can be very different from what a high-income family actually pays.

College Scorecard earnings are useful, but they are not pure “school quality.” They are affected by major mix, geography, family background, graduate-school continuation, and whether students received federal aid.

For Lucy’s planner, elite-school outcome data should be treated as:

> A broad ROI and option-value signal, not a premed-specific ranking.

---

# Summary table

| School        |   Avg annual cost / net price |       Graduation rate |                                              Median earnings |                                  Median debt | Notes                                                              |
| ------------- | ----------------------------: | --------------------: | -----------------------------------------------------------: | -------------------------------------------: | ------------------------------------------------------------------ |
| Princeton     |  $6,128 Scorecard / CampusROI |        ~98% secondary |          $108,590 Scorecard display; $110,066 CampusROI 10yr |                           ~$10,320 secondary | Extraordinary aid/ROI signal; no med school on campus              |
| Penn          |             $28,699 Scorecard |        ~97% secondary | $124,586 Scorecard display; $105,300–$111,371 secondary 10yr |                   ~$15,715–$19,600 secondary | Elite Ivy + Penn Medicine ecosystem                                |
| Johns Hopkins |            ~$29,800 secondary | 95% official six-year |                                      ~$97,200 secondary 10yr |                           ~$22,500 secondary | Elite biomedical/research ecosystem; strong med-school admit claim |
| Duke          |             $29,612 Scorecard |    ~96%–97% secondary |          $115,722 Scorecard display; ~$97,800 secondary 10yr |                                          TBD | Elite private + Duke Health ecosystem                              |
| Brown         |             $25,184 Scorecard |                   TBD |            $94,678 Scorecard display; $93,487 CampusROI 10yr |                           ~$10,000 secondary | Ivy/open curriculum + PLME direct-med lane                         |
| Cornell       |     $28,690 Scorecard display |        ~95% secondary |          $113,372 Scorecard display; $104,043 CampusROI 10yr |                           ~$14,000 secondary | Large Ivy research; less urban medical adjacency                   |
| Columbia      |             $21,590 Scorecard |        ~95% secondary |                                   $115,519 Scorecard display |                           ~$18,750 secondary | Ivy + NYC ecosystem + Core/urban intensity                         |
| Harvard       | $19,066 Scorecard / CampusROI |        ~98% secondary |          $134,794 Scorecard display; $101,817 CampusROI 10yr |                           ~$14,000 CampusROI | Maximum broad prestige/option value                                |
| Yale          |             $23,777 CampusROI | 98% Scorecard display |          $142,936 Scorecard display; $100,533 CampusROI 10yr | $12,562 Scorecard display; $12,975 CampusROI | Ultra-elite + Yale-New Haven ecosystem                             |
| Stanford      | $13,807 Scorecard / CampusROI | 97% Scorecard display |     ~$137K Scorecard search display; $124,080 CampusROI 10yr |                            $12,000 CampusROI | Elite medicine + tech/biomed/AI ecosystem                          |
| MIT           | $20,111 Scorecard / CampusROI |      ~96.4% CampusROI |          $161,961 Scorecard display; $143,372 CampusROI 10yr |                            $14,768 CampusROI | Highest STEM/tech earnings signal; GPA/intensity caution           |
| UChicago      | $14,860 Scorecard / CampusROI |                   TBD |           $127,757 Scorecard display; $91,885 CampusROI 10yr |                                          TBD | Elite intellectual/Core model + UChicago Medicine                  |

Data-quality note:

* “Scorecard display” values are from College Scorecard snippets/pages surfaced in search.
* “CampusROI” values are secondary mirrors that state they use College Scorecard API data. They are useful for missing fields but should be verified against direct Scorecard API/download before final JSON conversion.
* Some “median earnings” values differ because sources may use different fields: Scorecard display, 10-year post-entry earnings, field-of-study earnings, or early-career earnings.
* For final JSON, we should store multiple earnings fields rather than pretending there is only one “true” salary number.

---

# 1. Princeton University

## College Scorecard / ROI values

College Scorecard shows Princeton with:

* Average annual cost: $6,128
* Median earnings: $108,590

CampusROI lists Princeton with:

* Average net price: $6,128
* Four-year net cost: $24,512
* Median earnings 10 years after enrollment: $110,066
* Estimated payback period: 2.2 years

A secondary ROI source lists median debt around $10,320, but this should be verified directly against Scorecard before final JSON.

Money reports Princeton’s six-year graduation rate at 98% and says recent graduates’ median salaries are nearly $110,000, based on College Scorecard.

## Preliminary ROI interpretation

Princeton has one of the strongest apparent ROI signals in the entire candidate universe, but that is driven heavily by generous need-based aid and very low average net price for aid recipients.

For Jeff’s family, the important caveat is:

> Princeton’s average net price may not resemble Lucy’s actual net price.

Princeton is also not a medical-ecosystem school in the same sense as Penn, Hopkins, Stanford, Duke, Yale, Columbia, or UChicago. Its strategic value is elite undergraduate education, brand, research, advising, and option value.

## Parent ROI note

Princeton should be framed as:

> Elite general prestige with unusually strong need-aid/ROI signal, but not a med-school-adjacent campus.

The key question:

> If Lucy were admitted and the net price were reasonable, does Princeton’s broad prestige and undergraduate fit outweigh the lack of medical-school adjacency?

## Current app role

Likely v1 inclusion.

Best category:

> Elite general prestige / NJ-adjacent / strong aid / no med-school adjacency.

---

# 2. University of Pennsylvania

## College Scorecard / ROI values

College Scorecard shows Penn with:

* Average annual cost: $28,699
* Median earnings: $124,586

Secondary Scorecard-derived sources list:

* Median 10-year earnings around $105,300 to $111,371
* Median debt around $15,715 to $19,600
* Graduation rate around 97%
* Admission rate around 5%

## Preliminary ROI interpretation

Penn has a strong ROI signal and one of the most useful elite-prehealth strategic profiles:

* Ivy prestige
* Urban Philadelphia
* Penn Medicine ecosystem
* Strong broad fallback value
* Business/Wharton, policy, life sciences, research, and healthcare option value

Penn’s app value is stronger than “elite name.” It is one of the clearest examples of elite prestige plus medical ecosystem.

## Parent ROI note

Penn should be framed as:

> Elite Ivy with a major medical ecosystem and unusually strong broad option value, but very high selectivity and aid-dependent affordability.

The key question:

> Does Lucy want an intense urban Ivy with substantial pre-professional culture?

## Current app role

Very likely v1 inclusion.

Best category:

> Elite urban medical ecosystem / Ivy / broad option value.

---

# 3. Johns Hopkins University

## College Scorecard / ROI values

The College Scorecard page exists for Johns Hopkins, but the snippet did not expose all fields in this sweep.

Hopkins’ own admissions fast-facts page reports:

* 98% first-year retention
* 95% graduate within six years
* 38% continue to graduate/professional school
* 85% admit rate to medical school

These are school-reported figures and should be stored as official-school claims, not federal Scorecard data.

CampusROI reports for Johns Hopkins:

* Average net price: about $29,800
* Median earnings 10 years after entry: about $97,200
* Median federal debt at graduation: about $22,500
* Payback period: about 4.0 years

## Preliminary ROI interpretation

Johns Hopkins is not just an elite school; it is the clearest “elite biomedical/pre-med reputation” school in this universe.

Its strategic strengths:

* Biomedical/research brand
* Strong medical ecosystem
* Very strong official medical-school admit-rate claim
* High research density
* Strong graduate/professional continuation culture

The tradeoff:

* Potential high-intensity premed environment
* Cost if aid is not strong
* GPA/stress risk
* Not necessary for medical-school admission

## Parent ROI note

Hopkins should be framed as:

> Elite biomedical/research premed reach; potentially powerful, but not required and potentially intense.

The key question:

> Would Lucy thrive in an environment where many peers are also highly motivated science/premed students?

## Current app role

Very likely v1 inclusion.

Best category:

> Elite biomedical/research / premed reputation / medical ecosystem.

---

# 4. Duke University

## College Scorecard / ROI values

College Scorecard shows Duke with:

* Average annual cost: $29,612
* Median earnings: $115,722

CampusROI lists Duke with:

* Average net price: $29,612
* Four-year net cost: $118,448
* Typical graduate earnings 10 years after enrollment: about $97,800
* Estimated payback period: about 4.1 years

Secondary sources report Duke acceptance around 6% and graduation around 97%, but these should be verified against official Common Data Set or Scorecard API before final JSON.

## Preliminary ROI interpretation

Duke has a strong broad ROI signal and strong medical-ecosystem value.

Its strategic strengths:

* Elite private university
* Duke Health ecosystem
* Strong undergraduate brand
* Strong research
* Broad fallback value if Lucy pivots away from medicine

The tradeoff:

* Highly selective
* Farther from NJ
* High sticker price
* Need-based aid dependence
* Campus-culture fit matters

## Parent ROI note

Duke should be framed as:

> Elite private research university with strong medical ecosystem and broad option value.

The key question:

> Would Lucy like Duke’s campus culture, distance from home, and high-performing peer environment?

## Current app role

Likely v1 inclusion if we want a non-Northeast elite medical-ecosystem comparison.

Best category:

> Elite private / Duke Health / broad option value.

---

# 5. Brown University

## College Scorecard / ROI values

College Scorecard shows Brown with:

* Average annual cost: $25,184
* Median earnings: $94,678

CampusROI lists Brown with:

* Average net price: $25,184
* Four-year net cost: $100,736
* Typical graduate earnings 10 years after enrollment: $93,487
* Estimated payback period: about 4.1 years

A secondary source lists Brown median graduate debt around $10,000, but this should be verified directly before JSON conversion.

## Preliminary ROI interpretation

Brown’s ROI signal is solid, but its bigger app value is strategic:

* Ivy prestige
* Open Curriculum
* PLME direct-med pathway
* More flexible undergraduate exploration model
* Strong broad option value

Brown regular premed and Brown PLME should be modeled as separate strategies.

## Parent ROI note

Brown should be framed as:

> Elite open-curriculum school with a distinct direct-med lane through PLME.

The key question:

> Is Lucy truly committed enough to make a credible PLME case, or would Brown mainly be an elite/flexible undergrad option?

## Current app role

Very likely v1 inclusion.

Best category:

> Elite direct-med / PLME / open curriculum.

---

# 6. Cornell University

## College Scorecard / ROI values

College Scorecard shows Cornell with:

* Average annual cost: $28,690
* Median earnings: $113,372

CampusROI comparison data list Cornell with:

* Average net price: $28,690
* Four-year net cost: $114,760
* Median earnings 6 years after enrollment: $76,300
* Median earnings 10 years after enrollment: $104,043
* Graduation rate: 95.4%
* Median debt: $14,000
* Payback period: 3.7 years

Money also reports Cornell graduation rate of 95%, average time to degree of 4.1 years, and median student debt of $14,000.

## Preliminary ROI interpretation

Cornell has a strong ROI signal and broad academic option value, but it is less clearly a medical-center adjacency play than Penn, Hopkins, Columbia, Yale, Duke, Stanford, or UChicago.

Its strengths:

* Ivy brand
* Large research university
* Strong life sciences/STEM
* Broad undergraduate colleges
* Strong option value if Lucy pivots

The tradeoff:

* Ithaca setting
* College-specific structure/costs
* Large, rigorous environment
* Less immediate urban clinical access than some elite peers

## Parent ROI note

Cornell should be framed as:

> Large Ivy research option with strong broad value, but not the cleanest urban medical-ecosystem play.

The key question:

> Would Lucy like a large, rigorous, rural/college-town Ivy enough to justify the cost and intensity?

## Current app role

Possible v1 inclusion.

Best category:

> Large Ivy research / broad STEM-life-sciences option value.

---

# 7. Columbia University

## College Scorecard / ROI values

College Scorecard shows Columbia with:

* Average annual cost: $21,590
* Median earnings: $115,519

A separate Scorecard/field-oriented result shows median total debt of $19,594, but this appears to be field-of-study context and should not be treated as the canonical whole-school debt without direct API verification.

CollegeFactual reports Columbia median graduate debt around $18,750 from federal data; use as secondary until direct Scorecard verification.

## Preliminary ROI interpretation

Columbia has a strong ROI signal and a powerful urban medical/research ecosystem, but it also has fit/intensity issues that need explicit treatment.

Strengths:

* Ivy brand
* NYC location
* Medical/research ecosystem
* Broad professional option value
* Strong earnings signal

Tradeoffs:

* Core Curriculum
* Urban intensity
* High cost if aid is limited
* Potential stress/GPA considerations
* Need to distinguish anecdotal premed culture from official facts

## Parent ROI note

Columbia should be framed as:

> Ivy urban medical/research ecosystem with Core Curriculum and NYC intensity.

The key question:

> Would Lucy thrive in NYC and Columbia’s Core environment, or would that add avoidable stress to a premed path?

## Current app role

Likely v1 inclusion if we want an NYC elite medical-ecosystem example.

Best category:

> Ivy NYC clinical/research ecosystem / Core Curriculum / urban intensity.

---

# 8. Harvard University

## College Scorecard / ROI values

College Scorecard shows Harvard with:

* Graduation rate: 98%
* Average annual cost: $19,066
* Median earnings: $134,794

CampusROI lists Harvard with:

* Average net price: $19,066
* Four-year net cost: $76,264
* Median earnings 10 years after enrollment: $101,817
* Median earnings 6 years after enrollment: $91,300
* Median debt at graduation: $14,000
* Six-year graduation rate: 97.6%

## Preliminary ROI interpretation

Harvard has one of the strongest broad prestige/option-value signals in the universe.

Its strategic strengths:

* Maximum general brand
* Research ecosystem
* Boston/Cambridge biomedical context
* Huge alumni and graduate/professional option value
* Strong need-based aid
* Strong broad earnings signal

But for Lucy’s tool, Harvard should not be framed as “the best premed school.” It should be framed as the maximum prestige/option-value case.

## Parent ROI note

Harvard should be framed as:

> Maximum broad prestige and option value, with strong aid and strong outcomes, but not necessary for med school.

The key question:

> If Lucy were admitted and aid were favorable, would Harvard help her thrive — or simply add pressure?

## Current app role

Very likely v1 inclusion.

Best category:

> Maximum general prestige / research ecosystem / broad option value.

---

# 9. Yale University

## College Scorecard / ROI values

College Scorecard shows Yale with:

* Graduation rate: 98%
* Median earnings: $142,936
* Median total debt: $12,562

CampusROI lists Yale with:

* Average net price: $23,777
* Four-year net cost: $95,108
* Median earnings 10 years after enrollment: $100,533
* Median earnings 6 years after enrollment: $67,800
* Median debt at graduation: $12,975
* Six-year graduation rate: 95.7%

Yale’s own facts page says 54% of students receive financial aid, the average scholarship award is $75,800, 87% graduate debt-free, and median net cost for students awarded Title IV aid is $11K.

## Preliminary ROI interpretation

Yale has a strong elite ROI profile, especially when aid applies.

Its strategic strengths:

* Ultra-elite brand
* Strong liberal arts/research identity
* Yale-New Haven medical ecosystem
* Strong aid profile
* Very low debt signal
* Broad option value

The tradeoff:

* Ultra-selective
* New Haven/location fit
* High sticker price
* Need-based aid dependence
* Not a merit-aid strategy

## Parent ROI note

Yale should be framed as:

> Ultra-elite liberal arts/research school with strong medical ecosystem and strong aid profile.

The key question:

> Would Lucy like Yale’s academic culture and New Haven environment enough to justify the elite-reach effort?

## Current app role

Likely v1 inclusion.

Best category:

> Elite liberal arts/research / Yale-New Haven medical ecosystem / strong aid.

---

# 10. Stanford University

## College Scorecard / ROI values

College Scorecard search results show Stanford with:

* Graduation rate: 97%
* Average annual cost: $13,807

A College Scorecard search display also showed Stanford median earnings around $137K, but the exact field should be verified in the direct API/download before final JSON.

CampusROI lists Stanford with:

* Average net price: $13,807
* Four-year net cost: $55,228
* Median earnings 10 years after enrollment: $124,080
* Median earnings 6 years after enrollment: $92,800
* Median debt at graduation: $12,000
* Six-year graduation rate: 91.9%

Note: the graduation-rate discrepancy between Scorecard search display and CampusROI mirror should be resolved through direct Scorecard API/download before JSON conversion.

## Preliminary ROI interpretation

Stanford has one of the strongest combined elite + ROI + future-option profiles.

Its strategic strengths:

* Ultra-elite brand
* Stanford Medicine
* Tech/AI/biotech/startup ecosystem
* Strong earnings signal
* Low average net price for aid recipients
* High health-tech option value

The tradeoff:

* Ultra-selective
* Far from NJ
* High sticker cost if aid is limited
* Cultural fit: tech/startup/innovation-heavy
* Not a classic East Coast premed environment

## Parent ROI note

Stanford should be framed as:

> Elite medicine + tech + biomed innovation reach.

The key question:

> Is Lucy interested in medicine only, or might she be excited by medicine plus technology, AI, biotech, devices, or startups?

## Current app role

Very likely v1 inclusion.

Best category:

> Elite medicine/tech/biomed/AI ecosystem.

---

# 11. Massachusetts Institute of Technology

## College Scorecard / ROI values

College Scorecard shows MIT with:

* Average annual cost: $20,111
* Median earnings: $161,961

CampusROI lists MIT with:

* Average net price: $20,111
* Four-year net cost: $80,444
* Median earnings 10 years after enrollment: $143,372
* Median earnings 6 years after enrollment: $99,600
* Median debt at graduation: $14,768
* Six-year graduation rate: 96.4%
* Estimated payback period: 2 years

Business Insider recently ranked MIT first in a list of high-earning graduates using Department of Education College Scorecard data, with MIT median graduate earnings around $162,000.

## Preliminary ROI interpretation

MIT has the strongest broad earnings signal in this elite batch.

But for Lucy, MIT should not be framed as “premed prestige.” It should be framed as:

* Extreme STEM/engineering/math/CS intensity
* Medicine + technology option value
* Biomedical engineering / AI / biotech / devices / computational biology
* Extraordinary fallback value if she pivots from clinical medicine
* Potential GPA/stress risk for classic premed

## Parent ROI note

MIT should be framed as:

> Ultra-elite STEM/health-tech path with exceptional earnings signal and real GPA/intensity caution.

The key question:

> Does Lucy actually love STEM/tech intensity, or would MIT make premed harder than necessary?

## Current app role

Likely v1 inclusion.

Best category:

> Elite STEM / health-tech / engineering / high-intensity prehealth.

---

# 12. University of Chicago

## College Scorecard / ROI values

College Scorecard shows UChicago with:

* Average annual cost: $14,860
* Median earnings: $127,757

CampusROI lists UChicago with:

* Average net price: $14,860
* Four-year net cost: $59,440
* Median earnings 10 years after enrollment: $91,885
* Payback period: about 3.5 years

## Preliminary ROI interpretation

UChicago has a very strong net-price/earnings signal, but its app role is about fit and intensity as much as ROI.

Its strategic strengths:

* Elite academic/research brand
* UChicago Medicine / Pritzker ecosystem
* Strong intellectual culture
* Strong broad option value
* Strong aid-adjusted ROI signal

The tradeoff:

* Core Curriculum
* Quarter system
* Academic intensity
* Potential GPA/stress concern for premed
* Not necessarily the lowest-risk premed environment

## Parent ROI note

UChicago should be framed as:

> Elite intellectual/research school with strong ROI signal and possible GPA/stress/Core tradeoffs.

The key question:

> Would Lucy enjoy UChicago’s intense academic culture and Core requirements, or would that create unnecessary premed friction?

## Current app role

Possible v1 inclusion.

Best category:

> Elite intellectual/Core/rigo(u)r path / UChicago Medicine ecosystem.

---

# Preliminary rankings by lens

## Best broad ROI signal from this batch

This is not a “best for Lucy” ranking. It is a rough interpretation of cost, earnings, debt, and graduation signals.

1. MIT
2. Stanford
3. Princeton
4. Harvard
5. UChicago
6. Yale
7. Penn
8. Duke
9. Columbia
10. Cornell
11. Brown
12. Johns Hopkins

Important caveats:

* Hopkins may look lower on pure ROI because of the available source fields, not because it lacks elite value.
* Stanford’s graduation-rate discrepancy must be resolved.
* Elite school net prices are highly family-specific.
* For a high-income family, average net price may understate likely cost.

## Best premed / healthcare ecosystem signal

This is qualitative and based on strategic healthcare relevance, not a sourced numerical ranking.

1. Johns Hopkins
2. Penn
3. Stanford
4. Duke
5. Yale
6. Columbia
7. UChicago
8. Harvard
9. Brown
10. Cornell
11. Princeton
12. MIT

Important caveats:

* MIT is extremely strong for health-tech, biomedical engineering, AI, biotech, and research, but less “classic premed.”
* Brown should rank much higher if PLME is the scenario.
* Princeton is elite and local-ish, but has less medical-school adjacency.
* Harvard may have extraordinary research/option value even if the premed pathway is more self-directed.

## Best direct-med / early-assurance relevance

1. Brown PLME
2. Hopkins, Penn, Duke, Stanford, Yale, etc. are not direct-med in the same sense.
3. Other direct-med programs should be handled in the separate BS/MD batch.

Brown regular undergrad and Brown PLME must be separate app records or at least separate strategy cards.

---

# What this batch teaches

## 1. Elite-school economics can look surprisingly strong

Some elite schools show low average annual costs because their need-based aid is very generous. Princeton, Stanford, Harvard, Yale, and UChicago all show strong average-net-price signals.

But this is dangerous for Jeff’s use case unless we model family-specific net price.

The app should display:

```text
Average net price is not your likely price.
Run the net price calculator.
Elite schools are usually need-aid strategies, not merit-aid strategies.
```

## 2. Elite prestige matters more for option value than for premed alone

Elite undergrad may be most defensible if Lucy is uncertain and might pivot into:

* Research
* Biotech
* Health AI
* Public policy
* Law
* Business
* Consulting
* Finance
* Tech
* Academia
* Global health
* Healthcare entrepreneurship

For pure premed, elite prestige helps only if Lucy also thrives academically and personally.

## 3. Medical ecosystem and prestige are different

Examples:

* Princeton: ultra-elite general prestige, less medical-school adjacency
* Penn: elite plus major urban medical ecosystem
* Hopkins: elite biomedical/research premed brand
* Stanford: elite plus medicine/tech/biotech ecosystem
* MIT: elite STEM/health-tech, not classic premed
* Brown: elite plus PLME direct-med option
* Columbia: elite NYC ecosystem plus Core/urban intensity
* UChicago: elite intellectual/Core plus medical ecosystem

## 4. Salary outcomes can distort premed interpretation

MIT, Stanford, Harvard, Penn, Columbia, and UChicago may show strong earnings partly because of tech, finance, consulting, business, economics, computer science, and engineering pathways.

That is useful for fallback value, but it is not a direct measure of medical-school success.

## 5. Elite schools should be represented by subtype, not all included

The v1 app should probably include only enough elite schools to teach categories.

Recommended elite v1 set:

* Princeton: NJ-adjacent elite general prestige
* Penn: Ivy + medical ecosystem
* Johns Hopkins: elite biomedical/pre-med brand
* Brown: PLME/direct-med
* Stanford: medicine + tech/biomed/AI
* MIT: STEM/health-tech high-intensity
* Harvard or Yale: maximum broad prestige/research/aid
* Columbia or UChicago: urban/Core/intensity model

That is probably enough. We do not need all 12 in v1.

---

# Data-quality flags before JSON conversion

Before converting these into `data/schools_undergrad.json`, verify:

1. Pull exact direct College Scorecard API/download values for:

   * average annual cost
   * graduation rate
   * median earnings
   * median debt
   * acceptance rate

2. Store multiple earnings fields:

   * Scorecard displayed median earnings
   * 10-year post-entry earnings
   * 6-year post-entry earnings
   * field-of-study earnings where relevant

3. Add family-specific affordability fields:

   * official cost of attendance
   * need-only vs. merit aid
   * likely full-pay warning
   * net price calculator required

4. Separate school-level ROI from path-level ROI:

   * MIT salary data may reflect tech/STEM outcomes.
   * Penn salary data may reflect Wharton/business/finance.
   * Hopkins premed value may not be fully reflected in generic earnings.
   * Brown PLME value is mainly uncertainty reduction, not just earnings.

5. Separate regular undergrad and special pathways:

   * Brown regular undergrad
   * Brown PLME
   * Any other elite early-assurance programs, if applicable

Recommended future JSON fields:

```json
{
  "scorecard_unit_id": null,
  "scorecard_avg_annual_cost": null,
  "scorecard_graduation_rate": null,
  "scorecard_acceptance_rate": null,
  "scorecard_median_earnings_display": null,
  "scorecard_median_earnings_10yr": null,
  "scorecard_median_earnings_6yr": null,
  "scorecard_median_debt": null,
  "official_cost_of_attendance": null,
  "need_aid_policy": "",
  "merit_aid_policy": "",
  "family_cost_flag": "need_aid_only | likely_full_pay | net_price_calculator_required",
  "elite_subtype": "general_prestige | biomedical_research | med_ecosystem | direct_med | health_tech | core_rigor",
  "premed_ecosystem_score": null,
  "broad_option_value_score": null,
  "gpa_risk_notes": "",
  "source_confidence": "high | medium | low",
  "sources": []
}
```

---

# Research log entry

Add this to `research/research_log.md`:

```text
Date: 2026-07-09
Research topic: College Scorecard / ROI metrics for elite and reach schools
Question: How do elite/reach schools compare on broad ROI, earnings, debt, graduation, and premed-strategy usefulness?
Sources checked:
- College Scorecard pages and search snippets for Princeton, Penn, Johns Hopkins, Duke, Brown, Cornell, Columbia, Harvard, Yale, Stanford, MIT, and UChicago
- College Scorecard data glossary and data download page
- CampusROI College Scorecard-derived profiles where direct Scorecard snippets did not expose all fields
- Money / BigFuture / CollegeFactual secondary profiles where useful for graduation or debt triangulation
- School-reported Johns Hopkins fast-facts page
Findings:
- Elite schools should not be modeled as one category. They differ by subtype: general prestige, biomedical/research, medical-center ecosystem, direct-med, STEM/health-tech, and Core/rigo(u)r.
- Princeton, Stanford, Harvard, Yale, and UChicago show very strong average-net-price signals, but this may not reflect Jeff’s family-specific cost.
- MIT has the strongest broad earnings signal, but it is better framed as a STEM/health-tech path than a classic premed path.
- Penn, Hopkins, Stanford, Duke, Yale, Columbia, and UChicago are strongest for elite medical/research ecosystem logic.
- Brown is especially important because PLME is a separate direct-med strategy.
- Princeton is a strong NJ-adjacent elite general prestige case, but it lacks med-school adjacency.
Data added:
- Average annual cost / net price
- Graduation rate where available
- Median earnings
- Median debt where available
- Parent ROI notes
- Strategic subtype labels
Confidence:
- High for direct College Scorecard displayed values.
- Medium for CampusROI values that state they use College Scorecard data.
- Medium for secondary Money/BigFuture/CollegeFactual values.
Open questions:
- Pull exact direct College Scorecard API/download fields before JSON conversion.
- Standardize default earnings field.
- Add family-specific net price assumptions.
- Decide which elite examples make v1.
- Separate Brown PLME from Brown regular premed.
Next recommended step:
- Research BS/MD and early-assurance programs as a separate pathway batch, because those are program records, not just school records.
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

## Strong v1 candidates from elite / reach batch

* Princeton
* Penn
* Johns Hopkins
* Brown
* Stanford
* MIT
* Harvard or Yale
* Columbia or UChicago

## Possible v1 candidates

* Duke
* Yale
* Columbia
* UChicago
* Cornell
* Rutgers Newark
* Seton Hall
* University of Delaware
* Binghamton
* Penn State
* Lehigh
* Villanova
* Lafayette

## Current working interpretation

The v1 school explorer should not include all researched schools. It should include representative examples across strategic categories:

* NJ public value
* Smaller public value
* STEM/ROI fallback
* Urban clinical ecosystem
* Out-of-state public comparison
* Private co-op / pre-health
* Private research / medical-center
* Private regional brand / fit
* Liberal arts pre-health
* Elite general prestige
* Elite biomedical/research
* Elite medical ecosystem
* Elite health-tech/STEM
* Direct-med / BS-MD / early assurance
