// Semantic "value tier" system for school_bucket — replaces the old
// per-bucket rainbow (10 near-distinct pastel chips that all read as the
// same shape/saturation) with 3 meaningful tiers, per the QA design
// critique (docs/qa_findings_2026-07-10.md finding 4). The bucket's own
// taxonomy label is still shown as plain text; the tier only drives a
// small color-coded dot so cost/prestige positioning reads at a glance
// without competing with the v1_status and direct-med indicators.
export type BucketTier = 'value' | 'mid' | 'elite';

const BUCKET_TIER: Record<string, BucketTier> = {
  'NJ public value': 'value',
  'regional public': 'value',
  'STEM/ROI fallback': 'value',
  'NJ private': 'mid',
  'urban clinical ecosystem': 'mid',
  'private co-op/career': 'mid',
  'elite general prestige': 'elite',
  'elite medical ecosystem': 'elite',
  'elite biomedical/research': 'elite',
  'elite health-tech/STEM': 'elite',
};

export function bucketTier(bucket: string): BucketTier {
  return BUCKET_TIER[bucket] ?? 'mid';
}

export const TIER_DOT_CLASSES: Record<BucketTier, string> = {
  value: 'bg-brand-500',
  mid: 'bg-slate-400',
  elite: 'bg-amber-500',
};

export const TIER_LABELS: Record<BucketTier, string> = {
  value: 'Value tier',
  mid: 'Mid tier',
  elite: 'Elite/reach tier',
};
