import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { randomId } from '../lib/id';

// "My Plan" state (docs/ux_redesign_plan.md Phase 4) — the placeholder slots
// beyond the school reach/target/safety tiering already covered by
// wishlistStore: selected career path, preferred training route, and two
// free-text lists (open questions, next steps). Deliberately lightweight —
// this is a planning artifact Lucy edits herself, not a computed result.
// Client-side only, no auth (docs/architecture.md persistence model).
export interface Note {
  id: string;
  text: string;
}

interface PlanState {
  selectedPathId: string | null;
  preferredRoute: string;
  openQuestions: Note[];
  nextSteps: Note[];
  setSelectedPathId: (pathId: string | null) => void;
  setPreferredRoute: (text: string) => void;
  addOpenQuestion: (text: string) => void;
  removeOpenQuestion: (id: string) => void;
  addNextStep: (text: string) => void;
  removeNextStep: (id: string) => void;
}

const STORAGE_KEY = 'lucy-planner:plan:v1';

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      selectedPathId: null,
      preferredRoute: '',
      openQuestions: [],
      nextSteps: [],
      setSelectedPathId: (pathId) => set({ selectedPathId: pathId }),
      setPreferredRoute: (text) => set({ preferredRoute: text }),
      addOpenQuestion: (text) =>
        set((state) => ({ openQuestions: [...state.openQuestions, { id: randomId(), text }] })),
      removeOpenQuestion: (id) =>
        set((state) => ({ openQuestions: state.openQuestions.filter((n) => n.id !== id) })),
      addNextStep: (text) =>
        set((state) => ({ nextSteps: [...state.nextSteps, { id: randomId(), text }] })),
      removeNextStep: (id) =>
        set((state) => ({ nextSteps: state.nextSteps.filter((n) => n.id !== id) })),
    }),
    { name: STORAGE_KEY },
  ),
);
