import type { School } from '../types/school';
import type { PathwayStrategy } from '../types/pathwayStrategy';
import { deriveUndergradCost } from '../lib/strategyCost';
import { fmtMoney } from '../lib/format';

// Prototype: renders one strategy at a time as a Strategy -> Undergraduate ->
// Graduate/Professional -> Career flow, instead of the card-grid view.
// Column x-positions are percentages of the container (not fixed px), and the
// arrow SVG uses a percent-wide viewBox with preserveAspectRatio="none", so
// the whole diagram scales to fit the available width with no horizontal
// scrollbar -- only row y-positions are fixed px, which is fine since height
// doesn't need to flex here (docs/paths_journeys_plan.md: static,
// single-strategy, desktop-only prototype).
type Tier = 'elite' | 'mid' | 'value';

const ROW_Y: Record<Tier, number> = { elite: 20, mid: 100, value: 180 };
const NODE_H = 44;
const CANVAS_H = ROW_Y.value + NODE_H + 20;

const NODE_W_PCT = 26;
const GUTTER_PCT = (100 - NODE_W_PCT * 3) / 2;
const COL_X_PCT = {
  undergrad: 0,
  grad: NODE_W_PCT + GUTTER_PCT,
  career: (NODE_W_PCT + GUTTER_PCT) * 2,
};

const TIER_LABEL: Record<Tier, string> = {
  elite: 'Elite / Prestige',
  mid: 'Mid-Tier',
  value: 'Affordable In-State',
};

interface AltCareer {
  id: string;
  label: string;
}

interface FlowNode {
  key: string;
  label: string;
  xPct: number;
  y: number;
  active: boolean;
}

function rightCenter(n: FlowNode) {
  return { x: n.xPct + NODE_W_PCT, y: n.y + NODE_H / 2 };
}
function leftCenter(n: FlowNode) {
  return { x: n.xPct, y: n.y + NODE_H / 2 };
}
function curvePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

interface StrategyFlowCanvasProps {
  strategies: PathwayStrategy[];
  selectedId: string;
  onSelectStrategy: (id: string) => void;
  schools: School[];
  medicalSchoolCostRange: { low: number; high: number };
  endpointLabel: string;
  altCareers: [AltCareer, AltCareer];
}

