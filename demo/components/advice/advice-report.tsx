"use client";

import { generateAdvice, categoryLabel, type AdviceReport } from "@/lib/advice-engine";
import type { Application } from "@/lib/demo-data";
import { Badge, riskVariant, riskLabel } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, FileText, Scale, MapPinned, Users, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS = {
  administratief: FileText,
  juridisch: Scale,
  ruimtelijk: MapPinned,
  sociaal: Users,
  beleid: Compass,
} as const;

const CATEGORY_DESCRIPTIONS = {
  administratief: "Compleetheid dossier en formele documenten",
  juridisch: "Type recht, procedure, juridisch risico",
  ruimtelijk: "Overlap, bestemmingen, beschermde zones",
  sociaal: "Betrokken gemeenschap, FPIC, IACHR-toets",
  beleid: "Patronen, hotspots, beleidsadvies",
} as const;

export function AdviceReportPanel({ application }: { application: Application }) {
  const advice = generateAdvice(application);

  return (
    <div className="space-y-4">
      <AdviceHero advice={advice} />
      <CategoryFindings advice={advice} />
      <Provenance advice={advice} />
    </div>
  );
}

function AdviceHero({ advice }: { advice: AdviceReport }) {
  const isBlocked = advice.blockers.length > 0;
  return (
    <div className={cn(
      "rounded-lg border-2 p-5",
      advice.riskLevel === "zeer_hoog" ? "border-sr-red-700 bg-sr-red-50" :
      advice.riskLevel === "hoog"      ? "border-sr-red-700 bg-sr-red-50/60" :
      advice.riskLevel === "middel"    ? "border-sr-gold-600 bg-sr-gold-100/30" :
                                         "border-sr-green-500 bg-sr-green-50",
    )}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-sr-ink-500 mb-1">
            Advies — automatisch gegenereerd · ruleset {advice.ruleSetVersion}
          </div>
          <h2 className="text-xl font-bold text-sr-ink-900">
            {isBlocked ? "Niet besluitbaar — blokkades actief" : "Advies klaar voor review"}
          </h2>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className={cn(
            "size-20 rounded-full flex flex-col items-center justify-center font-bold shrink-0",
            advice.riskLevel === "zeer_hoog" ? "bg-sr-red-900 text-white" :
            advice.riskLevel === "hoog"      ? "bg-sr-red-100 text-sr-red-900 border-2 border-sr-red-700" :
            advice.riskLevel === "middel"    ? "bg-sr-gold-100 text-sr-gold-700 border-2 border-sr-gold-600" :
                                               "bg-sr-green-100 text-sr-green-900 border-2 border-sr-green-700",
          )}>
            <span className="text-2xl tabular-nums leading-none">{advice.riskScore}</span>
            <span className="text-[10px] opacity-80 mt-0.5">/ 100</span>
          </div>
          <div className="text-right">
            <Badge variant={riskVariant(advice.riskLevel)} className="text-xs">
              {riskLabel(advice.riskLevel)}
            </Badge>
            <div className="text-[11px] text-sr-ink-500 mt-1">{advice.findings.length} bevindingen</div>
          </div>
        </div>
      </div>

      <div className="text-sm text-sr-ink-700 leading-relaxed mb-3">
        {advice.summary}
      </div>

      <div className="border-t border-current/10 pt-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1.5">
          Aanbeveling
        </div>
        <div
          className="text-sm text-sr-ink-900 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: advice.recommendation.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
        />
      </div>

      {advice.blockers.length > 0 && (
        <div className="mt-4 bg-white/70 border border-sr-red-700 rounded-md p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-4 text-sr-red-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-sr-red-700">
              {advice.blockers.length} hard blocker{advice.blockers.length === 1 ? "" : "s"}
            </span>
          </div>
          <ul className="space-y-1.5 text-xs text-sr-red-900">
            {advice.blockers.map((b, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-sr-red-700">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CategoryFindings({ advice }: { advice: AdviceReport }) {
  const cats = ["administratief", "juridisch", "ruimtelijk", "sociaal", "beleid"] as const;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
      {cats.map((cat) => {
        const items = advice.byCategory[cat];
        const Icon = CATEGORY_ICONS[cat];
        const has = items.length > 0;
        return (
          <div key={cat} className={cn(
            "sr-card p-3.5",
            has ? "border-sr-line" : "bg-sr-green-50/40 border-sr-green-100",
          )}>
            <div className="flex items-center gap-2 mb-2">
              <div className={cn(
                "size-7 rounded-md flex items-center justify-center",
                has ? "bg-sr-gold-100 text-sr-gold-700" : "bg-sr-green-100 text-sr-green-700",
              )}>
                <Icon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-sr-ink-900 leading-tight">{categoryLabel(cat)}</div>
                <div className="text-[10px] text-sr-ink-500 leading-tight">{CATEGORY_DESCRIPTIONS[cat]}</div>
              </div>
              <span className={cn(
                "text-xs font-bold tabular-nums shrink-0",
                has ? "text-sr-gold-700" : "text-sr-green-700",
              )}>
                {has ? items.length : <CheckCircle2 className="size-4" />}
              </span>
            </div>
            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="text-[11px] text-sr-green-900 italic">Geen bevindingen — OK</div>
              ) : items.map(f => (
                <div key={f.ruleId} className={cn(
                  "text-[11px] leading-relaxed border-l-2 pl-2 py-0.5",
                  f.blocksDecision ? "border-sr-red-700" : "border-sr-gold-600",
                )}>
                  <div className="font-mono text-[9px] font-bold text-sr-ink-500 uppercase tracking-wider">
                    {f.ruleId}{f.blocksDecision ? " · BLOCKER" : ""}
                  </div>
                  <div className="text-sr-ink-900">{f.finding}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Provenance({ advice }: { advice: AdviceReport }) {
  return (
    <div className="text-[11px] text-sr-ink-500 flex items-center gap-3 flex-wrap pt-2">
      <span>Adviesmotor versie: <strong>{advice.ruleSetVersion}</strong></span>
      <span>·</span>
      <span>Toegepaste regels: {advice.findings.map(f => f.ruleId).join(", ") || "geen"}</span>
      <span>·</span>
      <span>Gegenereerd: {new Date(advice.generatedAt).toLocaleString("nl-NL")}</span>
    </div>
  );
}
