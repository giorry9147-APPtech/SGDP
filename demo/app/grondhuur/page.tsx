import {
  Repeat, Clock, AlertOctagon, FileWarning, ArrowRightLeft,
  CheckCircle2, Banknote, Calendar, MapPin,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import {
  tenures, conversions, forfeitures, monthsUntilExpiry, expiryFlag,
  type Tenure,
} from "@/lib/demo-data";
import { DocumentUpload } from "@/components/forms/document-upload";
import { cn, formatDate } from "@/lib/utils";

const PURPOSE_LABEL: Record<Tenure["purpose"], string> = {
  bebouwing_bewoning: "bebouwing/bewoning",
  landbouw: "landbouw",
  industrie: "industrie",
  andere: "andere",
};

const STATUS_LABEL: Record<Tenure["status"], string> = {
  active: "Actief",
  expiring: "Aflopend",
  in_renewal: "In verlenging",
  in_conversion: "In conversie",
  expired: "Verlopen",
  notice_of_intent: "Voornemen vervallen",
  forfeited: "Vervallen",
};

const STATUS_VARIANT: Record<Tenure["status"], React.ComponentProps<typeof Badge>["variant"]> = {
  active: "green",
  expiring: "gold",
  in_renewal: "status-fpic",
  in_conversion: "status-pending",
  expired: "neutral",
  notice_of_intent: "red",
  forfeited: "neutral",
};

function fmtSRD(n: number): string {
  return `SRD ${n.toLocaleString("nl-NL")}`;
}

export default function GrondhuurPage() {
  const totals = {
    active: tenures.filter(t => t.status === "active").length,
    expiring12: tenures.filter(t => {
      const m = monthsUntilExpiry(t);
      return m >= 0 && m < 12;
    }).length,
    expiring9: tenures.filter(t => {
      const m = monthsUntilExpiry(t);
      return m >= 0 && m < 9;
    }).length,
    expiring6: tenures.filter(t => {
      const m = monthsUntilExpiry(t);
      return m >= 0 && m < 6;
    }).length,
    inRenewal: tenures.filter(t => t.status === "in_renewal").length,
    inConversion: tenures.filter(t => t.status === "in_conversion").length,
    expired: tenures.filter(t => t.status === "expired").length,
    notice: tenures.filter(t => t.status === "notice_of_intent").length,
    forfeited: tenures.filter(t => t.status === "forfeited").length,
    arrearsTotal: tenures.reduce((s, t) => s + t.arrearsAmount, 0),
    arrearsCount: tenures.filter(t => t.arrearsAmount > 0).length,
  };

  // Aflopend, gesorteerd op urgentie
  const expiring = tenures
    .filter(t => ["active", "expiring", "expired"].includes(t.status))
    .map(t => ({ t, m: monthsUntilExpiry(t), flag: expiryFlag(t) }))
    .filter(x => x.m < 12 || x.flag === "expired")
    .sort((a, b) => a.m - b.m);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 8 — Grondhuur, conversie & vervallenverklaring"
        title="Levenscyclus van grondrechten ná uitgifte"
        description="Decreet Uitgifte Domeingrond + Besluit Grondconversie 2023. Reminders 12/9/6 maanden, conversie-checklist met PERCEELSID + hypothecair uittreksel, en vervallenverklaring met hoor & wederhoor."
        action={<Badge variant="green" className="text-xs"><Repeat className="size-3" /> doc 18 · GBB / Domeinkantoor</Badge>}
      />

      {/* KPI's */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Aflopend < 6 mnd"
          value={totals.expiring6}
          sub={`<9 mnd: ${totals.expiring9} · <12 mnd: ${totals.expiring12}`}
          icon={Clock}
          variant={totals.expiring6 > 0 ? "danger" : "default"}
        />
        <StatCard
          label="In verlenging / conversie"
          value={`${totals.inRenewal} / ${totals.inConversion}`}
          sub={`${totals.inRenewal} verlenging lopend · ${totals.inConversion} conversie lopend`}
          icon={ArrowRightLeft}
          variant="warning"
        />
        <StatCard
          label="Achterstand totaal"
          value={fmtSRD(totals.arrearsTotal)}
          sub={`${totals.arrearsCount} houders met openstaand bedrag`}
          icon={Banknote}
          variant={totals.arrearsTotal > 0 ? "warning" : "default"}
        />
        <StatCard
          label="Vervallen / voornemen"
          value={`${totals.forfeited} / ${totals.notice}`}
          sub={`${totals.forfeited} forfeited · ${totals.notice} in voornemen-fase`}
          icon={AlertOctagon}
          variant={totals.notice > 0 ? "danger" : "default"}
        />
      </div>

      {/* Aflopende grondhuur */}
      <div className="sr-card p-5 mb-6">
        <SectionHeader
          icon={Calendar}
          title="Aflopende en verlopen grondhuur"
          description="Reminderladder 12/9/6 maanden. Wettelijk: verlengingsverzoek uiterlijk 6 maanden voor end_date (Decreet Uitgifte Domeingrond)."
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sr-green-50 text-sr-ink-700 text-left">
              <tr className="text-[11px] font-semibold uppercase tracking-wider">
                <th className="px-3 py-2.5">PERCEELSID</th>
                <th className="px-3 py-2.5">Houder</th>
                <th className="px-3 py-2.5">Doel</th>
                <th className="px-3 py-2.5">End date</th>
                <th className="px-3 py-2.5">Tijd tot afloop</th>
                <th className="px-3 py-2.5">Achterstand</th>
                <th className="px-3 py-2.5">Stukken</th>
                <th className="px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {expiring.map(({ t, m, flag }) => (
                <tr key={t.id} className="border-t border-sr-line hover:bg-sr-green-50/30">
                  <td className="px-3 py-2.5">
                    <div className="font-mono text-xs font-semibold text-sr-ink-900">{t.perceelsid}</div>
                    <div className="text-[10px] text-sr-ink-500">{t.id} · {t.district}</div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-sr-ink-900">
                    <div className="truncate max-w-[180px]">{t.holderName}</div>
                    <div className="text-[10px] text-sr-ink-500 font-mono">{t.holderId}</div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-sr-ink-700">
                    {PURPOSE_LABEL[t.purpose]}
                    <div className="text-[10px] text-sr-ink-500">{fmtSRD(t.annualFee)}/jr</div>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-sr-ink-700 font-mono">
                    {formatDate(t.endDate)}
                    <div className="text-[10px] text-sr-ink-500">{t.durationYears} jr</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={cn(
                      "text-xs font-semibold",
                      flag === "critical_6m" && "text-sr-red-700",
                      flag === "warning_9m" && "text-sr-gold-700",
                      flag === "watch_12m" && "text-sr-ink-700",
                      flag === "expired" && "text-sr-red-900",
                    )}>
                      {flag === "expired" ? `${Math.abs(m)} mnd verlopen` : `${m} mnd`}
                    </span>
                    <div className="text-[10px] text-sr-ink-500 mt-0.5">
                      {flag === "critical_6m" && "🔴 wettelijke deadline"}
                      {flag === "warning_9m" && "🟠 9-mnd reminder"}
                      {flag === "watch_12m" && "🟡 12-mnd reminder"}
                      {flag === "expired" && "📕 expired"}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-xs">
                    {t.arrearsAmount > 0 ? (
                      <span className="text-sr-red-700 font-semibold">{fmtSRD(t.arrearsAmount)}</span>
                    ) : (
                      <span className="text-sr-ink-500">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1 flex-wrap">
                      {t.hypothecaryExtractDate ? (
                        <span title={`Hypothecair uittreksel ${formatDate(t.hypothecaryExtractDate)}`} className="size-2 rounded-full bg-sr-green-700" />
                      ) : (
                        <span title="Hypothecair uittreksel ontbreekt" className="size-2 rounded-full bg-sr-red-700" />
                      )}
                      {t.perceelsidMapDate ? (
                        <span title={`Uitmetingskaart ${formatDate(t.perceelsidMapDate)}`} className="size-2 rounded-full bg-sr-green-700" />
                      ) : (
                        <span title="Uitmetingskaart ontbreekt" className="size-2 rounded-full bg-sr-red-700" />
                      )}
                      <span className="text-[10px] text-sr-ink-500 ml-1">uittr · kaart</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge variant={STATUS_VARIANT[t.status]} className="text-[10px]">
                      {STATUS_LABEL[t.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
              {expiring.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-8 text-center text-sr-ink-500 text-sm">Geen aflopende grondhuur in komende 12 maanden.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-[11px] text-sr-ink-500 flex flex-wrap gap-3">
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-sr-red-700" /> &lt; 6 mnd (wettelijke deadline)</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-sr-gold-600" /> &lt; 9 mnd</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-sr-ink-300" /> &lt; 12 mnd</span>
        </div>
      </div>

      {/* Conversies */}
      <div className="sr-card p-5 mb-6">
        <SectionHeader
          icon={ArrowRightLeft}
          title="Conversie-aanvragen"
          description="Besluit Grondconversie 2023 (S.B. 2023 nr. 159) — verplichte stukken: PERCEELSID-kaart, hypothecair uittreksel, betalingsbewijs."
          action={<Badge variant="neutral" className="text-[10px]">{conversions.length} aanvragen</Badge>}
        />

        <div className="space-y-3">
          {conversions.map(c => {
            const t = tenures.find(x => x.id === c.fromTenureId);
            if (!t) return null;
            return (
              <div key={c.id} className="sr-card p-4">
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-sr-ink-900">{c.id}</span>
                      <Badge variant={
                        c.decisionStatus === "goedgekeurd" ? "green" :
                        c.decisionStatus === "afgewezen" ? "red" :
                        c.decisionStatus === "voorwaardelijk" ? "gold" :
                        c.decisionStatus === "in_onderzoek" ? "status-pending" : "neutral"
                      } className="text-[10px]">
                        {c.decisionStatus.replace(/_/g, " ")}
                      </Badge>
                      {c.fpicReopened && <Badge variant="status-fpic" className="text-[10px]">FPIC heropend</Badge>}
                      <span className="ml-auto text-[10px] text-sr-ink-500">ingediend {formatDate(c.submittedAt)}</span>
                    </div>

                    <div className="text-sm text-sr-ink-900 mb-1">
                      <span className="font-mono text-xs text-sr-ink-700">{t.perceelsid}</span>
                      <span className="text-sr-ink-500"> · {t.holderName}</span>
                    </div>
                    <div className="text-xs text-sr-ink-700 mb-2">
                      <span className="text-sr-ink-500">van</span> grondhuur ({t.durationYears} jr) <span className="text-sr-ink-500">naar</span> {c.toRrrType}
                    </div>
                    <div className="text-xs italic text-sr-ink-700 mb-2 leading-relaxed">{c.motivation}</div>

                    {c.blockers.length > 0 && (
                      <div className="bg-sr-red-50 border border-sr-red-100 rounded p-2.5 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-sr-red-900 flex items-center gap-1">
                          <FileWarning className="size-3" /> blokkades
                        </div>
                        {c.blockers.map((b, i) => (
                          <div key={i} className="text-xs text-sr-red-900 flex gap-1.5">
                            <span className="text-sr-red-700">•</span><span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {c.conditions && c.conditions.length > 0 && (
                      <div className="bg-sr-gold-100/30 border border-sr-gold-600/40 rounded p-2.5 space-y-1 mt-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-sr-gold-700">voorwaarden</div>
                        {c.conditions.map((cond, i) => (
                          <div key={i} className="text-xs text-sr-ink-700">• {cond}</div>
                        ))}
                      </div>
                    )}
                    {c.blockers.length === 0 && (!c.conditions || c.conditions.length === 0) && (
                      <div className="flex items-center gap-2 text-xs text-sr-green-900 mb-2">
                        <CheckCircle2 className="size-3.5 text-sr-green-700" />
                        Stukken op orde — kan voor besluitvorming.
                      </div>
                    )}

                    <div className="mt-2 pt-2 border-t border-sr-line">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1.5">Stukken (PERCEELSID-kaart, hypothecair uittreksel, betalingsbewijs)</div>
                      <DocumentUpload entityType="conversion" entityId={c.id} variant="compact" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vervallenverklaringen */}
      <div className="sr-card p-5">
        <SectionHeader
          icon={AlertOctagon}
          title="Vervallenverklaringen"
          description="Workflow: signalering → hoor & wederhoor → voornemen → bezwaar (30 dagen) → besluit → MI-GLIS-mutatie → schadeloosstelling (Grondwet art. 34)."
          action={<Badge variant="red" className="text-[10px]">{forfeitures.length} cases</Badge>}
        />

        <div className="space-y-3">
          {forfeitures.map(f => {
            const t = tenures.find(x => x.id === f.tenureId);
            if (!t) return null;
            return (
              <div key={f.id} className={cn(
                "sr-card p-4",
                f.status === "forfeited" && "bg-sr-ink-100/30",
              )}>
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-sr-ink-900">{f.id}</span>
                      <Badge variant={
                        f.status === "forfeited" ? "neutral" :
                        f.status === "restored" ? "green" :
                        f.status === "notice_of_intent" ? "red" :
                        "gold"
                      } className="text-[10px]">{f.status.replace(/_/g, " ")}</Badge>
                      <Badge variant="outline" className="text-[10px]">{f.reason.replace(/_/g, " ")}</Badge>
                      <span className="ml-auto text-[10px] text-sr-ink-500">
                        gesignaleerd {formatDate(f.signaledAt)}
                      </span>
                    </div>

                    <div className="text-sm text-sr-ink-900 mb-1">
                      <span className="font-mono text-xs text-sr-ink-700">{t.perceelsid}</span>
                      <span className="text-sr-ink-500"> · {t.holderName}</span>
                      <span className="text-sr-ink-500"> · {PURPOSE_LABEL[t.purpose]}</span>
                    </div>

                    <div className="text-xs text-sr-ink-700 leading-relaxed mb-2">{f.notes}</div>

                    <div className="flex items-center gap-3 text-[11px] text-sr-ink-500 flex-wrap">
                      {f.noticeAt && <span><strong className="text-sr-ink-700">Voornemen:</strong> {formatDate(f.noticeAt)}</span>}
                      {f.decidedAt && <span><strong className="text-sr-ink-700">Beschikking:</strong> {formatDate(f.decidedAt)}</span>}
                      {typeof f.compensationAmount === "number" && (
                        <span>
                          <strong className="text-sr-ink-700">Schadeloosstelling:</strong>{" "}
                          {f.compensationAmount === 0 ? "n.v.t." : fmtSRD(f.compensationAmount)}
                        </span>
                      )}
                      {t.arrearsAmount > 0 && (
                        <span className="text-sr-red-700"><strong>Achterstand:</strong> {fmtSRD(t.arrearsAmount)}</span>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-sr-line">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1.5">Bijlagen vervallenverklaring (motivatie, hoor & wederhoor, beschikking)</div>
                      <DocumentUpload entityType="forfeiture" entityId={f.id} variant="compact" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sr-card-emphasis p-3 mt-4 text-xs text-sr-ink-700 flex items-start gap-2">
          <MapPin className="size-4 text-sr-green-700 shrink-0 mt-0.5" />
          <span>
            <strong className="text-sr-ink-900">Roadmap.</strong> Geautomatiseerde betaalkoppeling, integratie taxatie/CAMA voor compensatie, en sjablonenbibliotheek voor beschikkingen — zie [doc 18 §18.9](../../../docs/18-grondhuur-conversie.md).
          </span>
        </div>
      </div>
    </div>
  );
}
