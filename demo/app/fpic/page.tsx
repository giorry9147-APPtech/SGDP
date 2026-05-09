import Link from "next/link";
import { Users, Crown, MapPin, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { fpicProcesses, communities, applications } from "@/lib/demo-data";
import { cn, formatDate } from "@/lib/utils";

const STATUS_VARIANT: Record<string, { label: string; tone: "neutral" | "fpic" | "active" | "blocked" }> = {
  niet_gestart:                { label: "Niet gestart",             tone: "neutral" },
  identificatie_gezag:         { label: "Identificatie gezag",      tone: "fpic" },
  informatie_verstrekt:        { label: "Informatie verstrekt",     tone: "fpic" },
  consultatie_lopend:          { label: "Consultatie lopend",       tone: "fpic" },
  instemming:                  { label: "Instemming",               tone: "active" },
  voorwaardelijke_instemming:  { label: "Voorwaardelijke instemming", tone: "active" },
  bezwaar:                     { label: "Bezwaar",                  tone: "blocked" },
  ingetrokken:                 { label: "Ingetrokken",              tone: "blocked" },
  heropening_vereist:          { label: "Heropening vereist",       tone: "fpic" },
};

const STATUS_FLOW: Array<keyof typeof STATUS_VARIANT> = [
  "niet_gestart",
  "identificatie_gezag",
  "informatie_verstrekt",
  "consultatie_lopend",
  "instemming",
];

export default function FpicPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 2 — Free, Prior, Informed Consent"
        title="FPIC-trajecten met Inheemse en Tribale gemeenschappen"
        description="Consultatie en consent zijn eersterangs objecten. Volledig audit trail; consent kan voorwaardelijk of ingetrokken zijn (UNDRIP / IACHR Saramaka & Kaliña-Lokono)."
        action={
          <Badge variant="green" className="text-xs">
            <ShieldCheck className="size-3" /> {fpicProcesses.length} trajecten · {communities.length} gemeenschappen
          </Badge>
        }
      />

      {/* FPIC-statussen overzicht */}
      <div className="sr-card p-5 mb-6">
        <SectionHeader
          icon={Users}
          title="Lopende FPIC-trajecten"
          description="Status per gemeenschap en aanvraag."
        />

        <div className="space-y-3">
          {fpicProcesses.map((p) => {
            const community = communities.find(c => c.id === p.communityId);
            const application = applications.find(a => a.id === p.caseId);
            const statusInfo = STATUS_VARIANT[p.status];

            return (
              <Link
                key={p.id}
                href={`/fpic/${p.id}`}
                className="block sr-card sr-tile p-4 hover:border-sr-gold-600"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-md bg-sr-gold-100 border border-sr-gold-600/30 flex items-center justify-center shrink-0">
                    <Users className="size-5 text-sr-gold-700" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-semibold text-sr-ink-900">{community?.name}</span>
                      <Badge variant="neutral" className="text-[10px]">{community?.peopleGroup === "inheems" ? "Inheems" : "Marron"}</Badge>
                      <Badge
                        variant={
                          statusInfo.tone === "active" ? "status-active" :
                          statusInfo.tone === "blocked" ? "status-blocked" :
                          statusInfo.tone === "fpic" ? "status-fpic" : "neutral"
                        }
                      >
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div className="text-xs text-sr-ink-500 mb-2">
                      {community?.traditionalAuthority.granman && (
                        <span><Crown className="inline size-3 mr-1 -mt-0.5 text-sr-gold-700" />{community.traditionalAuthority.granman}</span>
                      )}
                      {community?.traditionalAuthority.granman && " · "}
                      <span>{community?.traditionalAuthority.kapiteins.length ?? 0} kapiteins</span>
                      {" · "}
                      <span>{community?.populationEstimate.toLocaleString("nl-NL")} bewoners</span>
                      {" · "}
                      <span>{community?.primaryLanguage}</span>
                    </div>

                    {application ? (
                      <div className="text-xs text-sr-ink-700">
                        Gekoppeld aan zaak <span className="font-mono font-semibold">{application.caseNumber}</span> — {application.applicantName}
                      </div>
                    ) : (
                      <div className="text-xs text-sr-ink-500 italic">Historisch traject (afgesloten zaak)</div>
                    )}

                    {/* Status flow */}
                    <div className="mt-3 flex items-center gap-1 overflow-x-auto sr-scrollbar -mx-1 px-1">
                      {STATUS_FLOW.map((s, i) => {
                        const reached = STATUS_FLOW.indexOf(p.status as keyof typeof STATUS_VARIANT) >= i;
                        return (
                          <div key={s} className="flex items-center shrink-0">
                            <div className={cn(
                              "size-2 rounded-full",
                              reached ? "bg-sr-gold-600" : "bg-sr-ink-100",
                            )} />
                            {i < STATUS_FLOW.length - 1 && (
                              <div className={cn(
                                "h-0.5 w-6",
                                reached && STATUS_FLOW.indexOf(p.status as keyof typeof STATUS_VARIANT) > i ? "bg-sr-gold-600" : "bg-sr-ink-100",
                              )} />
                            )}
                          </div>
                        );
                      })}
                      <span className="text-[10px] text-sr-ink-500 ml-2">
                        {p.events.length} event{p.events.length === 1 ? "" : "s"}
                        {p.lastEventAt && ` · laatste ${formatDate(p.lastEventAt)}`}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="size-4 text-sr-ink-300 shrink-0 mt-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Niet-gestarte FPIC-triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="sr-card p-5 bg-sr-red-50/40 border-sr-red-100">
          <SectionHeader
            icon={AlertCircle}
            title="FPIC-triggers — actie vereist"
            description="Aanvragen waar FPIC nog niet is gestart maar wel verplicht is."
          />
          <div className="space-y-2">
            {applications.filter(a => a.fpicRequired && !fpicProcesses.find(p => p.caseId === a.id && p.status !== "niet_gestart")).map((a) => {
              const c = communities.find(c => c.id === a.fpicCommunityId);
              return (
                <Link key={a.id} href={`/aanvragen/${a.id}`} className="block bg-white border border-sr-red-100 rounded-md p-3 hover:border-sr-red-700">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-sr-red-900">{a.caseNumber}</span>
                    <Badge variant="status-blocked">Blokkerend</Badge>
                  </div>
                  <div className="text-sm text-sr-ink-900">{a.applicantName}</div>
                  <div className="text-xs text-sr-ink-500 mt-0.5">
                    {c?.name} · zaak ligt in traditioneel gebied
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Gemeenschappen overzicht */}
        <div className="sr-card p-5">
          <SectionHeader
            icon={MapPin}
            title="Geregistreerde gemeenschappen"
            description="Inheemse en tribale gemeenschappen met traditioneel gezag in het register."
          />
          <div className="space-y-2">
            {communities.map((c) => (
              <Link key={c.id} href={`/stakeholders/${c.id}`} className="block hover:bg-sr-cream rounded-md p-2">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    "size-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                    c.peopleGroup === "inheems" ? "bg-sr-green-100 text-sr-green-900" : "bg-sr-gold-100 text-sr-gold-700",
                  )}>
                    {c.peopleGroup === "inheems" ? "I" : "M"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-sr-ink-900 truncate">{c.name}</div>
                    <div className="text-[11px] text-sr-ink-500">
                      {c.populationEstimate.toLocaleString("nl-NL")} bewoners · {c.primaryLanguage}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
