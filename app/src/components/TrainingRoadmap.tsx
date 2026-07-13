// Simple left-to-right visual roadmap for a career path's `roadmap` steps
// (docs/ux_redesign_plan.md Phase 3). Deliberately plain — a row of labeled
// steps connected by arrows, wrapping on narrow screens. Not a flowchart;
// per the brief, "keep this simple, do not create a giant spaghetti diagram."
export function TrainingRoadmap({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2" role="list" aria-label="Training roadmap">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1" role="listitem">
          <span className="rounded-full border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800 whitespace-nowrap">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-brand-400 text-sm" aria-hidden>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
