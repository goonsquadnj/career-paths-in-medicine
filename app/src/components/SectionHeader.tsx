// Reusable section/tab header per docs/design_system.md: a serif display
// headline + a one-line plain-English subhead. Every tab opens with this.
export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-display text-2xl font-normal text-stone-900">{title}</h2>
      {subtitle && <p className="text-sm text-stone-500 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
