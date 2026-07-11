# Medical Pathway Certainty Model

Project: Healthcare Pathway Planner
Status: Draft explanation for app + scoring model

## Purpose

Not all “direct med” or “early assurance” programs provide the same level of certainty.

Some programs offer a conditional medical-school seat.
Some offer provisional acceptance.
Some offer only a guaranteed interview.
Some require a high MCAT score.
Some are not available until after the student starts college.

The app should make this clear so families do not accidentally treat very different programs as equivalent.

Core principle:

> A medical pathway program should be judged by how much uncertainty it actually removes.

---

# Certainty levels

## Level 1 — Direct medical pathway

These are the strongest-certainty programs.

The student is admitted into a structured undergraduate-to-medical-school path, usually as a high-school senior. If she successfully completes the program requirements, she proceeds to the affiliated medical school.

Examples from our data:

* Brown PLME
* Rochester REMS
* Sophie Davis / CUNY School of Medicine

App label:

```text
Direct medical pathway
```

Plain-English explanation:

> This is the closest thing to a true direct-med path, but the student still has to satisfy program requirements.

---

## Level 2 — Conditional medical-school seat

These programs appear to offer a conditional seat or conditional path to the affiliated medical school, but the student must meet specific continuation requirements.

Examples from our data:

* TCNJ / Rutgers NJMS
* NJIT / Rutgers NJMS
* Rutgers-Newark / Rutgers NJMS
* Rowan 3+4 MD/DO
* Stevens / Rutgers NJMS

App label:

```text
Conditional medical-school seat
```

Plain-English explanation:

> This can meaningfully reduce uncertainty, but the seat depends on meeting GPA, course, interview, MCAT, or other continuation rules.

---

## Level 3 — Guaranteed admission with high continuation requirements

These programs may use “guaranteed admission” language but still require very high performance, such as a high MCAT score and strong college GPA.

Example from our data:

* Pitt Medicine GAP

App label:

```text
Guaranteed admission with high performance requirements
```

Plain-English explanation:

> This reduces some uncertainty, but the student still has to clear a high academic bar. It is not a free pass.

---

## Level 4 — Provisional acceptance / early assurance

These programs provide early structure or provisional acceptance, but may not guarantee the final medical-school seat.

Examples from our data:

* Drexel BA/BS+MD Early Assurance
* Temple Pre-Med Health Scholars

App label:

```text
Early assurance / provisional path
```

Plain-English explanation:

> This can be valuable, but the student still needs to satisfy program requirements. Some programs begin only after the student has already started college.

---

## Level 5 — Guaranteed interview only

These programs guarantee an interview with the medical school if requirements are met, but they do not guarantee admission.

Example from our data:

* Seton Hall / Hackensack Meridian Joint Bachelor’s/M.D.

App label:

```text
Guaranteed interview only
```

Plain-English explanation:

> This is an advantage, but it is not a medical-school seat.

---

## Level 6 — Regular premed with advising

This is the normal path: the student completes undergrad, takes prerequisites, earns clinical/research/service experience, takes the MCAT, and applies broadly to medical school.

Examples:

* Rutgers New Brunswick regular premed
* TCNJ regular premed
* Pitt regular premed
* Case Western regular premed
* Princeton regular premed
* Hopkins regular premed

App label:

```text
Regular premed path
```

Plain-English explanation:

> This gives the most flexibility but the least admissions certainty.

---

# MCAT categories

The app should separately label MCAT requirements.

## No MCAT required

The program does not require the MCAT for continuation.

App label:

```text
No MCAT required
```

Data status:

```text
Verify annually
```

---

## MCAT required, no minimum score

The student must take the MCAT, but the program does not specify a minimum score.

App label:

```text
MCAT required, no minimum listed
```

Why it matters:

> This is less stressful than a high minimum MCAT, but the student still has to take the exam.

---

## MCAT required, minimum score specified

The student must take the MCAT and hit a minimum score.

App label:

```text
MCAT required, minimum score
```

Why it matters:

> A high MCAT minimum can make a “guaranteed” program feel much closer to regular premed pressure.

