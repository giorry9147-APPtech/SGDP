"use client";

import { useState } from "react";
import { Map as MapIcon, Layers, Info, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { LayerKey } from "@/components/map/sgdp-map";
import { applications, communities, concessions, customaryTerritories, protectedAreas } from "@/lib/demo-data";

// MapLibre is pure client-side
const SgdpMap = dynamic(() => import("@/components/map/sgdp-map").then(m => m.SgdpMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-sr-green-50">
      <div className="text-sm text-sr-ink-500">Kaart laden…</div>
    </div>
  ),
});

const layerDefs: { key: LayerKey; label: string; description: string; color: string }[] = [
  { key: "customary",    label: "Traditionele woon- en leefgebieden (ITP)", description: "STDM-laag — Inheemse en Tribale Volken",  color: "#d4a818" },
  { key: "concessions",  label: "Concessies",                                 description: "Mijnbouw, bosbouw, landbouw, olie/gas", color: "#7a0b1f" },
  { key: "protected",    label: "Beschermde gebieden",                        description: "Natuurreservaten, kustgebieden",         color: "#0d9488" },
  { key: "parcels",      label: "Percelen (formele rechten)",                  description: "Eigendom, erfpacht, grondhuur",          color: "#7c3aed" },
  { key: "applications", label: "Aanvragen domeingrond",                      description: "Gekleurd op risiconiveau",                color: "#ea580c" },
  { key: "communities",  label: "Gemeenschappen",                              description: "Inheemse + tribale dorpen",               color: "#1e3a8a" },
  { key: "outline",      label: "Suriname (contour)",                          description: "Officiële Surinaamse grenzen",            color: "#377e3f" },
];

