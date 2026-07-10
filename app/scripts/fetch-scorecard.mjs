// Fetches fresh College Scorecard data for every school in
// ../../data/schools_undergrad.json (matched by scorecard_unit_id) and merges
// verified values back into that file.
//
// Usage:
//   node scripts/fetch-scorecard.mjs
//
// Requires scripts/.env with SCORECARD_API_KEY=... (gitignored — never commit it).
//
// Re-run this any time we want to refresh Scorecard numbers (e.g. new award year,
// new schools added to schools_undergrad.json).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env');
const dataPath = join(__dirname, '..', '..', 'data', 'schools_undergrad.json');

function loadEnv(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing env file: ${path}`);
  }
  const env = {};
  const raw = readFileSync(path, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    env[key] = value;
  }
  return env;
}

const env = loadEnv(envPath);
const API_KEY = env.SCORECARD_API_KEY;
if (!API_KEY) {
  throw new Error('SCORECARD_API_KEY not found in scripts/.env');
}

const FIELDS = [
  'id',
  'school.name',
  'latest.cost.attendance.academic_year',
  'latest.cost.avg_net_price.overall',
  'latest.completion.completion_rate_4yr_150nt',
  'latest.admissions.admission_rate.overall',
  'latest.admissions.sat_scores.average.overall',
  'latest.earnings.10_yrs_after_entry.median',
  'latest.earnings.6_yrs_after_entry.median',
  'latest.aid.median_debt.completers.overall',
].join(',');

const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools.json';

async function fetchSchoolById(unitId) {
  const url = `${BASE_URL}?api_key=${API_KEY}&id=${unitId}&fields=${FIELDS}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Scorecard fetch failed for id=${unitId}: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json?.results?.[0] ?? null;
}

function num(val) {
  return typeof val === 'number' && Number.isFinite(val) ? val : null;
}

async function main() {
  const schools = JSON.parse(readFileSync(dataPath, 'utf8'));

  let updated = 0;
  let skipped = 0;

  for (const school of schools) {
    const unitId = school.scorecard_unit_id;
    if (!unitId) {
      console.warn(`[fetch-scorecard] SKIP ${school.id}: no scorecard_unit_id`);
      skipped++;
      continue;
    }

    let result;
    try {
      result = await fetchSchoolById(unitId);
    } catch (err) {
      console.error(`[fetch-scorecard] ERROR ${school.id} (${unitId}): ${err.message}`);
      skipped++;
      continue;
    }

    if (!result) {
      console.warn(`[fetch-scorecard] NO RESULT ${school.id} (${unitId})`);
      skipped++;
      continue;
    }

    const avgNetPrice = num(result['latest.cost.avg_net_price.overall']);
    const attendanceCost = num(result['latest.cost.attendance.academic_year']);
    const gradRate = num(result['latest.completion.completion_rate_4yr_150nt']);
    const acceptanceRate = num(result['latest.admissions.admission_rate.overall']);
    const satAvg = num(result['latest.admissions.sat_scores.average.overall']);
    const earnings10yr = num(result['latest.earnings.10_yrs_after_entry.median']);
    const earnings6yr = num(result['latest.earnings.6_yrs_after_entry.median']);
    const medianDebt = num(result['latest.aid.median_debt.completers.overall']);

    // Prefer avg net price (more representative "typical cost"); fall back to
    // sticker attendance cost if net price isn't available. Both come from the
    // same fresh API response, so this is not a stale-data fallback.
    const newAnnualCost = avgNetPrice ?? attendanceCost;

    // Honesty rule: every field below reflects ONLY what the API returned just
    // now. If the API has no value for a field, the field becomes null — we
    // never silently keep a prior hand-authored/estimated guess and relabel it
    // "verified". A per-field note (scorecard_notes) records anything that
    // came back null so a human can go verify it directly.
    school.scorecard_avg_annual_cost = newAnnualCost;
    school.scorecard_graduation_rate = gradRate;
    school.scorecard_acceptance_rate = acceptanceRate;
    school.scorecard_median_earnings_10yr = earnings10yr;
    school.scorecard_median_earnings_6yr = earnings6yr;
    school.scorecard_median_debt = medianDebt;
    school.scorecard_sat_average = satAvg;

    const fetchedFields = {
      scorecard_avg_annual_cost: newAnnualCost,
      scorecard_graduation_rate: gradRate,
      scorecard_acceptance_rate: acceptanceRate,
      scorecard_median_earnings_10yr: earnings10yr,
      scorecard_median_earnings_6yr: earnings6yr,
      scorecard_median_debt: medianDebt,
      scorecard_sat_average: satAvg,
    };
    const missingFields = Object.entries(fetchedFields)
      .filter(([, value]) => value === null)
      .map(([key]) => key);

    if (missingFields.length === 0) {
      school.source_confidence = 'high';
      school.data_status = 'verified_scorecard_api_2026_07';
    } else {
      // Some fields genuinely came back null from the API — don't launder
      // this record as fully "verified". Downgrade confidence and record
      // exactly which fields are missing so a human knows what to check.
      school.source_confidence = 'medium';
      school.data_status = 'partially_verified_scorecard_api_2026_07';
      const missingNote = `Scorecard API returned no value for: ${missingFields.join(', ')} (fetched ${new Date().toISOString().slice(0, 10)}). Do not assume these match any other institution's figures — verify directly.`;
      school.scorecard_notes = school.scorecard_notes
        ? `${school.scorecard_notes} ${missingNote}`
        : missingNote;
    }

    console.log(
      `[fetch-scorecard] OK ${school.id} (${unitId}): cost=${newAnnualCost} grad=${gradRate} admit=${acceptanceRate} sat=${satAvg} e10=${earnings10yr} e6=${earnings6yr} debt=${medianDebt}${missingFields.length ? ` MISSING=[${missingFields.join(',')}]` : ''}`,
    );
    updated++;
  }

  writeFileSync(dataPath, JSON.stringify(schools, null, 2) + '\n', 'utf8');
  console.log(`[fetch-scorecard] Done. Updated ${updated}, skipped ${skipped}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
