import { humanize } from './format';

// Human-readable labels for raw data enum values, per docs/ux_redesign_plan.md
// ("Fix capitalization and human-readable labels. Do not show raw-ish labels
// like likely_include..."). Falls back to humanize() (underscore stripping)
// for any value not explicitly mapped, so new enum values degrade gracefully
// instead of erroring.

const STATUS_LABELS: Record<string, string> = {
  likely_include: 'Likely fit',
  possible_include: 'Possible fit',
  research_only: 'Research only',
  exclude_for_now: 'Not included',
};

const COST_FLAG_LABELS: Record<string, string> = {
  NJ_in_state_value: 'NJ in-state value',
  OOS_public_cost_sensitive: 'Out-of-state — cost sensitive',
  private_aid_dependent: 'Private — aid dependent',
  elite_need_aid_only: 'Elite — need-based aid only',
  likely_full_pay_warning: 'Likely full-pay',
  net_price_calculator_required: 'Net price calculator required',
};

export function statusLabel(value: string | null | undefined): string {
  if (!value) return 'n/a';
  return STATUS_LABELS[value] ?? humanize(value);
}

export function costFlagLabel(value: string | null | undefined): string {
  if (!value) return 'n/a';
  return COST_FLAG_LABELS[value] ?? humanize(value);
}
