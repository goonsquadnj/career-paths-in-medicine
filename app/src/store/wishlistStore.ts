import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Lucy's wishlist: each school she's interested in gets tiered as
// reach / target / safety. This is *her* list (see docs/vision.md) and it
// must persist across sessions (Epic H / P-client, docs/product_backlog.md).
export type WishlistTier = 'reach' | 'target' | 'safety';

export type WishlistMap = Record<string, WishlistTier>;

interface WishlistState {
  wishlist: WishlistMap;
  setTier: (schoolId: string, tier: WishlistTier) => void;
  clearTier: (schoolId: string) => void;
  toggleTier: (schoolId: string, tier: WishlistTier) => void;
}

// Namespaced + versioned localStorage key so future schema changes can add a
// migration instead of silently breaking Lucy's saved list.
const STORAGE_KEY = 'lucy-planner:wishlist:v1';

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: {},
      setTier: (schoolId, tier) =>
        set((state) => ({ wishlist: { ...state.wishlist, [schoolId]: tier } })),
      clearTier: (schoolId) =>
        set((state) => {
          const next = { ...state.wishlist };
          delete next[schoolId];
          return { wishlist: next };
        }),
      // Clicking the already-active tier clears it (acts like a toggle).
      toggleTier: (schoolId, tier) => {
        const current = get().wishlist[schoolId];
        if (current === tier) {
          get().clearTier(schoolId);
        } else {
          get().setTier(schoolId, tier);
        }
      },
    }),
    { name: STORAGE_KEY },
  ),
);
