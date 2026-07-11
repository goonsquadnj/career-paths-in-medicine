import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { School } from '../types/school';
import { useWishlistStore } from '../store/wishlistStore';

// PLACEHOLDER BASEMAP: using MapLibre's free demo vector style for now.
// docs/architecture.md flags "Basemap choice for MapLibre (free raster vs.
// self-hosted vector); revisit at R2" as an open question — this satisfies
// R2 with zero cost/token setup, but should be revisited (e.g. a nicer free
// vector style, or a self-hosted one) before this app is something Lucy uses
// day to day.
const PLACEHOLDER_BASEMAP_STYLE = 'https://demotiles.maplibre.org/style.json';

interface SchoolMapProps {
  schools: School[];
  onSelectSchool?: (schoolId: string) => void;
}

export function SchoolMap({ schools, onSelectSchool }: SchoolMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  // Guards against React StrictMode's dev-only mount -> unmount -> remount
  // cycle: without this, the first mount's async `load` handler can fire
  // after the second mount has already created a new map instance (or after
  // teardown), leaving markers unsynced. This ref is set synchronously in
  // the init effect and cleared in its cleanup, so any callback that fires
  // after teardown can check it and bail out instead of racing.
  const isMountedRef = useRef(false);
  const [isStyleReady, setIsStyleReady] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const wishlist = useWishlistStore((s) => s.wishlist);

  // Init map once per mount.
  useEffect(() => {
    if (!containerRef.current) return;

    isMountedRef.current = true;
    setIsStyleReady(false);

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: PLACEHOLDER_BASEMAP_STYLE,
      center: [-77, 40],
      zoom: 4,
    });
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    const handleLoad = () => {
      // Ignore a stale `load` firing after this effect instance was torn
      // down (e.g. StrictMode's synchronous unmount/remount in dev).
      if (!isMountedRef.current || mapRef.current !== map) return;
      setIsStyleReady(true);
    };

    if (map.isStyleLoaded()) {
      handleLoad();
    } else {
      map.once('load', handleLoad);
    }

    return () => {
      isMountedRef.current = false;
      map.off('load', handleLoad);
      // Clear marker bookkeeping — the markers themselves are destroyed
      // along with the map's DOM via map.remove(), but stale entries here
      // would make the next mount's sync think markers already exist.
      markersRef.current.clear();
      map.remove();
      if (mapRef.current === map) {
        mapRef.current = null;
      }
      setIsStyleReady(false);
    };
  }, []);

  // Compute the schools actually visible on the map: the filtered set passed
  // in from App.tsx, optionally narrowed further to just the wishlist tiers.
  // Memoized so this array is only recreated when an actual input changes,
  // not on every render (e.g. from unrelated parent re-renders).
  const visibleSchools = useMemo(
    () => (showWishlistOnly ? schools.filter((s) => Boolean(wishlist[s.id])) : schools),
    [schools, showWishlistOnly, wishlist],
  );

  // Idempotent marker reconciliation: safe to call any number of times with
  // any visible set — it diffs against markersRef and only adds/removes what
  // changed. This is the single source of truth for what's rendered, called
  // both once the style is ready and whenever the visible set changes.
  const syncMarkers = useCallback(
    (map: MapLibreMap, visible: School[]) => {
      const visibleIds = new Set(visible.map((s) => s.id));

      // Remove markers no longer visible.
      for (const [id, marker] of markersRef.current) {
        if (!visibleIds.has(id)) {
          marker.remove();
          markersRef.current.delete(id);
        }
      }

      // Add markers for newly-visible schools.
      for (const school of visible) {
        if (markersRef.current.has(school.id)) continue;

        const tier = wishlist[school.id];
        const color = tier === 'reach' ? '#dc2626' : tier === 'target' ? '#d97706' : tier === 'safety' ? '#16a34a' : '#0d9488';

        const popupNode = document.createElement('div');
        popupNode.className = 'text-sm';
        popupNode.innerHTML = `
          <div class="font-semibold text-gray-900">${school.name}</div>
          <div class="text-gray-500">${school.location}</div>
        `;
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View school card';
        viewButton.className = 'mt-1 text-brand-700 underline text-xs';
        viewButton.addEventListener('click', () => onSelectSchool?.(school.id));
        popupNode.appendChild(viewButton);

        const popup = new Popup({ offset: 20 }).setDOMContent(popupNode);

        const marker = new maplibregl.Marker({ color })
          .setLngLat([school.longitude, school.latitude])
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener('click', () => {
          onSelectSchool?.(school.id);
        });

        markersRef.current.set(school.id, marker);
      }
    },
    [onSelectSchool, wishlist],
  );

  // Re-run marker sync whenever the style becomes ready or the visible set
  // (or wishlist tiers, which affect marker color) changes. Because
  // syncMarkers is idempotent, this is correct regardless of how many times
  // or in what order it fires.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isStyleReady) return;
    syncMarkers(map, visibleSchools);
  }, [isStyleReady, visibleSchools, syncMarkers]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowWishlistOnly(false)}
          className={`min-h-11 rounded px-3 py-2 text-sm font-medium border ${
            !showWishlistOnly
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          All filtered schools ({schools.length})
        </button>
        <button
          type="button"
          onClick={() => setShowWishlistOnly(true)}
          className={`min-h-11 rounded px-3 py-2 text-sm font-medium border ${
            showWishlistOnly
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          My wishlist only ({schools.filter((s) => Boolean(wishlist[s.id])).length})
        </button>
      </div>
      <div
        ref={containerRef}
        className="w-full h-[420px] rounded-lg border border-gray-200 overflow-hidden"
      />
      <p className="text-xs text-gray-500">
        Pins reflect the current filters above. Click a pin for a quick popup, then "View school
        card" to jump to its full profile below.
      </p>
    </div>
  );
}