---

## MCAT policy unclear

The current policy is not confirmed.

App label:

```text
MCAT policy needs verification
```

Why it matters:

> Do not rely on a program’s uncertainty-reduction value until the MCAT rule is confirmed.

---

# Program scoring model

Direct-med and early-assurance programs should not use the same scoring model as ordinary undergraduate schools.

## Recommended scoring weights

| Factor                       | Weight | Explanation                                                                   |
| ---------------------------- | -----: | ----------------------------------------------------------------------------- |
| Medical-school certainty     |    25% | How much admission uncertainty does the program remove?                       |
| Continuation requirements    |    20% | Are GPA, MCAT, course, and interview requirements reasonable?                 |
| Cost / time savings          |    15% | Does the program save money, save a year, or reduce future application costs? |
| Undergraduate fit            |    15% | Would Lucy actually like the undergraduate school?                            |
| Flexibility                  |    10% | Can she pivot if she changes her mind?                                        |
| Medical-school quality / fit |    10% | Is the affiliated medical school a good fit?                                  |
| Prestige / signaling         |     5% | Does the program provide brand value?                                         |

Total:

```text
100%
```

---

# Recommended app warnings

## Warning 1 — Do not chase the shortcut

Use this warning near direct-med program cards:

```text
A direct-med program can reduce uncertainty, but it should not be chosen only because it sounds like a shortcut. Lucy still needs to like the undergraduate school, the medical school, the timeline, and the requirements.
```

## Warning 2 — Guaranteed interview is not guaranteed admission

Use this warning for programs like Seton Hall / Hackensack Meridian:

```text
This program guarantees an interview if requirements are met. It does not guarantee admission to medical school.
```

## Warning 3 — High MCAT programs still carry premed pressure

Use this warning for programs with high MCAT continuation requirements:

```text
This program may reduce some uncertainty, but the MCAT requirement means Lucy still has to perform at a high level.
```

## Warning 4 — Direct med reduces flexibility

Use this warning for all direct-med programs:

```text
Direct-med programs can reduce application uncertainty, but they may also reduce flexibility if Lucy later decides she prefers PA, nursing, research, biotech, public health, psychology, health tech, or another path.
```

---

# Recommended app display

Create a section called:

```text
Direct Medicine Programs: How Much Certainty Do They Really Give You?
```

Program cards should show:

```text
Program name
Undergraduate school
Medical school
Total years
Certainty level
MCAT requirement
GPA requirement
Cost category
Flexibility warning
Best for
Watch-outs
```

Suggested sort order:

1. Direct medical pathway
2. Conditional medical-school seat
3. Guaranteed admission with high continuation requirements
4. Early assurance / provisional path
5. Guaranteed interview only
6. Regular premed with advising

---

# JSON fields supported by this model

The current `data/programs_medical_pathways.json` file already includes most of the fields needed:

```json
{
  "certainty_category": "",
  "medical_seat_certainty": "",
  "interview_guarantee": null,
  "admission_guarantee": "",
  "mcat_required": null,
  "mcat_minimum": null,
  "mcat_policy": "",
  "college_gpa_minimum": null,
  "science_gpa_minimum": null,
  "cost_category": "",
  "strategic_value": "",
  "best_for": [],
  "watch_outs": [],
  "app_label": ""
}
```

Future improvement:

```json
{
  "certainty_score": null,
  "requirements_score": null,
  "flexibility_score": null,
  "cost_score": null,
  "fit_score": null,
  "overall_program_score": null
}
```

---

# Parent explanation

Use this short explanation in the app:

```text
Some programs sound like they guarantee medical school, but the details matter. A true direct-med path, a conditional seat, a provisional early-assurance path, and a guaranteed interview are very different. This planner separates those categories so you can see how much uncertainty each program actually removes.
```

---

# Student explanation

Use this short explanation for Lucy:

```text
These programs can be helpful, but they are not magic shortcuts. The best program is not the one that sounds most impressive. It is the one where you would actually be happy, successful, and still have room to grow if your interests change.
```
