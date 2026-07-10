// Tailwind class pairs (bg/text) per school_bucket, ported from the
// prototype's BUCKET_CHIP_CLASS map (src/styles.css in the old prototype).
export const BUCKET_CHIP_CLASSES: Record<string, string> = {
  'NJ public value': 'bg-blue-100 text-blue-800',
  'NJ private': 'bg-indigo-100 text-indigo-800',
  'STEM/ROI fallback': 'bg-teal-100 text-teal-800',
  'urban clinical ecosystem': 'bg-amber-100 text-amber-800',
  'regional public': 'bg-slate-100 text-slate-800',
  'private co-op/career': 'bg-orange-100 text-orange-800',
  'elite general prestige': 'bg-purple-100 text-purple-800',
  'elite medical ecosystem': 'bg-rose-100 text-rose-800',
  'elite biomedical/research': 'bg-pink-100 text-pink-800',
  'elite health-tech/STEM': 'bg-cyan-100 text-cyan-800',
};

export const DEFAULT_CHIP_CLASS = 'bg-gray-100 text-gray-800';

export function bucketChipClass(bucket: string): string {
  return BUCKET_CHIP_CLASSES[bucket] ?? DEFAULT_CHIP_CLASS;
}
