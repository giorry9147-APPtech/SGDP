"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Send, FileUp, MapPin, Loader2, CheckCircle2,
  Sparkles, AlertCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { generateAdvice } from "@/lib/advice-engine";
import { AdviceReportPanel } from "@/components/advice/advice-report";
import { districts, communities, type Application, type DistrictId } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const SgdpMap = dynamic(() => import("@/components/map/sgdp-map").then(m => m.SgdpMap), { ssr: false });

type Scenario = {
  label: string;
  description: string;
  badge?: string;
  application: Partial<Application>;
};

// Voorgekookte demo-scenario's
const SCENARIOS: Scenario[] = [
  {
    label: "Scenario A — Schone aanvraag",
    description: "DEMO_Para, geen overlap, alle documenten compleet",
    badge: "groen",
    application: {
      applicantName: "DEMO_Aanvrager A. Nieuw",
      applicantId: "9999001",
      nationality: "SUR",
      applicationType: "specifiek",
      purpose: "bebouwing_bewoning",
      district: "PAR",
      documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
      documentsMissing: [],
      blockers: [],
      fpicRequired: false,
      envReviewRequired: false,
    },
  },
  {
    label: "Scenario B — Overlap traditioneel gebied",
    description: "Aanvraag in DEMO_Galibi traditioneel woon- en leefgebied",
    badge: "FPIC",
    application: {
      applicantName: "DEMO_Aanvrager B. Test",
      applicantId: "9999002",
      nationality: "SUR",
      applicationType: "specifiek",
      purpose: "landbouw",
      district: "MAR",
      documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
      documentsMissing: [],
      blockers: [
        "Aanvraag ligt binnen traditioneel woon- en leefgebied DEMO_Galibi (CT-001)",
      ],
      fpicRequired: true,
      fpicCommunityId: "COM-001",
      envReviewRequired: false,
    },
  },
  {
    label: "Scenario C — Beschermd gebied + MEA",
    description: "Aanvraag in DEMO_Natuurreservaat zonder MER-status",
    badge: "NMA",
    application: {
      applicantName: "DEMO_AgroIndustrie N.V.",
      applicantId: "KVK-50099999",
      nationality: "rechtspersoon_SUR",
      applicationType: "specifiek",
      purpose: "industrie",
      district: "SIP",
      documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart", "kvk_uittreksel"],
      documentsMissing: [],
      blockers: [
        "Aanvraag overlapt voor 100% met beschermd gebied DEMO_Natuurreservaat Marowijne-Oost",
        "MEA-plicht gedetecteerd; MER-status ontbreekt",
        "NMA-review verplicht",
      ],
      fpicRequired: false,
      envReviewRequired: true,
    },
  },
  {
    label: "Scenario D — Incompleet dossier",
    description: "Specifieke aanvraag mist nationaliteitsverklaring + figuratieve kaart",
    badge: "incompleet",
    application: {
      applicantName: "DEMO_Aanvrager D. Mist",
      applicantId: "9999004",
      nationality: "SUR",
      applicationType: "specifiek",
      purpose: "bebouwing_bewoning",
      district: "PAR",
      documentsProvided: ["id_kopie"],
      documentsMissing: ["nationaliteitsverklaring", "figuratieve_kaart"],
      blockers: [],
      fpicRequired: false,
      envReviewRequired: false,
    },
  },
];

type Phase = "input" | "submitting" | "result";

