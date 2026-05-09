import {
  Leaf, ShieldAlert, FlaskConical, ListChecks, MapPin,
  CheckCircle2, AlertTriangle, Workflow, Wrench,
} from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import {
  envCases, contaminatedSites, rehabPlans, nmaReviewers,
  meaActivityMatrix, applications, tenures, protectedAreas,
  type EnvCase,
} from "@/lib/demo-data";
import { cn, formatDate } from "@/lib/utils";

const TRIGGER_LABEL: Record<EnvCase["triggerType"], string> = {
  mea: "MEA-plicht",
  sea: "SEA (overheidsplan)",
  protected_overlap: "Beschermd gebied",
  contaminated_overlap: "Verontreinigd gebied",
  permit_change: "Vergunningwijziging",
  rehab: "Rehabilitatie",
};

const STATUS_LABEL: Record<EnvCase["status"], string> = {
  screening: "Screening",
  mea_required: "MEA vereist",
  mer_in_review: "MER in review",
  approved: "Goedgekeurd",
  conditional: "Voorwaardelijk",
  rejected: "Afgewezen",
  not_required: "Niet vereist",
};

const STATUS_VARIANT: Record<EnvCase["status"], React.ComponentProps<typeof Badge>["variant"]> = {
  screening: "neutral",
  mea_required: "gold",
  mer_in_review: "status-pending",
  approved: "green",
  conditional: "gold",
  rejected: "red",
  not_required: "neutral",
};

