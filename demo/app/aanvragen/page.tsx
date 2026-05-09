"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Filter, Plus, AlertCircle, ChevronRight, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/section-header";
import { Badge, riskVariant, riskLabel } from "@/components/ui/badge";
import { applications, districts, type Application } from "@/lib/demo-data";
import { cn, formatDate } from "@/lib/utils";

const statusLabels: Record<Application["status"], string> = {
  ontvangen: "Ontvangen",
  documentcontrole: "Documentcontrole",
  incompleet: "Incompleet",
  in_onderzoek: "In onderzoek",
  landmetercontrole: "Landmetercontrole",
  bezwaarperiode: "Bezwaarperiode",
  juridisch_advies: "Juridisch advies",
  besluit: "Besluit genomen",
  beschikking: "Beschikking",
  afgewezen: "Afgewezen",
  geblokkeerd: "Geblokkeerd",
};

export default function AanvragenPage() {
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState<string>("");
  const [riskFilter, setRiskFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const filtered = applications.filter((a) => {
    if (search && !`${a.caseNumber} ${a.applicantName}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (districtFilter && a.district !== districtFilter) return false;
    if (riskFilter && a.riskLevel !== riskFilter) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 1 — Domeingrond-aanvragen"
        title="Aanvragen & Adviesmotor"
        description="Real-time conflict-detectie en regelgebaseerd advies bij elke aanvraag. Dossiers volgen Decreet Uitgifte Domeingrond + Besluit GLIS 2025."
        action={
          <Link
            href="/aanvragen/nieuw"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sr-green-700 hover:bg-sr-green-800 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
          >
            <Plus className="size-4" />
            Nieuwe aanvraag indienen
          </Link>
        }
      />

      {/* Filterbalk */}
      <div className="sr-card p-4 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="size-4 text-sr-ink-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-sr-ink-500">Filteren</span>
          <span className="text-xs text-sr-ink-500 ml-auto">
            <strong className="text-sr-ink-900">{filtered.length}</strong> van {applications.length} aanvragen
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-sr-ink-300" />
            <input
              type="text"
              placeholder="Zoek op zaaknummer of indiener…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-sr-line rounded-md bg-white focus:outline-none focus:border-sr-green-500"
            />
          </div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-sr-line rounded-md bg-white focus:outline-none focus:border-sr-green-500"
          >
            <option value="">Alle districten</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-sr-line rounded-md bg-white focus:outline-none focus:border-sr-green-500"
          >
            <option value="">Alle risiconiveaus</option>
            <option value="laag">Laag</option>
            <option value="middel">Middel</option>
            <option value="hoog">Hoog</option>
            <option value="zeer_hoog">Zeer hoog</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-sr-line rounded-md bg-white focus:outline-none focus:border-sr-green-500"
          >
            <option value="">Alle statussen</option>
            {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Lijst */}
      <div className="sr-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sr-green-50 text-sr-ink-700">
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider">
              <th className="px-4 py-3 w-32">Zaak</th>
              <th className="px-4 py-3">Indiener / Doel</th>
              <th className="px-4 py-3 w-32">District</th>
              <th className="px-4 py-3 w-40">Status</th>
              <th className="px-4 py-3 w-28">Risico</th>
              <th className="px-4 py-3 w-32">Ingediend</th>
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.id}
                className="border-t border-sr-line hover:bg-sr-green-50/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link href={`/aanvragen/${a.id}`} className="font-mono text-xs font-semibold text-sr-green-900 hover:text-sr-green-700">
                    {a.caseNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/aanvragen/${a.id}`} className="block">
                    <div className="font-medium text-sr-ink-900 leading-tight">{a.applicantName}</div>
                    <div className="text-xs text-sr-ink-500">{a.purpose.replace(/_/g, " ")} · {a.applicationType}</div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-xs text-sr-ink-700">
                  {districts.find(d => d.id === a.district)?.name}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={
                    a.status === "geblokkeerd" ? "status-blocked" :
                    a.status === "incompleet" ? "status-fpic" :
                    a.status === "beschikking" ? "status-active" : "status-pending"
                  }>
                    {statusLabels[a.status]}
                  </Badge>
                  {a.fpicRequired && (
                    <Badge variant="status-fpic" className="ml-1">FPIC</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "shrink-0 size-8 rounded flex items-center justify-center text-[11px] font-bold",
                      a.riskLevel === "zeer_hoog" ? "bg-sr-red-900 text-white" :
                      a.riskLevel === "hoog" ? "bg-sr-red-100 text-sr-red-900 border border-sr-red-700" :
                      a.riskLevel === "middel" ? "bg-sr-gold-100 text-sr-gold-700 border border-sr-gold-600" :
                      "bg-sr-green-100 text-sr-green-900 border border-sr-green-500",
                    )}>
                      {a.riskScore}
                    </div>
                    <Badge variant={riskVariant(a.riskLevel)}>{riskLabel(a.riskLevel)}</Badge>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-sr-ink-500">{formatDate(a.submittedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/aanvragen/${a.id}`} className="text-sr-ink-300 hover:text-sr-green-700">
                    <ChevronRight className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-sr-ink-500">
            <FileText className="size-8 text-sr-ink-300 mx-auto mb-2" />
            Geen aanvragen die aan de filters voldoen.
          </div>
        )}
      </div>

      {/* Snelinfo onderaan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5">
        {(["laag", "middel", "hoog", "zeer_hoog"] as const).map((lvl) => {
          const count = applications.filter(a => a.riskLevel === lvl).length;
          return (
            <button
              key={lvl}
              onClick={() => setRiskFilter(riskFilter === lvl ? "" : lvl)}
              className={cn(
                "sr-card sr-tile p-3 text-left",
                riskFilter === lvl && "border-sr-green-500 bg-sr-green-50",
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={riskVariant(lvl)}>{riskLabel(lvl)}</Badge>
                <span className="ml-auto text-2xl font-bold text-sr-ink-900 tabular-nums">{count}</span>
              </div>
              <div className="text-[11px] text-sr-ink-500">aanvragen op dit risiconiveau</div>
            </button>
          );
        })}
      </div>

      {/* Hint */}
      <div className="sr-card-emphasis mt-5 p-4 flex items-start gap-3">
        <AlertCircle className="size-5 text-sr-green-700 shrink-0 mt-0.5" />
        <div className="text-sm text-sr-ink-700">
          <strong className="text-sr-ink-900">Probeer de demo: </strong>
          klik op <Link href="/aanvragen/nieuw" className="text-sr-green-700 font-medium underline">Nieuwe aanvraag indienen</Link> en zie hoe de adviesmotor binnen seconden conflicten detecteert, FPIC of NMA-review oproept en een gestructureerd advies genereert.
        </div>
      </div>
    </div>
  );
}
