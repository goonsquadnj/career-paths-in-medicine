export function fmtCurrency(val: number | null | undefined): string {
  if (val == null) return 'n/a';
  return `$${val.toLocaleString('en-US')}/yr`;
}

export function fmtMoney(val: number | null | undefined): string {
  if (val == null) return 'n/a';
  return `$${val.toLocaleString('en-US')}`;
}

export function fmtPct(val: number | null | undefined): string {
  if (val == null) return 'n/a';
  return `${Math.round(val * 100)}%`;
}

export function humanize(val: string | null | undefined): string {
  if (!val) return 'n/a';
  return val.replace(/_/g, ' ');
}

// Human-readable rendering of raw `data_status` values like
// "verified_scorecard_api_2026_07" or "starter_record_verify_current_cycle".
// Recognizes known patterns; falls back to humanize() for anything else so
// new/unknown status strings still degrade gracefully instead of erroring.
const MONTHS: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
  '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
};

export function fmtDataStatus(val: string | null | undefined): string {
  if (!val) return 'n/a';

  const scorecardMatch = val.match(/^verified_scorecard_api_(\d{4})_(\d{2})$/);
  if (scorecardMatch) {
    const [, year, month] = scorecardMatch;
    const monthLabel = MONTHS[month] ?? month;
    return `Verified via College Scorecard, ${monthLabel} ${year}`;
  }

  if (val === 'stub_needs_url') return 'Stub — source URL not yet verified';
  if (val === 'starter_record_verify_current_cycle') {
    return 'Starter record — needs verification for current cycle';
  }
  if (val === 'starter_record_split_md_do_later') {
    return 'Starter record — MD/DO split not yet separated';
  }

  return humanize(val);
}