export default function MilieuPage() {
  const stats = {
    open: envCases.filter(e => ["screening", "mea_required", "mer_in_review"].includes(e.status)).length,
    blocked: envCases.filter(e => e.status === "mer_in_review" || e.status === "mea_required").length,
    conditional: envCases.filter(e => e.status === "conditional").length,
    contaminated: contaminatedSites.length,
    protected: protectedAreas.features.length,
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 9 — Milieu & NMA"
        title="Milieu Raamwet — NMA-werkstroom"
        description="MEA-screening, MER-review, beschermd gebied-overlaps en rehabilitatie. Hard blocker tot NMA-goedkeuring (doc 17). NMA officieel gelanceerd juli 2024."
        action={
          <Badge variant="green" className="text-xs">
            <Leaf className="size-3" /> NMA-werkarm · Milieu Raamwet
          </Badge>
        }
      />

      {/* KPI's */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Open milieu-zaken"
          value={stats.open}
          sub={`${stats.blocked} blokkeren besluitvorming · ${stats.conditional} voorwaardelijk goedgekeurd`}
          icon={Workflow}
          variant={stats.blocked > 0 ? "warning" : "default"}
        />
        <StatCard
          label="Beschermde gebieden (demo)"
          value={stats.protected}
          sub="Hard blocker R-ENV-010 actief"
          icon={ShieldAlert}
          variant="success"
        />
        <StatCard
          label="Verontreinigde gebieden"
          value={stats.contaminated}
          sub="Nationaal register Milieu Raamwet"
          icon={FlaskConical}
          variant={stats.contaminated > 0 ? "danger" : "default"}
        />
        <StatCard
          label="NMA-reviewers actief"
          value={nmaReviewers.length}
          sub="Met read/write op gemockt EnvCase"
          icon={ListChecks}
        />
      </div>

      {/* Trigger-matrix + MEA-plicht */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="sr-card p-5">
          <SectionHeader
            icon={ListChecks}
            title="MEA-plicht-matrix (5 activiteitstypes)"
            description="Statische demo-matrix; in productie wordt dit een geconfigureerde regelset (doc 17 §17.3)."
          />
          <div className="space-y-2">
            {meaActivityMatrix.map((row) => (
              <div key={row.activity} className="flex items-start gap-3 p-2.5 border-b border-sr-line last:border-b-0">
                <div className={cn(
                  "size-7 shrink-0 rounded-md flex items-center justify-center text-[10px] font-bold",
                  row.meaRequired ? "bg-sr-red-100 text-sr-red-900 border border-sr-red-700" :
                  "bg-sr-green-100 text-sr-green-900 border border-sr-green-500",
                )}>
                  {row.meaRequired ? "MEA" : "n.v.t."}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-sr-ink-900">{row.activity}</div>
                  <div className="text-[11px] text-sr-ink-500 mt-0.5">{row.threshold}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sr-card p-5">
          <SectionHeader
            icon={Workflow}
            title="MEA / SEA / MER-werkflow"
            description="Bij MEA-plicht: screening → scoping → MER → NMA-besluit → voorwaarden in beschikking."
          />
          <ol className="space-y-2.5 text-sm">
            {[
              { n: 1, text: "Screening — bepaal MEA-plicht via regelmatrix" },
              { n: 2, text: "Indien MEA-plichtig: ScopingDocument vereist" },
              { n: 3, text: "MER opstellen — opdrachtnemer levert; NMA reviewt" },
              { n: 4, text: "NMA-besluit: goedgekeurd / voorwaardelijk / afgewezen" },
              { n: 5, text: "Voorwaarden opnemen als beschikkingsvoorwaarden" },
              { n: 6, text: "Monitoring — periodieke compliance-checks" },
              { n: 7, text: "Bij scope-wijziging: heropen MEA-spoor" },
            ].map(s => (
              <li key={s.n} className="flex items-start gap-2.5">
                <span className="size-6 shrink-0 rounded-full bg-sr-green-100 text-sr-green-900 text-[11px] font-bold flex items-center justify-center">
                  {s.n}
                </span>
                <span className="text-sr-ink-700 leading-relaxed">{s.text}</span>
              </li>
            ))}
          </ol>
          <div className="sr-card-emphasis p-2.5 mt-4 text-[11px] text-sr-ink-700 flex items-start gap-1.5">
            <AlertTriangle className="size-3.5 text-sr-gold-700 shrink-0 mt-0.5" />
            <span>
              Activiteit met MEA-plicht <strong>mag niet starten</strong> vóór goedgekeurd MER (Milieu Raamwet).
            </span>
          </div>
        </div>
      </div>

      {/* EnvCases */}
      <div className="sr-card p-5 mb-6">
        <SectionHeader
          icon={Leaf}
          title="Milieu-zaken (EnvCase)"
          description="Eigenstandige werkstroom, gekoppeld aan een aanvraag of een bestaande grondhuur. NMA-reviewer beslist op de milieutoets."
          action={<Badge variant="neutral" className="text-[10px]">{envCases.length} zaken</Badge>}
        />

        <div className="space-y-3">
          {envCases.map(e => {
            const linkedApp = e.linkedCaseId ? applications.find(a => a.id === e.linkedCaseId) : undefined;
            const linkedTenure = e.linkedTenureId ? tenures.find(t => t.id === e.linkedTenureId) : undefined;
            const reviewer = nmaReviewers.find(r => r.id === e.nmaReviewerId);
            const isBlocking = ["screening", "mea_required", "mer_in_review"].includes(e.status);

            return (
              <div key={e.id} className={cn(
                "sr-card p-4",
                isBlocking && "border-l-4 border-l-sr-red-700",
                e.status === "approved" && "border-l-4 border-l-sr-green-700",
                e.status === "conditional" && "border-l-4 border-l-sr-gold-600",
              )}>
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-sr-ink-900">{e.id}</span>
                      <Badge variant={STATUS_VARIANT[e.status]} className="text-[10px]">{STATUS_LABEL[e.status]}</Badge>
                      <Badge variant="outline" className="text-[10px]">{TRIGGER_LABEL[e.triggerType]}</Badge>
                      {reviewer && (
                        <Badge variant="green" className="text-[10px]">
                          <Wrench className="size-2.5" /> {reviewer.name.replace("DEMO_", "")}
                        </Badge>
                      )}
                      <span className="ml-auto text-[10px] text-sr-ink-500">
                        gestart {formatDate(e.startDate)}
                        {e.decisionDate && ` · besluit ${formatDate(e.decisionDate)}`}
                      </span>
                    </div>

                    <div className="text-xs text-sr-ink-700 mb-2">
                      {linkedApp && (
                        <Link href={`/aanvragen/${linkedApp.id}`} className="text-sr-green-700 hover:text-sr-green-900 underline-offset-2 hover:underline">
                          gekoppeld dossier {linkedApp.caseNumber} — {linkedApp.applicantName}
                        </Link>
                      )}
                      {linkedTenure && (
                        <Link href="/grondhuur" className="text-sr-green-700 hover:text-sr-green-900 underline-offset-2 hover:underline">
                          gekoppelde grondhuur {linkedTenure.id} — {linkedTenure.holderName} ({linkedTenure.perceelsid})
                        </Link>
                      )}
                    </div>

                    <div className="text-sm text-sr-ink-900 mb-2 leading-relaxed">{e.notes}</div>

                    {e.conditions && e.conditions.length > 0 && (
                      <div className="bg-sr-gold-100/30 border border-sr-gold-600/40 rounded p-2.5 space-y-1 mt-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-sr-gold-700">voorwaarden</div>
                        {e.conditions.map((c, i) => (
                          <div key={i} className="text-xs text-sr-ink-700 flex gap-1.5">
                            <CheckCircle2 className="size-3 text-sr-gold-700 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {e.evidence.length > 0 && (
                      <details className="text-xs mt-2">
                        <summary className="cursor-pointer text-sr-green-700 hover:text-sr-green-900 font-medium">
                          Bewijsstukken ({e.evidence.length})
                        </summary>
                        <ul className="mt-1.5 space-y-0.5 pl-2">
                          {e.evidence.map((ev, i) => (
                            <li key={i} className="text-sr-ink-700">📄 {ev}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verontreinigde gebieden + rehabilitatie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="sr-card p-5">
          <SectionHeader
            icon={FlaskConical}
            title="Nationaal register verontreinigde gebieden"
            description="Milieu Raamwet — register met hash-keten audit; rehabilitatieplicht bij sanering."
          />
          <div className="space-y-2">
            {contaminatedSites.map(s => (
              <div key={s.id} className="sr-card p-3.5">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <MapPin className="size-3.5 text-sr-red-700 shrink-0" />
                  <span className="font-mono text-[10px] font-semibold text-sr-ink-900">{s.id}</span>
                  <Badge variant={
                    s.severity === "hoog" ? "red" :
                    s.severity === "middel" ? "gold" : "neutral"
                  } className="text-[10px]">{s.severity}</Badge>
                  <Badge variant="outline" className="text-[10px]">{s.contaminationType}</Badge>
                  <Badge variant="status-pending" className="text-[10px] ml-auto">{s.rehabStatus.replace(/_/g, " ")}</Badge>
                </div>
                <div className="text-sm font-medium text-sr-ink-900">{s.name}</div>
                <div className="text-[11px] text-sr-ink-500 mt-0.5">
                  Opgenomen in register {formatDate(s.listedAt)} · {s.district}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sr-card p-5">
          <SectionHeader
            icon={Wrench}
            title="Rehabilitatieplannen"
            description="IACHR Kaliña-Lokono-verplichting + permit-conditions; mijlpalen + verantwoordelijke partij."
          />
          <div className="space-y-3">
            {rehabPlans.map(p => {
              const done = p.milestones.filter(m => m.status === "voltooid").length;
              const total = p.milestones.length;
              const pct = Math.round((done / total) * 100);
              return (
                <div key={p.id} className="sr-card p-3.5">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="font-mono text-[10px] font-semibold text-sr-ink-900">{p.id}</span>
                    <Badge variant="gold" className="text-[10px]">{p.trigger.replace(/_/g, " ")}</Badge>
                    <span className="ml-auto text-[10px] text-sr-ink-500 tabular-nums">{done}/{total} mijlpalen</span>
                  </div>
                  <div className="h-1.5 bg-sr-ink-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-sr-green-600" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs text-sr-ink-700 mb-1.5">
                    <strong>Verantwoordelijk:</strong> {p.responsibleParty}
                  </div>
                  <div className="text-[11px] text-sr-ink-500 mb-2"><strong className="text-sr-ink-700">Financiering:</strong> {p.funding}</div>

                  <details className="text-xs">
                    <summary className="cursor-pointer text-sr-green-700 hover:text-sr-green-900 font-medium">
                      Mijlpalen ({total})
                    </summary>
                    <ul className="mt-1.5 space-y-1">
                      {p.milestones.map((m, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={cn(
                            "size-2 rounded-full shrink-0 mt-1.5",
                            m.status === "voltooid" && "bg-sr-green-700",
                            m.status === "in_uitvoering" && "bg-sr-gold-500 sr-pulse",
                            m.status === "gepland" && "bg-sr-ink-300",
                          )} />
                          <div className="flex-1">
                            <div className="text-sr-ink-900">{m.description}</div>
                            <div className="text-[10px] text-sr-ink-500 font-mono">{m.date}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* NMA-reviewer-rol + autorisatie */}
      <div className="sr-card-emphasis p-4 mt-6 text-xs text-sr-ink-700">
        <div className="flex items-start gap-2">
          <Leaf className="size-4 text-sr-green-700 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sr-ink-900 mb-1">NMA-reviewer-rol (RBAC + ABAC)</div>
            <p className="leading-relaxed">
              Kan lezen: geometrie, MEA/SEA/MER-info, beschermde gebieden, vergunningenregister, gekoppelde dossiers.
              Kan schrijven: milieu-advies, voorwaarden, status <code className="bg-sr-ink-100 px-1 rounded text-[10px]">EnvCase</code>.
              Kan beslissen: goedkeuring / afwijzing / voorwaarden op milieutoets.
              <strong> Niet zichtbaar:</strong> FPIC-restricted documenten (tenzij expliciet gedeeld).
              Zie [doc 17 §17.5](../../../docs/17-milieu-nma.md#175-nma-reviewer-rol-rbac--abac).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
