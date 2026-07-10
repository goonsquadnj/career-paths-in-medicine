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
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <select
        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
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
        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
        value={status}
        onChange={(e) => onChange({ status: e.target.value })}
      >
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.replace(/_/g, ' ')}
          </option>
        ))}
      </select>

      <select
        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
        value={costFlag}
        onChange={(e) => onChange({ costFlag: e.target.value })}
      >
        <option value="">All cost flags</option>
        {costFlags.map((c) => (
          <option key={c} value={c}>
            {c.replace(/_/g, ' ')}
          </option>
        ))}
      </select>

      <select
        className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
        value={directMed}
        onChange={(e) => onChange({ directMed: e.target.value })}
      >
        <option value="">Direct-med: any</option>
        <option value="yes">Has direct-med program</option>
        <option value="no">No direct-med program</option>
      </select>

      <span className="ml-auto text-sm text-gray-500">
        Showing {visibleCount} of {totalCount} schools
      </span>
    </div>
  );
}