export default function KaartPage() {
  const [activeLayers, setActiveLayers] = useState<LayerKey[]>(["outline", "customary", "concessions", "protected", "applications", "communities"]);
  const [selected, setSelected] = useState<{ layer: LayerKey; properties: Record<string, unknown> } | null>(null);

  const toggle = (k: LayerKey) =>
    setActiveLayers((prev) => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      <div className="px-6 pt-6">
        <PageHeader
          eyebrow="GIS — Land Rights Intelligence"
          title="Geografische conflictanalyse Suriname"
          description="Kaart toont overlap tussen formele rechten, traditionele gebieden, concessies en beschermde gebieden — basis voor advies."
          action={
            <Badge variant="green" className="text-xs">
              <MapPin className="size-3" />
              {applications.length} aanvragen · {customaryTerritories.features.length} ITP-gebieden · {concessions.length} concessies · {protectedAreas.features.length} beschermd
            </Badge>
          }
        />
      </div>

      <div className="flex-1 flex gap-4 px-6 pb-6 min-h-0">
        {/* Sidebar lagen */}
        <aside className="w-72 shrink-0 sr-card p-4 overflow-y-auto sr-scrollbar">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-sr-line">
            <Layers className="size-4 text-sr-green-700" />
            <h3 className="text-sm font-semibold text-sr-ink-900">Kaartlagen</h3>
          </div>

          <div className="space-y-2 mb-5">
            {layerDefs.map((l) => (
              <label
                key={l.key}
                className={cn(
                  "flex items-start gap-2.5 p-2 rounded-md cursor-pointer transition-colors",
                  activeLayers.includes(l.key) ? "bg-sr-green-50 border border-sr-green-100" : "hover:bg-sr-cream border border-transparent",
                )}
              >
                <input
                  type="checkbox"
                  checked={activeLayers.includes(l.key)}
                  onChange={() => toggle(l.key)}
                  className="mt-0.5 accent-sr-green-700"
                />
                <span
                  className="size-3.5 rounded-sm shrink-0 mt-0.5"
                  style={{ background: l.color, opacity: 0.7 }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-sr-ink-900 leading-tight">{l.label}</div>
                  <div className="text-[11px] text-sr-ink-500 leading-tight">{l.description}</div>
                </div>
              </label>
            ))}
          </div>

          {/* Legenda risico's */}
          <div className="border-t border-sr-line pt-3 mb-5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-sr-ink-500 mb-2">Risiconiveau aanvragen</h4>
            <div className="space-y-1.5">
              {[
                { label: "Laag",      color: "#84cc16" },
                { label: "Middel",    color: "#f59e0b" },
                { label: "Hoog",      color: "#ea580c" },
                { label: "Zeer hoog", color: "#9f1239" },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2 text-xs text-sr-ink-700">
                  <span className="size-3 rounded-sm" style={{ background: r.color }} />
                  <span>{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Geselecteerd object */}
          {selected && (
            <div className="border-t border-sr-line pt-3">
              <div className="flex items-center gap-2 mb-2">
                <Info className="size-4 text-sr-green-700" />
                <h4 className="text-sm font-semibold text-sr-ink-900">Geselecteerd</h4>
              </div>
              <FeatureDetail layer={selected.layer} properties={selected.properties} />
            </div>
          )}
        </aside>

        {/* Kaartcontainer */}
        <div className="flex-1 sr-card p-0 overflow-hidden relative">
          <SgdpMap
            layers={activeLayers}
            onFeatureClick={(info) => setSelected(info)}
            className="w-full h-full"
          />

          {/* Bovenste info-strip op de kaart */}
          <div className="absolute top-3 left-3 right-12 flex items-center gap-2 pointer-events-none">
            <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-sr-line text-xs flex items-center gap-2 pointer-events-auto">
              <MapIcon className="size-3.5 text-sr-green-700" />
              <span className="text-sr-ink-700">Klik op een gebied voor details</span>
            </div>
            <div className="ml-auto bg-sr-red-700 text-white px-3 py-1.5 rounded-md shadow-sm text-[10px] font-bold uppercase tracking-wider pointer-events-auto">
              Live conflict-detectie actief
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureDetail({ layer, properties }: { layer: LayerKey; properties: Record<string, unknown> }) {
  if (layer === "customary") {
    const territory = customaryTerritories.features.find(f => f.properties?.id === properties.id);
    const community = territory ? communities.find(c => c.id === territory.properties?.communityId) : undefined;
    const overlapsConcession = layer === "customary" && (properties.id === "CT-001");
    return (
      <div className="text-xs space-y-2">
        <div>
          <div className="font-semibold text-sr-ink-900 mb-0.5">{String(properties.name)}</div>
          <div className="text-sr-ink-500">{(properties.areaHa as number).toLocaleString("nl-NL")} ha</div>
        </div>
        {community && (
          <div className="bg-sr-gold-100/40 border border-sr-gold-600/40 rounded p-2">
            <div className="font-medium text-sr-ink-900 mb-1">Gemeenschap</div>
            <div className="text-sr-ink-700">{community.name}</div>
            <div className="text-sr-ink-500">~{community.populationEstimate.toLocaleString("nl-NL")} bewoners · {community.primaryLanguage}</div>
            {community.traditionalAuthority.granman && (
              <div className="text-sr-ink-500 mt-1">Granman: {community.traditionalAuthority.granman}</div>
            )}
          </div>
        )}
        {overlapsConcession && (
          <div className="bg-sr-red-50 border border-sr-red-100 rounded p-2 text-sr-red-900">
            <strong>Conflict gedetecteerd:</strong> overlap met DEMO_Goudconcessie A-12 (CON-001).
          </div>
        )}
      </div>
    );
  }
  if (layer === "concessions") {
    const c = concessions.find(c => c.id === properties.id);
    return (
      <div className="text-xs space-y-1.5">
        <div className="font-semibold text-sr-ink-900">{String(properties.name)}</div>
        {c && (
          <>
            <div className="text-sr-ink-500">Type: {c.type}</div>
            <div className="text-sr-ink-500">Houder: {c.holder}</div>
            <div className="text-sr-ink-500">Geldig: {c.validFrom} → {c.validTo}</div>
          </>
        )}
      </div>
    );
  }
  if (layer === "applications") {
    const app = applications.find(a => a.geometryRef === properties.id);
    if (!app) return null;
    return (
      <div className="text-xs space-y-1.5">
        <div className="font-mono font-semibold text-sr-ink-900">{app.caseNumber}</div>
        <div className="text-sr-ink-700">{app.applicantName}</div>
        <div className="text-sr-ink-500">Doel: {app.purpose.replace(/_/g, " ")}</div>
        <div className="text-sr-ink-500">Risico: <strong>{app.riskLevel}</strong> ({app.riskScore}/100)</div>
        {app.blockers.length > 0 && (
          <div className="bg-sr-red-50 border border-sr-red-100 rounded p-1.5 text-sr-red-900 mt-1">
            {app.blockers[0]}
          </div>
        )}
      </div>
    );
  }
  if (layer === "parcels") {
    return (
      <div className="text-xs space-y-1">
        <div className="font-mono font-semibold text-sr-ink-900">{String(properties.perceelsid)}</div>
        <div className="text-sr-ink-500">{String(properties.rrrType)} · {String(properties.district)}</div>
      </div>
    );
  }
  if (layer === "protected") {
    return (
      <div className="text-xs space-y-1">
        <div className="font-semibold text-sr-ink-900">{String(properties.name)}</div>
        <div className="text-sr-ink-500">Categorie: {String(properties.category)}</div>
        <div className="text-sr-ink-500">{(properties.areaHa as number).toLocaleString("nl-NL")} ha</div>
      </div>
    );
  }
  if (layer === "communities") {
    const c = communities.find(c => c.id === properties.id);
    if (!c) return null;
    return (
      <div className="text-xs space-y-1">
        <div className="font-semibold text-sr-ink-900">{c.name}</div>
        <div className="text-sr-ink-500">{c.peopleGroup === "inheems" ? "Inheems" : "Tribaal / Marron"}</div>
        <div className="text-sr-ink-500">~{c.populationEstimate.toLocaleString("nl-NL")} bewoners · {c.primaryLanguage}</div>
      </div>
    );
  }
  return null;
}
