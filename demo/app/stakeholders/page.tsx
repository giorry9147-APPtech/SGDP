import Link from "next/link";
import { Building2, ChevronRight, Calendar } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { stakeholders, communities } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

const CATEGORY_LABEL = {
  ITP_gemeenschap: "ITP-gemeenschap",
  ITP_koepel:      "ITP-koepelorganisatie",
  overheid:        "Overheid",
  register:        "Register / authoriteit",
  politiek:        "Politiek",
  sector:          "Sector",
  civil_society:   "Civil society",
  internationaal:  "Internationaal",
  academisch:      "Academisch",
} as const;

const ENGAGEMENT_VARIANT = {
  co_creatie:  "green",
  consult:     "gold",
  informeren:  "neutral",
  adviserend:  "neutral",
} as const;

export default function StakeholdersPage() {
  const grouped = (Object.keys(CATEGORY_LABEL) as Array<keyof typeof CATEGORY_LABEL>).map(cat => ({
    category: cat,
    label: CATEGORY_LABEL[cat],
    items: stakeholders.filter(s => s.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 7 — Stakeholdermanagement"
        title="Stakeholders & gemeenschappenregister"
        description="Wie is betrokken, wie wordt geconsulteerd, wie heeft consent-rechten. ITP-gemeenschappen worden gelijkwaardig vermeld als koepelorganisaties en overheid."
      />

      {/* ITP-gemeenschappen highlight */}
      <div className="sr-card p-5 mb-6 bg-sr-gold-100/30 border-sr-gold-600/40">
        <SectionHeader
          icon={Building2}
          title="Inheemse en Tribale gemeenschappen"
          description="Co-creatie / consent-niveau — IACHR-bestendig vastgelegd."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {communities.map((c) => (
            <Link key={c.id} href={`/stakeholders/${c.id}`} className="sr-card sr-tile p-3.5 block">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant={c.peopleGroup === "inheems" ? "green" : "gold"} className="text-[10px]">
                  {c.peopleGroup === "inheems" ? "Inheems" : "Marron"}
                </Badge>
                <span className="text-[10px] text-sr-ink-500 ml-auto font-mono">{c.id}</span>
              </div>
              <div className="font-semibold text-sm text-sr-ink-900 leading-tight mb-1">{c.name}</div>
              <div className="text-xs text-sr-ink-500 mb-2">
                {c.populationEstimate.toLocaleString("nl-NL")} bewoners · {c.primaryLanguage}
              </div>
              {c.traditionalAuthority.granman && (
                <div className="text-[11px] text-sr-ink-700">
                  <strong>Granman:</strong> {c.traditionalAuthority.granman}
                </div>
              )}
              <div className="text-[11px] text-sr-ink-700">
                <strong>FPIC-contact:</strong> {c.fpicContactPerson}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Overige stakeholders per categorie */}
      <div className="space-y-5">
        {grouped.filter(g => g.category !== "ITP_gemeenschap").map((g) => (
          <div key={g.category} className="sr-card p-5">
            <SectionHeader
              icon={Building2}
              title={g.label}
              description={`${g.items.length} stakeholder${g.items.length === 1 ? "" : "s"} geregistreerd`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {g.items.map((s) => (
                <div key={s.id} className="flex items-start gap-3 p-3 border border-sr-line rounded-md hover:bg-sr-cream">
                  <div className="size-9 rounded-md bg-sr-green-100 flex items-center justify-center shrink-0">
                    <Building2 className="size-4 text-sr-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-medium text-sm text-sr-ink-900">{s.name}</span>
                      <Badge variant={ENGAGEMENT_VARIANT[s.engagementLevel]} className="text-[10px]">
                        {s.engagementLevel.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    {s.contactPerson && (
                      <div className="text-xs text-sr-ink-500">{s.contactPerson}</div>
                    )}
                    {s.lastContact && (
                      <div className="text-[11px] text-sr-ink-500 mt-0.5">
                        <Calendar className="inline size-2.5 mr-0.5 -mt-0.5" />
                        Laatste contact: {formatDate(s.lastContact)}
                      </div>
                    )}
                    {s.notes && (
                      <div className="text-[11px] text-sr-ink-700 italic mt-1">{s.notes}</div>
                    )}
                  </div>
                  <ChevronRight className="size-4 text-sr-ink-300 shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