export default function NieuweAanvraag() {
  const [phase, setPhase] = useState<Phase>("input");
  const [scenarioIdx, setScenarioIdx] = useState<number>(1); // start met B (meest dramatisch)
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [progressStep, setProgressStep] = useState(0);

  const submit = async () => {
    setPhase("submitting");
    setProgressStep(0);

    // Toon de stappen één voor één — dit is theatraal expres
    const steps = [
      "Schemavalidatie (Besluit GLIS 2025)…",
      "Documentcontrole…",
      "Geometrie laden in PostGIS…",
      "Overlap-check tegen percelen, ITP, concessies, beschermd…",
      "Risicoscore berekenen…",
      "Adviesregels evalueren…",
      "Adviesrapport genereren…",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 220));
      setProgressStep(i + 1);
    }

    const sc = SCENARIOS[scenarioIdx];
    const app: Application = {
      id: "APP-DEMO-LIVE",
      caseNumber: "DG-2026-0099",
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "documentcontrole",
      riskScore: 0,
      riskLevel: "laag",
      geometryRef: "AG-LIVE",
      ...sc.application,
    } as Application;

    // Score wordt door de motor zelf berekend; voor display herevaluëren we
    const advice = generateAdvice(app);
    app.riskScore = advice.riskScore;
    app.riskLevel = advice.riskLevel;
    if (advice.blockers.length > 0) app.status = "geblokkeerd";

    setSubmittedApp(app);
    await new Promise(r => setTimeout(r, 250));
    setPhase("result");
  };

  if (phase === "result" && submittedApp) {
    return <ResultView application={submittedApp} onReset={() => { setPhase("input"); setSubmittedApp(null); }} />;
  }

  if (phase === "submitting") {
    return <SubmittingView step={progressStep} />;
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <Link href="/aanvragen" className="inline-flex items-center gap-1.5 text-xs text-sr-ink-500 hover:text-sr-green-700 mb-3">
        <ArrowLeft className="size-3.5" /> Aanvragen
      </Link>

      <PageHeader
        eyebrow="Demo-flow — adviesmotor live"
        title="Nieuwe domeingrondaanvraag indienen"
        description="Kies een testscenario en zie hoe de adviesmotor binnen seconden conflicten detecteert, FPIC of NMA-review oproept en een gestructureerd advies levert."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario-keuze */}
        <div className="lg:col-span-1 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-sr-ink-500 mb-2">
            Kies testscenario
          </div>
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => setScenarioIdx(i)}
              className={cn(
                "block w-full text-left sr-card sr-tile p-3.5",
                scenarioIdx === i && "border-sr-green-700 ring-2 ring-sr-green-100",
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "size-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                  scenarioIdx === i ? "bg-sr-green-700 text-white" : "bg-sr-ink-100 text-sr-ink-700",
                )}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="font-medium text-sm text-sr-ink-900">{s.label.split(" — ")[1]}</span>
                {s.badge && (
                  <Badge variant={
                    s.badge === "groen" ? "green" :
                    s.badge === "FPIC" ? "status-fpic" :
                    s.badge === "NMA" ? "gold" : "neutral"
                  } className="ml-auto">{s.badge}</Badge>
                )}
              </div>
              <div className="text-xs text-sr-ink-500">{s.description}</div>
            </button>
          ))}
        </div>

        {/* Aanvraagformulier (deels read-only voor demo) */}
        <div className="lg:col-span-2 sr-card p-5">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-sr-line">
            <FileUp className="size-4 text-sr-green-700" />
            <h3 className="font-semibold text-sr-ink-900">Aanvraagformulier — Decreet Uitgifte Domeingrond</h3>
            <Badge variant="green" className="ml-auto">Scenario {String.fromCharCode(65 + scenarioIdx)}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <Field label="Aanvragerstype" value={SCENARIOS[scenarioIdx].application.nationality?.startsWith("rechts") ? "Rechtspersoon" : "Natuurlijke persoon"} />
            <Field label="Naam aanvrager" value={SCENARIOS[scenarioIdx].application.applicantName!} />
            <Field label="ID-nummer" value={SCENARIOS[scenarioIdx].application.applicantId!} mono />
            <Field label="Nationaliteit" value={SCENARIOS[scenarioIdx].application.nationality!} />
            <Field label="Aanvraagtype" value={SCENARIOS[scenarioIdx].application.applicationType!} />
            <Field label="Doel" value={SCENARIOS[scenarioIdx].application.purpose!.replace(/_/g, " ")} />
            <Field label="District" value={districts.find(d => d.id === SCENARIOS[scenarioIdx].application.district as DistrictId)?.name ?? "-"} />
            <Field label="PERCEELSID (indien bekend)" value="-" mono muted />
          </div>

          <div className="border-t border-sr-line pt-4 mb-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sr-ink-500 mb-2">
              Documenten ({SCENARIOS[scenarioIdx].application.documentsProvided?.length ?? 0} aangeleverd)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: "nationaliteitsverklaring", l: "Nationaliteitsverklaring" },
                { k: "id_kopie",                 l: "ID-kopie" },
                { k: "figuratieve_kaart",        l: "Figuratieve kaart" },
                { k: "kvk_uittreksel",           l: "KvK-uittreksel" },
              ].map(d => {
                const present = SCENARIOS[scenarioIdx].application.documentsProvided?.includes(d.k);
                return (
                  <div key={d.k} className={cn(
                    "flex items-center gap-2 px-2.5 py-1.5 rounded text-xs",
                    present ? "bg-sr-green-50 text-sr-green-900" : "bg-sr-ink-100/50 text-sr-ink-500",
                  )}>
                    {present
                      ? <CheckCircle2 className="size-3.5 text-sr-green-700" />
                      : <span className="size-3.5 rounded-full border border-sr-ink-300" />}
                    <span>{d.l}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-sr-line pt-4 mb-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sr-ink-500 mb-2 flex items-center gap-2">
              <MapPin className="size-3" />
              Geografische ligging
            </div>
            <div className="h-44 sr-card p-0 overflow-hidden">
              <SgdpMap
                layers={["outline", "customary", "concessions", "protected", "communities"]}
                className="w-full h-full"
              />
            </div>
            <div className="text-[11px] text-sr-ink-500 mt-1.5">
              Aanvraaglocatie wordt getekend door indiener of automatisch ingelezen uit figuratieve kaart.
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-sr-green-700 hover:bg-sr-green-800 text-white text-sm font-semibold rounded-md shadow-sm transition-colors"
          >
            <Send className="size-4" />
            Indienen — start adviesmotor
          </button>

          <div className="mt-3 text-[11px] text-sr-ink-500 flex items-start gap-1.5">
            <Sparkles className="size-3 text-sr-gold-600 shrink-0 mt-0.5" />
            <span>Bij indiening voert het systeem schemavalidatie, overlap-check, risicoscore en regelmotor uit. Resultaat in &lt; 3 sec.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono, muted }: { label: string; value: string; mono?: boolean; muted?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-0.5">{label}</div>
      <div className={cn(
        "text-sm border border-sr-line bg-sr-cream rounded px-2.5 py-1.5",
        mono && "font-mono",
        muted && "text-sr-ink-500 italic",
      )}>
        {value}
      </div>
    </div>
  );
}

const STEP_LABELS = [
  "Schemavalidatie (Besluit GLIS 2025)",
  "Documentcontrole",
  "Geometrie laden in PostGIS",
  "Overlap-check tegen percelen, ITP, concessies, beschermd",
  "Risicoscore berekenen",
  "Adviesregels evalueren",
  "Adviesrapport genereren",
];

function SubmittingView({ step }: { step: number }) {
  return (
    <div className="p-6 min-h-[60vh] flex items-center justify-center">
      <div className="sr-card p-8 max-w-xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-full bg-sr-green-100 flex items-center justify-center">
            <Loader2 className="size-6 text-sr-green-700 animate-spin" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-sr-green-700">
              Adviesmotor draait
            </div>
            <h2 className="text-lg font-semibold text-sr-ink-900">
              Aanvraag wordt geanalyseerd
            </h2>
          </div>
        </div>

        <div className="space-y-2.5">
          {STEP_LABELS.map((label, i) => {
            const done = step > i;
            const active = step === i;
            return (
              <div key={i} className={cn(
                "flex items-center gap-3 transition-opacity",
                step >= i ? "opacity-100" : "opacity-30",
              )}>
                <div className={cn(
                  "size-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold",
                  done ? "bg-sr-green-700 text-white" :
                  active ? "bg-sr-gold-500 text-sr-ink-900" :
                  "bg-sr-ink-100 text-sr-ink-500",
                )}>
                  {done ? <CheckCircle2 className="size-3.5" /> : i + 1}
                </div>
                <span className={cn(
                  "text-sm",
                  done ? "text-sr-ink-700 line-through" :
                  active ? "text-sr-ink-900 font-medium" :
                  "text-sr-ink-500",
                )}>
                  {label}
                </span>
                {active && <Loader2 className="size-3.5 text-sr-gold-600 animate-spin ml-auto" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultView({ application, onReset }: { application: Application; onReset: () => void }) {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <button onClick={onReset} className="inline-flex items-center gap-1.5 text-xs text-sr-ink-500 hover:text-sr-green-700">
          <ArrowLeft className="size-3.5" /> Andere scenario testen
        </button>
      </div>

      <div className="sr-card-emphasis p-4 mb-6 flex items-center gap-3">
        <div className="size-10 rounded-full bg-sr-green-700 text-white flex items-center justify-center">
          <Sparkles className="size-5" />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-sr-green-700">
            Adviesmotor klaar — {application.caseNumber} aangemaakt
          </div>
          <h1 className="text-lg font-semibold text-sr-ink-900">
            Resultaat van regelevaluatie en conflictanalyse
          </h1>
        </div>
        <Badge variant="green">DEMO live-resultaat</Badge>
      </div>

      <div className="sr-card p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <Info label="Zaaknummer" value={application.caseNumber} mono />
        <Info label="Indiener" value={application.applicantName} />
        <Info label="Doel" value={application.purpose.replace(/_/g, " ")} />
        <Info label="District" value={districts.find(d => d.id === application.district)?.name ?? "-"} />
      </div>

      <AdviceReportPanel application={application} />

      {application.fpicRequired && application.fpicCommunityId && (
        <div className="mt-6 sr-card p-5 bg-sr-gold-100/30 border-sr-gold-600/40">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="size-5 text-sr-gold-700" />
            <h3 className="font-semibold text-sr-ink-900">Vervolg: FPIC-procedure starten</h3>
          </div>
          <div className="text-sm text-sr-ink-700 mb-3">
            Dit dossier raakt het traditioneel woon- en leefgebied van <strong>{communities.find(c => c.id === application.fpicCommunityId)?.name}</strong>. Voordat besluitvorming kan plaatsvinden moet de werkstroom Consultatie & FPIC een traject starten.
          </div>
          <Link
            href="/fpic"
            className="inline-flex items-center gap-2 px-3 py-2 bg-sr-gold-600 hover:bg-sr-gold-700 text-white text-sm font-medium rounded-md"
          >
            Open FPIC-module →
          </Link>
        </div>
      )}
    </div>
  );
}

function Info({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">{label}</div>
      <div className={cn("text-sm text-sr-ink-900", mono && "font-mono font-semibold")}>{value}</div>
    </div>
  );
}
