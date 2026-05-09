import { ScrollText, AlertOctagon, Scale, MapPinned, Users, Compass, FileText, Lock, Repeat } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { rules, categoryLabel, type RuleCategory } from "@/lib/advice-engine";
import { cn } from "@/lib/utils";

const ICONS = {
  administratief: FileText,
  juridisch: Scale,
  ruimtelijk: MapPinned,
  sociaal: Users,
  beleid: Compass,
  lifecycle: Repeat,
} as const;

export default function RegelsPage() {
  const groups = (["administratief", "juridisch", "ruimtelijk", "sociaal", "beleid", "lifecycle"] as const).map(cat => ({
    cat,
    items: rules.filter(r => r.category === cat),
  }));

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <PageHeader
        eyebrow="Transparantie"
        title="Adviesregels — uitlegbaar en versioneerd"
        description="Geen black-box. Elke regel die de adviesmotor toepast staat hier publiek. Versionering via Git, wijziging via PR met juridische review."
        action={<Badge variant="green" className="text-xs"><Lock className="size-3" /> ruleset 1.0.0 · {rules.length} regels</Badge>}
      />

      {/* Drempels en gewichten */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="sr-card p-5">
          <SectionHeader icon={Scale} title="Risicoscore-formule" description="Gewogen som van actieve factoren — bereik 0–100." />
          <pre className="bg-sr-cream rounded p-3 text-xs overflow-x-auto">{`Risico = ∑ (weging × waargenomen factor)
─────────────────────────────────────
0 – 24    Laag         (normale workflow)
25 – 49   Middel       (senior review)
50 – 74   Hoog         (juridisch + GIS review)
75 – 100  Zeer hoog    (besluitblokkade tenzij override)
─────────────────────────────────────
Hard blockers → score = niet besluitbaar
                ongeacht totaalsom`}</pre>
        </div>

        <div className="sr-card p-5">
          <SectionHeader icon={AlertOctagon} title="Hard blockers" description="Regels die besluitvorming altijd blokkeren." />
          <ul className="space-y-1.5 text-sm text-sr-ink-700">
            {rules.filter(r => r.blocksDecision).map(r => (
              <li key={r.id} className="flex gap-2">
                <span className="font-mono text-[10px] text-sr-red-700 font-bold mt-1">{r.id}</span>
                <span className="flex-1">{r.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Regels per categorie */}
      <div className="space-y-5">
        {groups.map(({ cat, items }) => {
          const Icon = ICONS[cat];
          return (
            <div key={cat} className="sr-card p-5">
              <SectionHeader
                icon={Icon}
                title={categoryLabel(cat as RuleCategory)}
                description={`${items.length} regel${items.length === 1 ? "" : "s"} in deze categorie`}
              />
              <div className="space-y-2">
                {items.map(r => (
                  <div key={r.id} className={cn(
                    "border-l-2 pl-3 py-1.5",
                    r.blocksDecision ? "border-sr-red-700" : "border-sr-gold-600",
                  )}>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-sr-ink-700">{r.id}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-sr-ink-500">
                        weging {r.weight}
                      </span>
                      {r.blocksDecision && <Badge variant="red" className="text-[9px]">BLOCKER</Badge>}
                      {r.triggers?.includes("fpic_required") && <Badge variant="status-fpic" className="text-[9px]">→ FPIC</Badge>}
                      {r.triggers?.includes("nma_review_required") && <Badge variant="gold" className="text-[9px]">→ NMA</Badge>}
                    </div>
                    <div className="text-sm text-sr-ink-900">{r.description}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="sr-card-emphasis p-4 mt-6 text-sm text-sr-ink-700">
        <ScrollText className="size-4 text-sr-green-700 inline mr-2 -mt-0.5" />
        <strong className="text-sr-ink-900">Beheer.</strong> Wijzigingen aan deze regelset gaan via Pull Request met review door minstens één jurist en één werkgroeplid. Productieve versie wordt per omgeving gepind. Elke run logt de regelversie. Roadmap: ML-aanvulling met expliciete explainability — niet als vervanging.
      </div>
    </div>
  );
}