export function StrategyFlowCanvas({
  strategies,
  selectedId,
  onSelectStrategy,
  schools,
  medicalSchoolCostRange,
  endpointLabel,
  altCareers,
}: StrategyFlowCanvasProps) {
  const strategy = strategies.find((s) => s.id === selectedId) ?? strategies[0];
  if (!strategy) return null;

  const undergradCost = deriveUndergradCost(schools, strategy.undergrad_leg);
  const totalLow = undergradCost ? undergradCost.min4yr + medicalSchoolCostRange.low : null;
  const totalHigh = undergradCost ? undergradCost.max4yr + medicalSchoolCostRange.high : null;

  const undergradNodes: FlowNode[] = strategy.undergrad_leg.program_linked
    ? [{ key: 'ug-program', label: 'Direct-med program (BS/MD)', xPct: COL_X_PCT.undergrad, y: ROW_Y.mid, active: true }]
    : (['elite', 'mid', 'value'] as const).map((tier) => ({
        key: `ug-${tier}`,
        label: TIER_LABEL[tier],
        xPct: COL_X_PCT.undergrad,
        y: ROW_Y[tier],
        active: (strategy.undergrad_leg.bucket_tiers ?? []).includes(tier),
      }));

  let gradNodes: FlowNode[];
  if (strategy.grad_leg.kind === 'med_school') {
    // Any med-school tier is reachable regardless of undergrad tier -- that's
    // the point being taught, so all three fan out and are active together.
    gradNodes = (['elite', 'mid', 'value'] as const).map((tier) => ({
      key: `grad-${tier}`,
      label: `${TIER_LABEL[tier]} med school`,
      xPct: COL_X_PCT.grad,
      y: ROW_Y[tier],
      active: true,
    }));
  } else {
    gradNodes = [{ key: 'grad-single', label: strategy.grad_leg.label, xPct: COL_X_PCT.grad, y: ROW_Y.mid, active: true }];
  }

  const careerNodes: FlowNode[] = [
    { key: 'career-endpoint', label: endpointLabel, xPct: COL_X_PCT.career, y: ROW_Y.elite, active: true },
    { key: 'career-alt-0', label: altCareers[0].label, xPct: COL_X_PCT.career, y: ROW_Y.mid, active: false },
    { key: 'career-alt-1', label: altCareers[1].label, xPct: COL_X_PCT.career, y: ROW_Y.value, active: false },
  ];

  const activeUndergrad = undergradNodes.filter((n) => n.active);
  const activeGrad = gradNodes.filter((n) => n.active);
  const endpointNode = careerNodes[0];

  const arrows: { d: string; dashed?: boolean }[] = [];
  for (const from of activeUndergrad) {
    for (const to of activeGrad) {
      arrows.push({ d: curvePath(rightCenter(from), leftCenter(to)) });
    }
  }
  for (const from of activeGrad) {
    arrows.push({ d: curvePath(rightCenter(from), leftCenter(endpointNode)) });
    // "Keep options open" means literally that -- other careers stay
    // reachable too, shown as light dashed lines distinct from the solid
    // endpoint route, rather than just asserted in prose.
    if (strategy.grad_leg.kind === 'keep_options_open') {
      for (const alt of careerNodes.slice(1)) {
        arrows.push({ d: curvePath(rightCenter(from), leftCenter(alt)), dashed: true });
      }
    }
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h3 className="font-display text-xl font-normal text-stone-900">{strategy.name}</h3>
        <p className="text-sm text-stone-600 mt-1">{strategy.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {strategies.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelectStrategy(s.id)}
            aria-pressed={s.id === strategy.id}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              s.id === strategy.id
                ? 'bg-brand-800 text-white'
                : 'bg-stone-200 text-stone-400 hover:bg-stone-300'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div>
        <div className="flex text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
          <span style={{ width: `${NODE_W_PCT}%` }}>Undergraduate</span>
          <span style={{ width: `${GUTTER_PCT}%` }} />
          <span style={{ width: `${NODE_W_PCT}%` }}>Graduate / Professional</span>
          <span style={{ width: `${GUTTER_PCT}%` }} />
          <span style={{ width: `${NODE_W_PCT}%` }}>Career</span>
        </div>

        <div className="relative" style={{ height: CANVAS_H }}>
          <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height={CANVAS_H}
            viewBox={`0 0 100 ${CANVAS_H}`}
            preserveAspectRatio="none"
          >
            {arrows.map((arrow, i) => (
              <path
                key={i}
                d={arrow.d}
                fill="none"
                stroke={arrow.dashed ? '#d6d3d1' : '#0e7490'}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                strokeDasharray={arrow.dashed ? '5 4' : undefined}
              />
            ))}
          </svg>

          {[...undergradNodes, ...gradNodes, ...careerNodes].map((n) => (
            <div
              key={n.key}
              className={`absolute flex items-center justify-center rounded-full px-3 text-center text-xs font-semibold leading-tight ${
                n.active ? 'bg-brand-800 text-white' : 'bg-stone-200 text-stone-400'
              }`}
              style={{ left: `${n.xPct}%`, width: `${NODE_W_PCT}%`, top: n.y, height: NODE_H }}
            >
              {n.label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm border-t border-stone-100 pt-3">
        <div>
          <span className="text-xs text-stone-500">Undergrad cost (4 years, sticker price)</span>
          <div className="text-lg font-semibold text-stone-900">
            {undergradCost
              ? `${fmtMoney(undergradCost.min4yr)} – ${fmtMoney(undergradCost.max4yr)}`
              : 'Not enough priced schools yet'}
          </div>
        </div>
        <div className="text-xs text-stone-500">
          Total incl. medical school (national estimate):{' '}
          <span className="font-medium text-stone-700">
            {totalLow != null && totalHigh != null
              ? `${fmtMoney(totalLow)} – ${fmtMoney(totalHigh)}`
              : 'n/a'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-stone-100 pt-3 text-sm text-stone-700">
        <p>{strategy.logic}</p>

        {strategy.best_for.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Best for</div>
            <ul className="list-disc list-inside">
              {strategy.best_for.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {strategy.watch_outs.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Watch outs</div>
            <ul className="list-disc list-inside text-red-700">
              {strategy.watch_outs.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {strategy.grad_leg.kind === 'keep_options_open' && (
          <p className="text-xs text-stone-400">
            Dashed lines show this strategy's whole point: it doesn't commit to becoming a
            physician, it keeps {altCareers[0].label} and {altCareers[1].label} (among other paths
            on Explore Careers) genuinely reachable too.
          </p>
        )}

        {undergradCost && (
          <p className="text-xs text-stone-400">
            Undergrad range uses sticker cost (not Scorecard's aid-adjusted net price — see "How
            to read this data" on Schools), derived from {undergradCost.schoolCount} school
            {undergradCost.schoolCount === 1 ? '' : 's'} in this app's current data —{' '}
            {fmtMoney(undergradCost.min4yr)} – {fmtMoney(undergradCost.max4yr)} for 4 years. Real
            financial aid can lower this a lot, especially at need-aid-generous elite schools.
          </p>
        )}
      </div>
    </div>
  );
}
