import { useEffect, useRef } from "react";
import L from "leaflet";
import { BIAFeature } from "../types";
import { neighborhoodThemes } from "../data/biaData";

interface MapComponentProps {
  selectedBiaId: string | null;
  onSelectBia: (id: string | null) => void;
  filteredBias: BIAFeature[];
  mapStyle: "light" | "dark" | "street";
  showLabels: boolean;
  borderThickness: number;
  opacity: number;
}

export default function MapComponent({
  selectedBiaId,
  onSelectBia,
  filteredBias,
  mapStyle,
  showLabels,
  borderThickness,
  opacity,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const geojsonLayersRef = useRef<L.LayerGroup | null>(null);
  const currentLayersMap = useRef<Map<string, L.Polygon>>(new Map());

  // 1. Initialize Map & Setup Resize Invalidation
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icons (in case markers are ever needed)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });

    // Create Leaflet Map centered over Vancouver
    const map = L.map(mapContainerRef.current, {
      center: [49.255, -123.115],
      zoom: 12,
      zoomControl: false, // Custom placed for premium placement
      minZoom: 10,
      maxZoom: 18,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);
    mapRef.current = map;

    // Create layer group for polygons
    const geoGroup = L.layerGroup().addTo(map);
    geojsonLayersRef.current = geoGroup;

    // Invalidate size on first paint & container changes using ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    // Initial trigger to ensure clean layout calculations
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      resizeObserver.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Handle Map Style / Tiles
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    let url = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    let attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    if (mapStyle === "dark") {
      url = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    } else if (mapStyle === "street") {
      url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
      attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }

    tileLayerRef.current = L.tileLayer(url, {
      attribution: attr,
      maxZoom: 20,
    }).addTo(map);
  }, [mapStyle]);

  // 3. Render Polygon Layers
  useEffect(() => {
    const map = mapRef.current;
    const geoGroup = geojsonLayersRef.current;
    if (!map || !geoGroup) return;

    // Clear existing layers
    geoGroup.clearLayers();
    currentLayersMap.current.clear();

    filteredBias.forEach((bia) => {
      const isSelected = bia.properties.mapId === selectedBiaId;
      const themeColor = neighborhoodThemes[bia.properties.category]?.color || "#3B82F6";
      
      // We flip lat/lng coordinates for Leaflet polygon layer mapping
      const coordinates = bia.geometry.coordinates;
      let leafletPolygons: any;

      if (bia.geometry.type === "Polygon") {
        leafletPolygons = (coordinates as number[][][])[0].map((coord) => [coord[1], coord[0]]);
      } else {
        leafletPolygons = (coordinates as number[][][][]).map((poly) =>
          poly[0].map((coord) => [coord[1], coord[0]])
        );
      }

      const polygon = L.polygon(leafletPolygons as any, {
        color: isSelected ? "#4F46E5" : themeColor,
        weight: isSelected ? borderThickness + 2 : borderThickness,
        fillColor: themeColor,
        fillOpacity: isSelected ? opacity + 0.15 : opacity,
        dashArray: isSelected ? "3, 6" : "",
        className: `transition-all duration-300 pointer-events-auto cursor-pointer`,
      });

      // Bind Tooltip showing BIA name & basic metadata
      if (showLabels) {
        polygon.bindTooltip(
          `<div class="font-sans text-xs p-1">
            <div class="font-bold text-gray-900">${bia.properties.name}</div>
            <div class="text-[10px] text-gray-500 mt-0.5">${bia.properties.category}</div>
            <div class="text-[10px] text-indigo-600 font-semibold mt-0.5">${bia.properties.businessCount} Businesses</div>
          </div>`,
          {
            permanent: false,
            direction: "top",
            sticky: true,
            opacity: 0.95,
          }
        );
      }

      // Layer Mouse/Click Actions
      polygon.on("mouseover", (e) => {
        const layer = e.target;
        if (bia.properties.mapId !== selectedBiaId) {
          layer.setStyle({
            fillOpacity: opacity + 0.2,
            weight: borderThickness + 1,
            color: "#4F46E5",
          });
        }
      });

      polygon.on("mouseout", (e) => {
        const layer = e.target;
        if (bia.properties.mapId !== selectedBiaId) {
          layer.setStyle({
            fillOpacity: opacity,
            weight: borderThickness,
            color: themeColor,
          });
        }
      });

      polygon.on("click", () => {
        onSelectBia(bia.properties.mapId);
        // Soft focus map on clicked BIA
        map.setView(bia.properties.center, map.getZoom() < 13 ? 14 : map.getZoom(), {
          animate: true,
          duration: 1.2,
        });
      });

      polygon.addTo(geoGroup);
      currentLayersMap.current.set(bia.properties.mapId, polygon);
    });
  }, [filteredBias, selectedBiaId, showLabels, borderThickness, opacity, onSelectBia]);

  // 4. Focus Map on Selected BIA from Side Panel
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Trigger map invalidation to let leaflet adjust when the retractable sidebar slides
    const timer1 = setTimeout(() => map.invalidateSize({ animate: true }), 100);
    const timer2 = setTimeout(() => map.invalidateSize({ animate: true }), 400);

    if (!selectedBiaId) {
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    const selectedBia = filteredBias.find(b => b.properties.mapId === selectedBiaId);
    if (selectedBia) {
      map.setView(selectedBia.properties.center, map.getZoom() < 13 ? 14 : map.getZoom(), {
        animate: true,
        duration: 1.0,
      });

      // Visual pulse effect for the highlighted layer
      const polyLayer = currentLayersMap.current.get(selectedBiaId);
      if (polyLayer) {
        polyLayer.openTooltip();
      }
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [selectedBiaId, filteredBias]);

  return (
    <div className="relative h-full w-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-100/50 bg-white">
      {/* Actual Map Node */}
      <div ref={mapContainerRef} className="h-full w-full min-h-[400px] z-10" />

      {/* Embedded Mini Legend panel inside map overlay */}
      <div className="absolute top-[72px] left-4 z-20 max-w-[210px] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-gray-150/40 text-xs text-gray-800 space-y-2 pointer-events-auto select-none sm:block hidden transition-all duration-300">
        <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-1 flex items-center justify-between">
          <span>BIA Categories</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </h4>
        <div className="space-y-1 text-[11px] leading-relaxed">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span>
            <span className="text-gray-600 font-medium">Culinary & Culture</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-indigo-500 inline-block"></span>
            <span className="text-gray-600 font-medium">Retail & Fashion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span>
            <span className="text-gray-600 font-medium">Historic & Heritage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block"></span>
            <span className="text-gray-600 font-medium">Commercial & Biz</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-pink-500 inline-block"></span>
            <span className="text-gray-600 font-medium">Arts & Waterfront</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-purple-500 inline-block"></span>
            <span className="text-gray-600 font-medium">Bohemian & Arts</span>
          </div>
        </div>
      </div>

      {/* Floating Lat-Lng Compass Coordinate Badge */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 bg-black/85 text-[10px] text-white/90 font-mono rounded-lg shadow backdrop-blur border border-white/10 flex items-center gap-2 pointer-events-none select-none">
        <span className="text-emerald-400">● GPS</span>
        <span>VANCOUVER Core: 49.28° N, 123.12° W</span>
      </div>
    </div>
  );
}
