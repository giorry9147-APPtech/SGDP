import Link from "next/link";
import {
  AlertTriangle, FileText, Users, Workflow, Map, Target,
  CheckCircle2, Clock, AlertCircle, ChevronRight, TrendingUp, Calendar,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge, riskVariant, riskLabel } from "@/components/ui/badge";
import {
  applications, communities, fpicProcesses, milestones,
  actionItems, decisions, customaryTerritories,
} from "@/lib/demo-data";
import { cn, formatDate, daysBetween } from "@/lib/utils";

export default function ExecutiveDashboard() {
  const openCases = applications.filter(a => !["beschikking", "afgewezen"].includes(a.status)).length;
  const blockedCases = applications.filter(a => a.status === "geblokkeerd").length;
  const fpicRequired = applications.filter(a => a.fpicRequired).length;
  const fpicConsent = fpicProcesses.filter(p => p.status === "instemming" || p.status === "voorwaardelijke_instemming").length;
  const totalCommunities = communities.length;
  const itpInventoried = customaryTerritories.features.length;

  const overdueActions = actionItems.filter(a => a.status === "achterstallig").length;
  const openActions = actionItems.filter(a => a.status === "open" || a.status === "in_uitvoering").length;

  const completedMilestones = milestones.filter(m => m.status === "voltooid").length;
  const totalMilestones = milestones.length;
  const phaseProgress = Math.round((completedMilestones / totalMilestones) * 100);

  const upcomingMilestones = milestones
    .filter(m => m.status !== "voltooid")
    .sort((a, b) => a.targetDate.localeCompare(b.targetDate))
    .slice(0, 4);

  const highRiskCases = applications
    .filter(a => a.riskLevel === "zeer_hoog" || a.riskLevel === "hoog")
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Executive view — Werkarm van het Staatshoofd"
        title="Voortgang Werkgroep Grondenrechten & Decentralisatie"
        description="Real-time overzicht van inventarisatie, conflicten, FPIC-trajecten en mijlpalen op weg naar het tussentijds advies aan de President."
        action={
          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <div className="font-semibold text-sr-ink-900">Tussentijds rapport</div>
              <div className="text-sr-ink-500">deadline 18 mei 2026</div>
            </div>
            <div className="px-3 py-1.5 rounded-md font-semibold text-xs sr-status-fpic">
              <Clock className="inline size-3.5 mr-1 -mt-0.5" />
              10 dagen
            </div>
          </div>
        }
      />

      {/* Fase-progress strip */}
      <div className="sr-card-emphasis p-4 mb-6">
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-sr-green-700" />
            <span className="text-sm font-semibold text-sr-ink-900">Voortgang totaal</span>
          </div>
          <div className="text-2xl font-bold text-sr-green-900 tabular-nums">{phaseProgress}%</div>
          <span className="text-xs text-sr-ink-500">
            {completedMilestones} van {totalMilestones} mijlpalen voltooid
          </span>
          <div className="ml-auto flex items-center gap-1.5 text-xs">
            <span className="size-2 rounded-full bg-sr-green-700" />
            <span className="text-sr-ink-700">F2 Inventarisatie</span>
            <span className="text-sr-ink-300 mx-1">→</span>
            <span className="size-2 rounded-full bg-sr-gold-500 sr-pulse" />
            <span className="text-sr-ink-700 font-medium">F3 Consultatie & FPIC <span className="text-sr-gold-700">(actief)</span></span>
          </div>
        </div>
        <div className="h-2 bg-sr-ink-100 rounded-full overflow-hidden flex">
          {milestones.map((m) => (
            <div
              key={m.code}
              className={cn(
                "flex-1 border-r border-white last:border-r-0",
                m.status === "voltooid" && "bg-sr-green-700",
                m.status === "in_uitvoering" && "bg-sr-gold-500 sr-pulse",
                m.status === "at_risk" && "bg-sr-red-700",
                m.status === "gepland" && "bg-sr-ink-100",
              )}
              title={`${m.code} — ${m.title}`}
            />
          ))}
        </div>
      </div>

      {/* KPI-tegels */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="ITP-gebieden geïnventariseerd"
          value={`${itpInventoried} / ${totalCommunities}`}
          sub={`${Math.round((itpInventoried / totalCommunities) * 100)}% — uitvoering loopt`}
          icon={Map}
          variant="success"
        />
        <StatCard
          label="Open dossiers"
          value={openCases}
          sub={`${blockedCases} geblokkeerd · ${applications.length - openCases} afgehandeld`}
          icon={FileText}
        />
        <StatCard
          label="FPIC-trajecten"
          value={`${fpicProcesses.length}`}
          sub={`${fpicConsent} (voorwaardelijke) instemming · ${fpicRequired} aanvragen FPIC-plichtig`}
          icon={Users}
          variant="warning"
        />
        <StatCard
          label="Actiepunten open"
          value={openActions}
          sub={overdueActions > 0
            ? <span className="text-sr-red-700 font-medium">{overdueActions} achterstallig</span>
            : "alles op tijd"}
          icon={Workflow}
          variant={overdueActions > 0 ? "danger" : "default"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hoog-risico dossiers */}
        <div className="lg:col-span-2 sr-card p-5">
          <SectionHeader
            icon={AlertTriangle}
            title="Hoog-risico dossiers"
            description="Aanvragen waar de adviesmotor besluit blokkeert of senior review eist."
            action={
              <Link
                href="/aanvragen"
                className="text-xs font-medium text-sr-green-700 hover:text-sr-green-900 inline-flex items-center gap-1"
              >
                Alle aanvragen <ChevronRight className="size-3" />
              </Link>
            }
          />

          <div className="space-y-2">
            {highRiskCases.map((c) => (
              <Link
                key={c.id}
                href={`/aanvragen/${c.id}`}
                className="block sr-card sr-tile p-3.5 hover:border-sr-green-500"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "shrink-0 size-10 rounded-md flex flex-col items-center justify-center text-[10px] font-bold leading-none",
                    c.riskLevel === "zeer_hoog" ? "bg-sr-red-900 text-white" :
                    c.riskLevel === "hoog" ? "bg-sr-red-100 text-sr-red-900 border border-sr-red-700" :
                    "bg-sr-gold-100 text-sr-gold-700 border border-sr-gold-600",
                  )}>
                    <span className="text-base font-bold">{c.riskScore}</span>
                    <span className="text-[8px] opacity-80">/ 100</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-sr-ink-900">{c.caseNumber}</span>
                      <Badge variant={riskVariant(c.riskLevel)}>{riskLabel(c.riskLevel)}</Badge>
                      {c.fpicRequired && <Badge variant="status-fpic">FPIC vereist</Badge>}
                      {c.envReviewRequired && <Badge variant="gold">NMA-review</Badge>}
                    </div>
                    <div className="text-sm text-sr-ink-700 mb-1.5">
                      <span className="font-medium">{c.applicantName}</span>
                      <span className="text-sr-ink-500"> · {c.district}</span>
                      <span className="text-sr-ink-500"> · {c.purpose.replace(/_/g, " ")}</span>
                    </div>
                    {c.blockers.length > 0 && (
                      <div className="text-xs text-sr-red-900 bg-sr-red-50 border border-sr-red-100 rounded px-2 py-1.5">
                        <AlertCircle className="inline size-3 mr-1 -mt-0.5" />
                        {c.blockers[0]}
                        {c.blockers.length > 1 && (
                          <span className="text-sr-ink-500"> · +{c.blockers.length - 1} meer</span>
                        )}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="size-4 text-sr-ink-300 shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mijlpalen + besluitenpunten */}
        <div className="space-y-6">
          <div className="sr-card p-5">
            <SectionHeader
              icon={Calendar}
              title="Komende mijlpalen"
              description="Eerstvolgende deadlines."
            />
            <div className="space-y-2.5">
              {upcomingMilestones.map((m) => {
                const days = daysBetween(m.targetDate);
                return (
                  <div key={m.code} className="flex items-start gap-2.5">
                    <div className={cn(
                      "size-7 rounded-md shrink-0 flex items-center justify-center text-[10px] font-bold",
                      m.status === "at_risk"
                        ? "bg-sr-red-100 text-sr-red-900 border border-sr-red-700"
                        : m.status === "in_uitvoering"
                        ? "bg-sr-gold-100 text-sr-gold-700 border border-sr-gold-600"
                        : "bg-sr-ink-100 text-sr-ink-700 border border-sr-line",
                    )}>
                      {m.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-sr-ink-900 font-medium leading-tight">{m.title}</div>
                      <div className="text-[11px] text-sr-ink-500 mt-0.5 flex items-center gap-2">
                        <span>{formatDate(m.targetDate)}</span>
                        <span className={cn(
                          "font-medium",
                          days < 0 ? "text-sr-red-700" :
                          days <= 7 ? "text-sr-gold-700" :
                          "text-sr-ink-500",
                        )}>
                          {days < 0 ? `${Math.abs(days)}d over deadline` :
                           days === 0 ? "vandaag" :
                           `over ${days} dagen`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sr-card p-5">
            <SectionHeader
              icon={CheckCircle2}
              title="Lopende besluiten"
              description="Besluiten in uitvoering."
            />
            <div className="space-y-2">
              {decisions.filter(d => d.status === "in_uitvoering").slice(0, 3).map((d) => (
                <div key={d.id} className="text-xs border-l-2 border-sr-green-500 pl-2.5 py-0.5">
                  <div className="font-mono text-[10px] text-sr-ink-500">{d.id}</div>
                  <div className="text-sr-ink-900 font-medium leading-tight">{d.title}</div>
                  <div className="text-sr-ink-500 mt-0.5 flex items-center gap-2">
                    <span>Stem {d.vote.for}-{d.vote.against}-{d.vote.abstain}</span>
                    <span>·</span>
                    <span>{formatDate(d.date)}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/werkgroep"
              className="text-xs font-medium text-sr-green-700 hover:text-sr-green-900 inline-flex items-center gap-1 mt-3"
            >
              Werkgroep-werkruimte <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Top-3 risico's */}
      <div className="sr-card p-5 mt-6">
        <SectionHeader
          icon={TrendingUp}
          title="Top-3 strategische risico's"
          description="Voor de werkgroep en de President."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <RiskTile
            severity="high"
            title="Overlap concessie A-12 met DEMO_Galibi"
            description="Goudconcessie CON-001 overlapt met traditioneel woon- en leefgebied CT-001. Juridisch advies in voorbereiding (IACHR Saramaka-toets)."
            action="Memo Misiedjan · deadline 18 mei"
          />
          <RiskTile
            severity="medium"
            title="FPIC-vertraging Diitabiki"
            description="Consultatie loopt; gemeenschap heeft 3 weken reflectieperiode gevraagd. Mijlpaal M3.2 (50% FPIC gestart) at risk voor 21 mei."
            action="Vervolgsessie 23 mei"
          />
          <RiskTile
            severity="medium"
            title="Datatekort historische kaarten"
            description="Voor inventarisatie van CT-002 en CT-003 ontbreken historische kaarten van vóór 1995. Aanvulling via klankbord met VIDS."
            action="Klankbord 21 mei"
          />
        </div>
      </div>
    </div>
  );
}

function RiskTile({
  severity, title, description, action,
}: {
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  action: string;
}) {
  const styles = {
    high:   "border-sr-red-700 bg-sr-red-50",
    medium: "border-sr-gold-600 bg-sr-gold-100/30",
    low:    "border-sr-green-500 bg-sr-green-50",
  } as const;
  const dot = {
    high:   "bg-sr-red-700",
    medium: "bg-sr-gold-600",
    low:    "bg-sr-green-700",
  } as const;

  return (
    <div className={cn("border rounded-md p-3.5", styles[severity])}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className={cn("size-2 rounded-full sr-pulse", dot[severity])} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-700">
          {severity === "high" ? "Hoog risico" : severity === "medium" ? "Middel" : "Laag"}
        </span>
      </div>
      <div className="text-sm font-semibold text-sr-ink-900 mb-1">{title}</div>
      <div className="text-xs text-sr-ink-700 mb-2 leading-relaxed">{description}</div>
      <div className="text-[11px] font-medium text-sr-green-700">→ {action}</div>
    </div>
  );
}
