> **Note (2026-07-09):** This file covers the *research & data-gathering* process
> (building the school universe and career-path baseline). The overall **product
> strategy** now lives in `docs/vision.md`, `docs/product_backlog.md`,
> `docs/architecture.md`, and `docs/release_plan.md`. This research roadmap
> remains valid and feeds Epics E and F.

## Revised Step 3 and Step 4: School Universe + Career Path Baseline

### Why this revision exists

The original plan said to “decide the v1 school list” before doing much school research. That risks choosing schools based on assumptions, vibes, prestige shorthand, or incomplete knowledge.

The better approach is:

> Build a broad candidate school universe first, do a fast structured data sweep, then choose the v1 representative school list from the evidence.

The goal is not to find the “best” 25 schools in America. The goal is to create a curated, representative set that helps Lucy and her parents understand the tradeoffs among cost, prestige, premed practicality, clinical access, GPA risk, merit aid, specialty pathways, and flexibility if she pivots away from medicine.

---

# Step 3: Build Candidate School Universe and Perform Fast Data Sweep

## Step 3A: Create candidate school universe

Create a broad candidate list of approximately 50–70 schools.

This is not the final app list. This is the research pool.

Schools should be grouped into strategy buckets:

1. NJ / local value options
2. Regional public options
3. Regional private options
4. STEM / health-tech / engineering fallback options
5. Private pre-health reputation schools
6. Elite / reach / name-brand schools
7. BS/MD or early-assurance examples
8. Nursing / PA / healthcare-flex options

The purpose of this list is to make sure the final v1 app includes schools that represent different strategic choices.

---

## Step 3B: Fast data sweep

For each candidate school, collect only enough data to evaluate whether it belongs in the v1 representative list.

Do not over-research each school yet.

Minimum data fields:

* School name
* Category / bucket
* Public or private
* Location
* Distance from home
* Sticker cost of attendance
* In-state vs. out-of-state cost, if relevant
* Estimated net price / merit aid notes, if available
* Acceptance rate
* SAT/ACT range, if available
* Graduation rate
* College Scorecard earnings
* College Scorecard median debt
* Pre-health advising page
* Hospital / clinical ecosystem nearby
* Research access
* Medical school affiliation
* BS/MD, early assurance, or linked medical program
* Nursing / PA / health-related alternatives
* Prestige band
* Premed ecosystem notes
* Parent ROI note
* Watch-outs
* Sources
* Confidence level

Recommended source hierarchy:

1. Official school pages for cost, advising, honors, programs, and admissions
2. College Scorecard for standardized cost, debt, graduation, admissions, and earnings data
3. Common Data Set / IPEDS where useful
4. Georgetown CEW ROI data where useful
5. Reddit / Student Doctor Network / College Confidential only for qualitative themes, clearly labeled as anecdotal

Important rule:

> Reddit, forums, and “tribal knowledge” may inform reputation notes, but they should not be treated as objective data.

---

## Step 3C: Select v1 representative school list

After the fast data sweep, reduce the candidate universe to approximately 20–30 representative schools.

The final v1 school list should not mean:

> These are the best schools.

It should mean:

> These are the most useful schools for illustrating the major strategic choices Lucy may face.

The v1 list should include representatives from:

* Local NJ value
* Smaller public value
* Public flagship
* Public honors/value
* STEM/health-tech fallback
* Urban clinical ecosystem
* Private pre-health brand
* Elite biomedical reach
* Elite general prestige reach
* BS/MD direct-path examples
* Nursing / PA / healthcare-flex options

Selection criteria:

* Does this school teach an important strategic lesson?
* Does it represent a realistic or useful category?
* Does it help distinguish undergrad strategy from med/professional school strategy?
* Does it help compare value vs. prestige vs. fit vs. clinical access?
* Is there enough public data to support a responsible school card?
* Would this school actually be worth discussing for Lucy?

---

# Step 4: Build Career Path Baseline in Parallel

Step 4 should run in parallel with Step 3 because the right undergraduate school strategy depends on the career path.

For example:

* MD/DO path emphasizes GPA, MCAT, clinical exposure, research, cost control, and med-school application strength.
* PA path emphasizes prerequisites, patient-care hours, clinical exposure, and graduate PA admissions.
* Nursing/NP/CRNA path may require direct-entry nursing program decisions much earlier.
* Dentistry has different school requirements, costs, and admissions tests.
* Psychology/psychiatry require completely different timelines.
* Health tech / biotech / biomedical engineering may make STEM-heavy schools more attractive.
* Public health or healthcare administration may make policy, business, data, or social science programs more relevant.

## Step 4A: Create first version of career path data

Create baseline records for:

* MD/DO physician
* PA
* RN
* NP
* CRNA
* Dentist
* Psychologist
* Psychiatrist
* Physical therapist
* Pharmacist
* Public health
* Biomedical research
* Biotech / pharma
* Health tech / data / AI
* Healthcare administration

For each path, collect:

* What the role does
* Typical education required
* Training timeline
* Approximate age when full earnings begin
* Admissions difficulty
* Patient-care intensity
* Debt risk
* Salary range
* Job growth
* Lifestyle considerations
* Best fit for
* Watch-outs
* High-school actions
* College actions
* Decision gates
* Source confidence

## Step 4B: Add salary and timeline data later

Do not build the financial simulator yet, but preserve the fields needed for it.

Future model should include:

* Years of education
* Years of training
* Salary during training
* Full professional salary
* Graduate/professional school debt
* Time to full earnings
* Cumulative earnings by age
* Break-even age versus earlier-earning paths
* Debt-adjusted ROI
* Lifestyle / hours / call burden
* Probability of completing the path

Important rule:

> Salary matters, but salary alone should not decide the path. The model should show income, delayed earnings, debt, risk, lifestyle, and probability of reaching the endpoint.

---

# Revised near-term sequence

## 1. Create candidate school universe

Create `research/candidate_school_universe.md`.

Include 50–70 schools grouped by category.

## 2. Create career path baseline

Create or update `data/paths.json`.

Start with plain-English baseline data before worrying about perfect scoring.

## 3. Perform school fast data sweep

Create one row or entry per school with the minimum data fields.

## 4. Reduce to v1 school list

Choose 20–30 schools for the app based on data coverage and strategic usefulness.

## 5. Build v1 static app

Start with cards, filters, and strategy explanations.

Do not build the salary simulator first.

---

# Definition of done for Step 3

Step 3 is done when:

1. Candidate school universe exists.
2. Each school has a category.
3. Each school has basic cost/admissions/outcome/pre-health data or a note saying data still needs to be gathered.
4. Each school has a preliminary reason for inclusion.
5. Candidate schools can be narrowed to a v1 app list of 20–30 representative schools.

---

# Definition of done for Step 4

Step 4 is done when:

1. Major healthcare career paths are listed.
2. Each path has training timeline, salary source placeholder, debt risk, admissions difficulty, and decision gates.
3. The data clearly distinguishes physician, PA, nursing, dentistry, psychology, public health, research, and health tech paths.
4. The app can recommend different school strategies depending on which path Lucy is exploring.
