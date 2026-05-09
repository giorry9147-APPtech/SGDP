import Link from "next/link";
import { FolderOpen, ChevronRight, FileText } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge, riskVariant, riskLabel } from "@/components/ui/badge";
import { applications, districts, fpicProcesses } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function DossiersPage() {
  const grouped = districts.map(d => ({
    district: d,
    cases: applications.filter(a => a.district === d.id),
  }));

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 5 — Dossierbeheer"
        title="Dossiers per district"
        description="Per zaak: aanvraag, kaart, identiteit, documenten, correspondentie, besluiten, FPIC-koppeling, audit trail."
      />

      <div className="space-y-6">
        {grouped.map(({ district, cases }) => (
          <div key={district.id} className="sr-card p-5">
            <SectionHeader
              icon={FolderOpen}
              title={district.name}
              description={`${cases.length} dossier${cases.length === 1 ? "" : "s"} in dit district`}
              action={<Badge variant="green">{cases.filter(c => c.status === "geblokkeerd").length} geblokkeerd</Badge>}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cases.map(c => {
                const fpic = fpicProcesses.find(p => p.caseId === c.id);
                return (
                  <Link key={c.id} href={`/aanvragen/${c.id}`} className="sr-card sr-tile p-3.5 block">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="size-3.5 text-sr-green-700 shrink-0" />
                      <span className="font-mono text-xs font-semibold text-sr-ink-900">{c.caseNumber}</span>
                      <Badge variant={riskVariant(c.riskLevel)} className="ml-auto">{riskLabel(c.riskLevel)}</Badge>
                    </div>
                    <div className="text-sm font-medium text-sr-ink-900 leading-tight mb-0.5 truncate">{c.applicantName}</div>
                    <div className="text-xs text-sr-ink-500 mb-2">{c.purpose.replace(/_/g, " ")} · {formatDate(c.submittedAt)}</div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant={
                        c.status === "geblokkeerd" ? "status-blocked" :
                        c.status === "incompleet" ? "status-fpic" : "status-pending"
                      } className="text-[10px]">{c.status.replace(/_/g, " ")}</Badge>
                      {fpic && <Badge variant="status-fpic" className="text-[10px]">FPIC</Badge>}
                      <ChevronRight className="size-3 text-sr-ink-300 ml-auto" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
