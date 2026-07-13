import { Stethoscope, HeartPulse, Activity, Microscope, Compass } from 'lucide-react';
import type { PathGroup } from '../types/path';

// The Start / Path Finder landing — the app's new default view. A warm,
// human question rather than a filter bar. Each tile routes into Explore
// Careers pre-scoped to a group (routing wired in Phase 2). "Not sure yet"
// is the reassured default: uncertainty is the expected starting state
// (see docs/vision.md, docs/design_system.md).

interface EntryOption {
  icon: typeof Stethoscope;
  title: string;
  subtitle: string;
  // Which career groups this entry routes to. Empty = show everything.
  groups: PathGroup[];
  emphasized?: boolean;
}

const OPTIONS: EntryOption[] = [
  {
    icon: Stethoscope,
    title: 'I think I want to be a doctor',
    subtitle: 'Physician and mental-health tracks, and what the road actually looks like.',
    groups: ['physician', 'mental_health'],
  },
  {
    icon: HeartPulse,
    title: 'Patient care, maybe not med school',
    subtitle: 'Hands-on clinical roles with shorter or different training paths.',
    groups: ['nursing', 'advanced_clinical'],
  },
  {
    icon: Activity,
    title: "I'm interested in nursing",
    subtitle: 'From RN through nurse practitioner and CRNA, and how they connect.',
    groups: ['nursing'],
  },
  {
    icon: Microscope,
    title: 'Health science, research, or public health',
    subtitle: 'Research, public health, biotech, and health tech — no patient care required.',
    groups: ['research_public_health_tech'],
  },
];

const NOT_SURE: EntryOption = {
  icon: Compass,
  title: "I'm not sure yet",
  subtitle:
    'Start with the full map of healthcare careers and narrow down as you go. Most people start here.',
  groups: [],
  emphasized: true,
};

export function StartLanding({ onChoose }: { onChoose: (groups: PathGroup[]) => void }) {
  return (
    <section className="flex flex-col gap-7 py-2">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-brand-700 mb-2">Healthcare Pathway Planner</p>
        <h1 className="font-display text-4xl font-normal leading-tight text-stone-900 mb-3">
          Where do you want to start?
        </h1>
        <p className="text-base leading-relaxed text-stone-600">
          There's no wrong answer, and you can change your mind. Pick whatever's closest to how
          you're thinking right now, and we'll take it from there.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-3xl">
        {OPTIONS.map((opt) => (
          <EntryTile key={opt.title} option={opt} onChoose={onChoose} />
        ))}
        <div className="sm:col-span-2">
          <EntryTile option={NOT_SURE} onChoose={onChoose} />
        </div>
      </div>
    </section>
  );
}

function EntryTile({
  option,
  onChoose,
}: {
  option: EntryOption;
  onChoose: (groups: PathGroup[]) => void;
}) {
  const Icon = option.icon;
  const base =
    'group flex w-full flex-col gap-2 rounded-xl border p-5 text-left transition-colors min-h-[7rem]';
  const styles = option.emphasized
    ? 'border-brand-200 bg-brand-50 hover:border-brand-400'
    : 'border-stone-200 bg-white hover:border-brand-300 hover:bg-stone-50';

  return (
    <button type="button" onClick={() => onChoose(option.groups)} className={`${base} ${styles}`}>
      <Icon className="h-6 w-6 text-brand-700" strokeWidth={1.75} aria-hidden />
      <span
        className={`text-[15px] font-medium ${option.emphasized ? 'text-brand-800' : 'text-stone-900'}`}
      >
        {option.title}
      </span>
      <span
        className={`text-[13px] leading-relaxed ${option.emphasized ? 'text-brand-700' : 'text-stone-500'}`}
      >
        {option.subtitle}
      </span>
    </button>
  );
}
