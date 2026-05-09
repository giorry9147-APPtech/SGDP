import { ShieldCheck, Hash, Lock } from "lucide-react";
import { PageHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { auditLog } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const ACTION_LABEL = {
  create: { label: "Aanmaken",  cls: "bg-sr-green-100 text-sr-green-900" },
  update: { label: "Wijzigen",  cls: "bg-sr-gold-100 text-sr-gold-700" },
  delete: { label: "Verwijderen", cls: "bg-sr-red-100 text-sr-red-900" },
  view:   { label: "Geraadpleegd", cls: "bg-sr-ink-100 text-sr-ink-700" },
  export: { label: "Geëxporteerd", cls: "bg-sr-ink-100 text-sr-ink-700" },
  login:  { label: "Aangemeld",   cls: "bg-sr-ink-100 text-sr-ink-700" },
} as const;

export default function AuditPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Audit & anti-corruptie"
        title="Audit Trail — onveranderbaar"
        description="Append-only log; cryptografische hash per record; ondersteunt IACHR-bestendige rapportage en onafhankelijke audits."
        action={
          <Badge variant="green" className="text-xs">
            <Lock className="size-3" /> Append-only · hash-chained
          </Badge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <Stat label="Totaal logregels (demo)" value={auditLog.length.toString()} icon={ShieldCheck} />
        <Stat label="Unieke gebruikers" value={new Set(auditLog.map(a => a.userId)).size.toString()} icon={ShieldCheck} />
        <Stat label="Hash-keten integer" value="100%" icon={Hash} variant="success" />
      </div>

      <div className="sr-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sr-green-50 text-sr-ink-700">
            <tr className="text-left text-[11px] font-semibold uppercase tracking-wider">
              <th className="px-4 py-3 w-44">Tijdstip</th>
              <th className="px-4 py-3 w-44">Gebruiker</th>
              <th className="px-4 py-3 w-32">Actie</th>
              <th className="px-4 py-3 w-40">Object</th>
              <th className="px-4 py-3">Beschrijving</th>
              <th className="px-4 py-3 w-28">Hash</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((e) => (
              <tr key={e.id} className="border-t border-sr-line hover:bg-sr-green-50/30">
                <td className="px-4 py-2.5 text-xs text-sr-ink-700 font-mono">
                  {new Date(e.timestamp).toLocaleString("nl-NL", { dateStyle: "short", timeStyle: "short" })}
                </td>
                <td className="px-4 py-2.5">
                  <div className="text-xs font-medium text-sr-ink-900">{e.userName}</div>
                  <div className="text-[10px] text-sr-ink-500 font-mono">{e.userId}</div>
                </td>
                <td className="px-4 py-2.5">
                  <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded", ACTION_LABEL[e.action].cls)}>
                    {ACTION_LABEL[e.action].label}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-xs">
                  <div className="text-sr-ink-700">{e.entityType}</div>
                  <div className="text-[10px] text-sr-ink-500 font-mono">{e.entityId}</div>
                </td>
                <td className="px-4 py-2.5 text-xs text-sr-ink-700">{e.description}</td>
                <td className="px-4 py-2.5 text-[10px] font-mono text-sr-ink-500 truncate">
                  {/* Vervalste hash voor demo */}
                  {pseudoHash(e.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sr-card-emphasis p-4 mt-5 text-xs text-sr-ink-700">
        <strong className="text-sr-ink-900">Audit-by-default.</strong> Elke wijziging in zaakstatus, geometrie, document, FPIC-status of besluit wordt onveranderbaar gelogd met actor, tijdstip, oude/nieuwe waarde en cryptografische hash. Roadmap fase 4: verankering van hashes op een externe ledger (Estland-model).
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon, variant }: {
  label: string; value: string; icon: typeof ShieldCheck;
  variant?: "success";
}) {
  return (
    <div className={cn(
      "sr-card p-4",
      variant === "success" && "border-sr-green-500 bg-sr-green-50",
    )}>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="size-3.5 text-sr-green-700" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">{label}</span>
      </div>
      <div className="text-2xl font-bold text-sr-ink-900">{value}</div>
    </div>
  );
}

function pseudoHash(seed: string): string {
  // Pseudo-deterministisch — alleen voor demo-weergave
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  const hex = Math.abs(h).toString(16).padStart(6, "0");
  return `${hex.slice(0, 6)}…`;
}
