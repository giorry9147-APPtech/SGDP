"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  ArrowLeft, FileText, Map as MapIcon, Calendar, User,
  CheckCircle2, AlertCircle, Users, Download,
} from "lucide-react";
import { applications, communities, districts, fpicProcesses } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { AdviceReportPanel } from "@/components/advice/advice-report";
import { DocumentUpload } from "@/components/forms/document-upload";
import { formatDate, daysBetween, cn } from "@/lib/utils";

const SgdpMap = dynamic(() => import("@/components/map/sgdp-map").then(m => m.SgdpMap), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-sr-green-50 text-xs text-sr-ink-500">Kaart laden…</div>,
});

const requiredDocs = [
  { key: "nationaliteitsverklaring", label: "Nationaliteitsverklaring" },
  { key: "id_kopie",                 label: "ID-kopie" },
  { key: "figuratieve_kaart",        label: "Figuratieve kaart / kaart van uitmeting" },
];

export default function AanvraagDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const application = applications.find(a => a.id === id);
  if (!application) notFound();

  const district = districts.find(d => d.id === application.district);
  const community = application.fpicCommunityId ? communities.find(c => c.id === application.fpicCommunityId) : undefined;
  const fpic = fpicProcesses.find(p => p.caseId === application.id);

  const objectionDays = application.objectionDeadline ? daysBetween(application.objectionDeadline) : null;

  return (
    <div className="p-6 max-w-[1600px] mx-auto sr-print-area">
      {/* Breadcrumb */}
      <Link href="/aanvragen" className="inline-flex items-center gap-1.5 text-xs text-sr-ink-500 hover:text-sr-green-700 mb-3 sr-print-hide">
        <ArrowLeft className="size-3.5" /> Alle aanvragen
      </Link>

      {/* Print-only kop (verschijnt alleen op de PDF/print-output) */}
      <div className="hidden print:block mb-4 pb-3 border-b-2 border-sr-green-700">
        <div className="text-[10pt] font-bold uppercase tracking-wider text-sr-green-900">
          Republiek Suriname — SGDP · Werkarm van het Staatshoofd
        </div>
        <div className="text-[14pt] font-bold text-sr-ink-900 mt-1">
          Adviesrapport — {application.caseNumber}
        </div>
        <div className="text-[9pt] text-sr-ink-500 mt-1">
          Gegenereerd: {new Date().toLocaleString("nl-NL")} · Demo-omgeving · Niet voor besluitvorming
        </div>
      </div>

      {/* Hoofdcard */}
      <div className="sr-card p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm font-bold text-sr-green-900">{application.caseNumber}</span>
              <Badge variant="status-pending">{application.status.replace(/_/g, " ")}</Badge>
              {application.fpicRequired && <Badge variant="status-fpic">FPIC vereist</Badge>}
              {application.envReviewRequired && <Badge variant="gold">NMA-review</Badge>}
            </div>
            <h1 className="text-2xl font-bold text-sr-ink-900 mb-1">
              Domeingrondaanvraag — {application.purpose.replace(/_/g, " ")}
            </h1>
            <div className="text-sm text-sr-ink-500 flex items-center gap-3 flex-wrap">
              <span><User className="inline size-3.5 mr-1 -mt-0.5" />{application.applicantName}</span>
              <span>·</span>
              <span>ID {application.applicantId} · {application.nationality}</span>
              <span>·</span>
              <span>{district?.name}</span>
              <span>·</span>
              <span><Calendar className="inline size-3.5 mr-1 -mt-0.5" />Ingediend {formatDate(application.submittedAt)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { if (typeof window !== "undefined") window.print(); }}
            className="sr-print-hide inline-flex items-center gap-2 px-3 py-2 border border-sr-line bg-white hover:bg-sr-green-50 text-sm font-medium text-sr-ink-700 rounded-md"
            title="Open print-dialoog — kies 'Save as PDF' om als PDF te exporteren"
          >
            <Download className="size-4" /> Adviesrapport (PDF)
          </button>
        </div>

        {/* Workflow stappen */}
        <div className="flex items-center gap-1 overflow-x-auto sr-scrollbar -mx-1 px-1 pt-3 border-t border-sr-line">
          {[
            "ontvangen", "documentcontrole", "in_onderzoek",
            "landmetercontrole", "bezwaarperiode", "juridisch_advies",
            "besluit", "beschikking",
          ].map((step, i, arr) => {
            const reached = arr.indexOf(application.status) >= i;
            const current = application.status === step;
            const blocked = application.status === "geblokkeerd" && i > arr.indexOf("documentcontrole");
            return (
              <div key={step} className="flex items-center shrink-0">
                <div className={cn(
                  "px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider whitespace-nowrap",
                  blocked ? "bg-sr-red-100 text-sr-red-900 border border-sr-red-700" :
                  current ? "bg-sr-green-700 text-white" :
                  reached ? "bg-sr-green-100 text-sr-green-900" :
                            "bg-sr-ink-100 text-sr-ink-500",
                )}>
                  {step.replace(/_/g, " ")}
                </div>
                {i < arr.length - 1 && (
                  <div className={cn(
                    "h-0.5 w-3",
                    reached && !blocked ? "bg-sr-green-500" : "bg-sr-ink-100",
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Adviesmotor — HERO */}
      <AdviceReportPanel application={application} />

      {/* Onderste rij: kaart + dossier-info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Kaart — niet meeprinten (raster tiles + WebGL renderen niet) */}
        <div className="lg:col-span-2 sr-card p-0 overflow-hidden h-[500px] relative sr-print-hide">
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur px-3 py-1.5 rounded-md shadow-sm border border-sr-line text-xs flex items-center gap-2">
            <MapIcon className="size-3.5 text-sr-green-700" />
            <span className="font-medium text-sr-ink-900">Conflictdetectie op kaart</span>
          </div>
          <SgdpMap
            highlightCaseId={application.id}
            layers={["outline", "customary", "concessions", "protected", "applications", "communities"]}
            className="w-full h-full"
          />
        </div>

        {/* Dossier-side */}
        <div className="space-y-4">
          {/* Documenten */}
          <div className="sr-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="size-4 text-sr-green-700" />
              <h3 className="text-sm font-semibold text-sr-ink-900">Documenten</h3>
            </div>
            <div className="space-y-1.5 mb-3">
              {requiredDocs.map((doc) => {
                const present = application.documentsProvided.includes(doc.key);
                return (
                  <div key={doc.key} className={cn(
                    "flex items-center gap-2 text-xs px-2 py-1.5 rounded",
                    present ? "bg-sr-green-50 text-sr-green-900" : "bg-sr-red-50 text-sr-red-900",
                  )}>
                    {present ? <CheckCircle2 className="size-3.5" /> : <AlertCircle className="size-3.5" />}
                    <span className={cn("flex-1", present ? "" : "font-medium")}>{doc.label}</span>
                    <span className="text-[10px] opacity-70">{present ? "aanwezig" : "ontbreekt"}</span>
                  </div>
                );
              })}
            </div>
            <div className="pt-3 border-t border-sr-line sr-print-hide">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1.5">Extra dossier-bijlagen</div>
              <DocumentUpload entityType="case" entityId={application.id} variant="compact" />
            </div>
          </div>

          {/* Bezwaartermijn */}
          {application.publishedAt && application.objectionDeadline && (
            <div className={cn(
              "sr-card p-4",
              objectionDays !== null && objectionDays < 0 && "bg-sr-ink-100/30",
            )}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-4 text-sr-green-700" />
                <h3 className="text-sm font-semibold text-sr-ink-900">Bezwaartermijn (30 dagen)</h3>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-sr-ink-500">Gepubliceerd</span>
                  <span className="text-sr-ink-900">{formatDate(application.publishedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sr-ink-500">Deadline</span>
                  <span className="text-sr-ink-900 font-medium">{formatDate(application.objectionDeadline)}</span>
                </div>
                {objectionDays !== null && (
                  <div className={cn(
                    "mt-2 text-center px-2 py-1.5 rounded font-medium",
                    objectionDays < 0
                      ? "bg-sr-ink-100 text-sr-ink-700"
                      : objectionDays <= 7
                      ? "bg-sr-gold-100 text-sr-gold-700"
                      : "bg-sr-green-100 text-sr-green-900",
                  )}>
                    {objectionDays < 0
                      ? `Verstreken — ${Math.abs(objectionDays)} dagen geleden`
                      : `Nog ${objectionDays} dagen`}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FPIC-status */}
          {community && fpic && (
            <div className="sr-card p-4 bg-sr-gold-100/30 border-sr-gold-600/40">
              <div className="flex items-center gap-2 mb-2">
                <Users className="size-4 text-sr-gold-700" />
                <h3 className="text-sm font-semibold text-sr-ink-900">FPIC-traject</h3>
              </div>
              <div className="text-xs space-y-1.5">
                <div className="text-sr-ink-700">
                  <strong>Gemeenschap:</strong> {community.name}
                </div>
                <div className="text-sr-ink-500">
                  ~{community.populationEstimate.toLocaleString("nl-NL")} bewoners · {community.primaryLanguage}
                </div>
                <Badge variant="status-fpic">{fpic.status.replace(/_/g, " ")}</Badge>
                <Link
                  href={`/fpic/${fpic.id}`}
                  className="block mt-2 text-center text-xs font-medium text-sr-green-700 hover:text-sr-green-900 bg-white border border-sr-green-100 rounded py-1.5"
                >
                  Open FPIC-dossier →
                </Link>
              </div>
            </div>
          )}

          {/* Juridische basis */}
          <div className="sr-card p-4 text-xs">
            <h3 className="text-sm font-semibold text-sr-ink-900 mb-2">Juridische basis</h3>
            <ul className="space-y-1 text-sr-ink-700">
              <li>• Decreet Uitgifte Domeingrond</li>
              <li>• Besluit GLIS 2025 (S.B. 2025 nr. 44)</li>
              <li>• Wet Grondregistratie en LIS (S.B. 2009 nr. 149)</li>
              {application.fpicRequired && <li>• UNDRIP / IACHR Saramaka & Kaliña-Lokono</li>}
              {application.envReviewRequired && <li>• Milieu Raamwet</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Print-only voettekst */}
      <div className="hidden print:block mt-6 pt-3 border-t border-sr-line text-[8pt] text-sr-ink-500 leading-relaxed">
        <div className="flex justify-between gap-4">
          <div>
            <strong className="text-sr-ink-700">SGDP — Werkarm van het Staatshoofd.</strong>{" "}
            Document gegenereerd door de regelgebaseerde adviesmotor (ruleset 1.0.0).
            Wijzigingen aan regels gaan via Pull Request met juridische review.
          </div>
          <div className="text-right shrink-0">
            <div>Pagina <span className="font-mono">{application.caseNumber}</span></div>
            <div>{new Date().toLocaleDateString("nl-NL")}</div>
          </div>
        </div>
        <div className="mt-2 italic">
          ⚠ DEMO-omgeving. Alle data zijn fictief en gelabeld &quot;DEMO_…&quot;. Niet geschikt voor besluitvorming.
        </div>
      </div>
    </div>
  );
}
