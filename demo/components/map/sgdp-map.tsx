"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MlMap, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  surinameOutline, customaryTerritories, concessionGeometries,
  protectedAreas, parcelGeometries, applicationGeometries,
  communities, applications, concessions, disputedTerritories,
} from "@/lib/demo-data";

export type LayerKey =
  | "outline" | "customary" | "concessions" | "protected"
  | "parcels" | "applications" | "communities" | "disputed";

const ALL_LAYERS: LayerKey[] = ["outline", "customary", "concessions", "protected", "parcels", "applications", "communities", "disputed"];

export function SgdpMap({
  layers = ALL_LAYERS,
  highlightCaseId,
  onFeatureClick,
  className,
}: {
  layers?: LayerKey[];
  highlightCaseId?: string;
  onFeatureClick?: (info: { layer: LayerKey; properties: Record<string, unknown> }) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "carto-voyager": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
              "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
              "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
            ],
            tileSize: 256,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · © <a href="https://carto.com/">CARTO</a>',
          },
        },
        layers: [
          { id: "carto-voyager-layer", type: "raster", source: "carto-voyager" },
        ],
      },
      center: [-55.5, 4.5],
      zoom: 6,
      maxBounds: [
        [-60.5, 0.5],
        [-51.5, 7.5],
      ],
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: false }), "top-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

    map.on("load", () => {
      // ─── Outline Suriname (lichte fill voor contrast) ─────────
      map.addSource("sr-outline", { type: "geojson", data: surinameOutline });
      map.addLayer({
        id: "outline-fill",
        type: "fill",
        source: "sr-outline",
        paint: {
          "fill-color": "#f4f9f5",
          "fill-opacity": 0.12,
        },
      });
      map.addLayer({
        id: "outline-line",
        type: "line",
        source: "sr-outline",
        paint: {
          "line-color": "#1f5128",
          "line-width": 2.4,
          "line-opacity": 0.85,
        },
      });

      // ─── Beschermde gebieden — TEAL ─────────
      map.addSource("sr-protected", { type: "geojson", data: protectedAreas });
      map.addLayer({
        id: "protected-fill",
        type: "fill",
        source: "sr-protected",
        paint: {
          "fill-color": "#14b8a6",
          "fill-opacity": 0.22,
          "fill-outline-color": "#0f766e",
        },
      });
      map.addLayer({
        id: "protected-pattern",
        type: "line",
        source: "sr-protected",
        paint: {
          "line-color": "#0f766e",
          "line-width": 1.4,
          "line-dasharray": [2, 2],
        },
      });

      // ─── Customary territories — GOUD ─────────
      map.addSource("sr-customary", { type: "geojson", data: customaryTerritories });
      map.addLayer({
        id: "customary-fill",
        type: "fill",
        source: "sr-customary",
        paint: {
          "fill-color": "#d4a818",
          "fill-opacity": 0.28,
        },
      });
      map.addLayer({
        id: "customary-line",
        type: "line",
        source: "sr-customary",
        paint: {
          "line-color": "#92611a",
          "line-width": 1.6,
        },
      });

      // ─── Concessies — RODE FAMILIE per type ─────────
      map.addSource("sr-concessions", { type: "geojson", data: concessionGeometries });
      map.addLayer({
        id: "concessions-fill",
        type: "fill",
        source: "sr-concessions",
        paint: {
          "fill-color": [
            "match", ["get", "type"],
            "mijnbouw", "#7a0b1f",
            "bosbouw",  "#9a3412",
            "landbouw", "#c2410c",
            "olie_gas", "#3f1818",
            "#7a0b1f",
          ],
          "fill-opacity": 0.38,
        },
      });
      map.addLayer({
        id: "concessions-line",
        type: "line",
        source: "sr-concessions",
        paint: {
          "line-color": [
            "match", ["get", "type"],
            "mijnbouw", "#3d050f",
            "bosbouw",  "#5c1d09",
            "landbouw", "#7c2d12",
            "olie_gas", "#1a0809",
            "#3d050f",
          ],
          "line-width": 1.6,
        },
      });

      // ─── Percelen — PAARSE FAMILIE per RRR-type ─────────
      map.addSource("sr-parcels", { type: "geojson", data: parcelGeometries });
      map.addLayer({
        id: "parcels-fill",
        type: "fill",
        source: "sr-parcels",
        paint: {
          "fill-color": [
            "match", ["get", "rrrType"],
            "eigendom",  "#5b21b6",
            "erfpacht",  "#7c3aed",
            "grondhuur", "#a78bfa",
            "#a78bfa",
          ],
          "fill-opacity": 0.55,
        },
        minzoom: 7,
      });
      map.addLayer({
        id: "parcels-line",
        type: "line",
        source: "sr-parcels",
        paint: {
          "line-color": "#4c1d95",
          "line-width": 0.7,
          "line-opacity": 0.75,
        },
        minzoom: 7,
      });

      // ─── Aanvragen — ORANJE/RISICO-SCALE ─────────
      map.addSource("sr-applications", { type: "geojson", data: applicationGeometries });
      map.addLayer({
        id: "applications-fill",
        type: "fill",
        source: "sr-applications",
        paint: {
          "fill-color": [
            "match", ["get", "riskLevel"],
            "laag",      "#84cc16",
            "middel",    "#f59e0b",
            "hoog",      "#ea580c",
            "zeer_hoog", "#9f1239",
            "#94a299",
          ],
          "fill-opacity": 0.88,
        },
      });
      map.addLayer({
        id: "applications-line",
        type: "line",
        source: "sr-applications",
        paint: {
          "line-color": "#0c0a09",
          "line-width": 1.6,
        },
      });

      // ─── Internationale grensgeschillen — ROOD GESTREEPT ─────────
      map.addSource("sr-disputed", { type: "geojson", data: disputedTerritories });
      map.addLayer({
        id: "disputed-fill",
        type: "fill",
        source: "sr-disputed",
        paint: {
          "fill-color": "#dc2626",
          "fill-opacity": 0.18,
        },
      });
      map.addLayer({
        id: "disputed-line",
        type: "line",
        source: "sr-disputed",
        paint: {
          "line-color": "#991b1b",
          "line-width": 2.2,
          "line-dasharray": [3, 2],
        },
      });
      map.addLayer({
        id: "disputed-label",
        type: "symbol",
        source: "sr-disputed",
        layout: {
          "text-field": "BETWIST",
          "text-size": 10,
          "text-letter-spacing": 0.18,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        },
        paint: {
          "text-color": "#7f1d1d",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1.6,
        },
      });

      // ─── Community-markers ─────────
      const commFeatures = communities.map((c) => {
        const territory = customaryTerritories.features.find(f => f.properties?.communityId === c.id);
        const coords = territory?.geometry.coordinates[0];
        const center = coords
          ? [
              coords.reduce((s, p) => s + p[0], 0) / coords.length,
              coords.reduce((s, p) => s + p[1], 0) / coords.length,
            ]
          : [-55.5, 4.5];
        return {
          type: "Feature" as const,
          properties: { id: c.id, name: c.name, peopleGroup: c.peopleGroup, district: c.district },
          geometry: { type: "Point" as const, coordinates: center },
        };
      });
      map.addSource("sr-communities", {
        type: "geojson",
        data: { type: "FeatureCollection", features: commFeatures },
      });
      map.addLayer({
        id: "communities-circle",
        type: "circle",
        source: "sr-communities",
        paint: {
          "circle-radius": 7,
          "circle-color": "#ffffff",
          "circle-stroke-color": "#1e3a8a",
          "circle-stroke-width": 2.8,
        },
      });
      map.addLayer({
        id: "communities-label",
        type: "symbol",
        source: "sr-communities",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 11,
          "text-offset": [0, 1.4],
          "text-anchor": "top",
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        },
        paint: {
          "text-color": "#1e3a8a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1.8,
        },
      });

      // ─── Cursor / popups ─────────
      const popup = new Popup({ closeButton: false, closeOnClick: false, offset: 10, className: "sgdp-popup" });

      const interactiveLayers: Array<[string, LayerKey, (p: Record<string, unknown>) => string]> = [
        ["customary-fill", "customary", (p) => `<strong>${p.name}</strong><br/><span style="color:#5a6a60">Traditioneel woon- en leefgebied</span><br/><span style="color:#5a6a60">${(p.areaHa as number).toLocaleString("nl-NL")} ha</span>`],
        ["concessions-fill", "concessions", (p) => {
          const c = concessions.find(c => c.id === p.id);
          return `<strong>${p.name}</strong><br/><span style="color:#5a6a60">Type: ${p.type}</span><br/>${c ? `<span style="color:#5a6a60">Houder: ${c.holder}</span>` : ""}`;
        }],
        ["protected-fill", "protected", (p) => `<strong>${p.name}</strong><br/><span style="color:#5a6a60">${p.category}</span><br/><span style="color:#5a6a60">${(p.areaHa as number).toLocaleString("nl-NL")} ha</span>`],
        ["parcels-fill", "parcels", (p) => `<strong style="font-family: ui-monospace, Menlo">${p.perceelsid}</strong><br/><span style="color:#5a6a60">${p.rrrType} · ${p.district}</span>`],
        ["applications-fill", "applications", (p) => {
          const app = applications.find(a => a.geometryRef === p.id);
          return `<strong>${p.caseNumber}</strong><br/>${app ? `<span style="color:#5a6a60">${app.applicantName}</span><br/><span style="color:#5a6a60">Risico: ${app.riskLevel}</span>` : ""}`;
        }],
        ["communities-circle", "communities", (p) => `<strong>${p.name}</strong><br/><span style="color:#5a6a60">${p.peopleGroup === "inheems" ? "Inheems" : "Tribaal/Marron"}</span>`],
        ["disputed-fill", "disputed", (p) => `<strong>${p.name}</strong><br/><span style="color:#5a6a60">Tegenpartij: ${p.counterparty}</span><br/><span style="color:#5a6a60">Sinds: ${p.since}</span><br/><span style="color:#7f1d1d">${p.status}</span>`],
      ];

      for (const [layerId, layerKey, contentFn] of interactiveLayers) {
        map.on("mouseenter", layerId, () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", layerId, () => { map.getCanvas().style.cursor = ""; popup.remove(); });
        map.on("mousemove", layerId, (e) => {
          const f = e.features?.[0];
          if (!f) return;
          popup.setLngLat(e.lngLat).setHTML(contentFn(f.properties as Record<string, unknown>)).addTo(map);
        });
        map.on("click", layerId, (e) => {
          const f = e.features?.[0];
          if (!f) return;
          onFeatureClick?.({ layer: layerKey, properties: f.properties as Record<string, unknown> });
        });
      }

      setReady(true);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Layer toggling
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;
    const layerMap: Record<LayerKey, string[]> = {
      outline:      ["outline-fill", "outline-line"],
      customary:    ["customary-fill", "customary-line"],
      concessions:  ["concessions-fill", "concessions-line"],
      protected:    ["protected-fill", "protected-pattern"],
      parcels:      ["parcels-fill", "parcels-line"],
      applications: ["applications-fill", "applications-line"],
      communities:  ["communities-circle", "communities-label"],
      disputed:     ["disputed-fill", "disputed-line", "disputed-label"],
    };
    for (const k of ALL_LAYERS) {
      const visible = layers.includes(k);
      for (const id of layerMap[k]) {
        if (map.getLayer(id)) {
          map.setLayoutProperty(id, "visibility", visible ? "visible" : "none");
        }
      }
    }
  }, [layers, ready]);

  // Highlight aanvraag
  useEffect(() => {
    if (!ready || !mapRef.current || !highlightCaseId) return;
    const app = applications.find(a => a.id === highlightCaseId);
    if (!app) return;
    const feat = applicationGeometries.features.find(f => f.id === app.geometryRef);
    if (!feat) return;
    const coords = feat.geometry.coordinates[0];
    const lngs = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    mapRef.current.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 80, duration: 800, maxZoom: 11 },
    );
  }, [highlightCaseId, ready]);

  return <div ref={containerRef} className={className ?? "w-full h-full"} />;
}
