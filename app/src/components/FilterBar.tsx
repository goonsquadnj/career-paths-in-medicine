import { useState } from 'react';
import { statusLabel, costFlagLabel } from '../lib/labels';

interface FilterBarProps {
  buckets: string[];
  statuses: string[];
  costFlags: string[];
  bucket: string;
  status: string;
  costFlag: string;
  directMed: string;
  onChange: (patch: Partial<{ bucket: string; status: string; costFlag: string; directMed: string }>) => void;
  visibleCount: number;
  totalCount: number;
}

const SELECT_CLASS =
  'min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm w-full sm:w-auto';

export function FilterBar({
  buckets,
  statuses,
  costFlags,
  bucket,
  status,
  costFlag,
  directMed,
  onChange,
  visibleCount,
  totalCount,
}: FilterBarProps) {
  // Filters default collapsed on mobile so they don't push the map and cards
  // far down the page before any content is visible (QA finding #4). Always
  // shown on sm+ screens regardless of this state.
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = [bucket, status, costFlag, directMed].filter(Boolean).length;

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="sm:hidden flex w-full min-h-11 items-center justify-between text-sm font-medium text-stone-700"
      >
        <span>
          Filters{activeCount > 0 ? ` (${activeCount} active)` : ''}
        </span>
        <span className="text-stone-400">{mobileOpen ? '−' : '+'}</span>
      </button>

      <div
        className={`${mobileOpen ? 'flex' : 'hidden'} sm:flex flex-wrap items-center gap-3 mt-3 sm:mt-0`}
      >
        <select
          className={SELECT_CLASS}
          value={bucket}
          onChange={(e) => onChange({ bucket: e.target.value })}
        >
          <option value="">All buckets</option>
          {buckets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className={SELECT_CLASS}
          value={status}
          onChange={(e) => onChange({ status: e.target.value })}
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </select>

        <select
          className={SELECT_CLASS}
          value={costFlag}
          onChange={(e) => onChange({ costFlag: e.target.value })}
        >
          <option value="">All cost flags</option>
          {costFlags.map((c) => (
            <option key={c} value={c}>
              {costFlagLabel(c)}
            </option>
          ))}
        </select>

        <select
          className={SELECT_CLASS}
          value={directMed}
          onChange={(e) => onChange({ directMed: e.target.value })}
        >
          <option value="">Direct-med: any</option>
          <option value="yes">Has direct-med program</option>
          <option value="no">No direct-med program</option>
        </select>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => onChange({ bucket: '', status: '', costFlag: '', directMed: '' })}
            className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-600 hover:bg-stone-100"
          >
            Clear filters
          </button>
        )}

        <span className="sm:ml-auto text-sm text-stone-500">
          Showing {visibleCount} of {totalCount} schools
        </span>
      </div>
    </div>
  );
}
