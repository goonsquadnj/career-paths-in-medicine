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
