import { useEffect, useRef, useState } from 'react';
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
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const wishlist = useWishlistStore((s) => s.wishlist);

  // Init map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: PLACEHOLDER_BASEMAP_STYLE,
      center: [-77, 40],
      zoom: 4,
    });
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Compute the schools actually visible on the map: the filtered set passed
  // in from App.tsx, optionally narrowed further to just the wishlist tiers.
  const visibleSchools = showWishlistOnly
    ? schools.filter((s) => Boolean(wishlist[s.id]))
    : schools;

  // Sync markers whenever the visible set changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const syncMarkers = () => {
      const visibleIds = new Set(visibleSchools.map((s) => s.id));

      // Remove markers no longer visible.
      for (const [id, marker] of markersRef.current) {
        if (!visibleIds.has(id)) {
          marker.remove();
          markersRef.current.delete(id);
        }
      }

      // Add markers for newly-visible schools.
      for (const school of visibleSchools) {
        if (markersRef.current.has(school.id)) continue;

        const tier = wishlist[school.id];
        const color = tier === 'reach' ? '#dc2626' : tier === 'target' ? '#d97706' : tier === 'safety' ? '#16a34a' : '#2563eb';

        const popupNode = document.createElement('div');
        popupNode.className = 'text-sm';
        popupNode.innerHTML = `
          <div class="font-semibold text-gray-900">${school.name}</div>
          <div class="text-gray-500">${school.location}</div>
        `;
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View school card';
        viewButton.className = 'mt-1 text-blue-600 underline text-xs';
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
    };

    if (map.isStyleLoaded()) {
      syncMarkers();
    } else {
      map.once('load', syncMarkers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSchools, wishlist]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowWishlistOnly(false)}
          className={`rounded px-3 py-1 text-sm font-medium border ${
            !showWishlistOnly
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          All filtered schools ({schools.length})
        </button>
        <button
          type="button"
          onClick={() => setShowWishlistOnly(true)}
          className={`rounded px-3 py-1 text-sm font-medium border ${
            showWishlistOnly
              ? 'bg-blue-600 text-white border-blue-600'
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
