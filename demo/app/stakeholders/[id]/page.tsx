import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Crown, Users, Globe } from "lucide-react";
import { communities, fpicProcesses, applications } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";

export default async function CommunityDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const community = communities.find(c => c.id === id);
  if (!community) notFound();

  const linkedFpic = fpicProcesses.filter(p => p.communityId === community.id);
  const linkedCases = linkedFpic.map(p => applications.find(a => a.id === p.caseId)).filter(Boolean);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <Link href="/stakeholders" className="inline-flex items-center gap-1.5 text-xs text-sr-ink-500 hover:text-sr-green-700 mb-3">
        <ArrowLeft className="size-3.5" /> Stakeholders
      </Link>

      <div className="sr-card p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="size-14 rounded-md bg-sr-gold-100 border border-sr-gold-600 flex items-center justify-center shrink-0">
            <Users className="size-7 text-sr-gold-700" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-sr-gold-700 mb-1">
              {community.peopleGroup === "inheems" ? "Inheemse gemeenschap" : "Tribale / Marron gemeenschap"}
            </div>
            <h1 className="text-2xl font-bold text-sr-ink-900 mb-1">{community.name}</h1>
            <div className="text-sm text-sr-ink-500 flex items-center gap-3 flex-wrap">
              <span><Globe className="inline size-3.5 mr-1 -mt-0.5" />Primaire taal: {community.primaryLanguage}</span>
              <span>·</span>
              <span>~{community.populationEstimate.toLocaleString("nl-NL")} bewoners</span>
              <span>·</span>
              <span className="font-mono text-xs">{community.id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="sr-card p-5">
          <h2 className="font-semibold text-sr-ink-900 mb-3 flex items-center gap-2">
            <Crown className="size-4 text-sr-gold-700" />
            Traditioneel gezag
          </h2>
          {community.traditionalAuthority.granman && (
            <div className="mb-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">Granman</div>
              <div className="font-medium text-sr-ink-900">{community.traditionalAuthority.granman}</div>
            </div>
          )}
          <div className="mb-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">Kapiteins</div>
            {community.traditionalAuthority.kapiteins.map((k, i) => (
              <div key={i} className="text-sm text-sr-ink-900">{k}</div>
            ))}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">Basja's</div>
            {community.traditionalAuthority.basjas.map((b, i) => (
              <div key={i} className="text-sm text-sr-ink-900">{b}</div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-sr-line text-sm">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">FPIC-contactpersoon</div>
            <div className="font-medium text-sr-ink-900">{community.fpicContactPerson}</div>
          </div>
        </div>

        <div className="sr-card p-5">
          <h2 className="font-semibold text-sr-ink-900 mb-3">Gekoppelde dossiers</h2>
          {linkedCases.length === 0 ? (
            <div className="text-sm text-sr-ink-500 italic">Geen actieve dossiers gekoppeld.</div>
          ) : (
            <div className="space-y-2">
              {linkedCases.map((c) => c && (
                <Link key={c.id} href={`/aanvragen/${c.id}`} className="block sr-card sr-tile p-3">
                  <div className="font-mono text-xs font-semibold text-sr-green-900">{c.caseNumber}</div>
                  <div className="text-sm text-sr-ink-900">{c.applicantName}</div>
                  <div className="text-xs text-sr-ink-500">{c.purpose.replace(/_/g, " ")}</div>
                </Link>
              ))}
            </div>
          )}

          {linkedFpic.length > 0 && (
            <div className="mt-4 pt-3 border-t border-sr-line">
              <h3 className="text-sm font-semibold text-sr-ink-900 mb-2">FPIC-trajecten</h3>
              <div className="space-y-2">
                {linkedFpic.map((p) => (
                  <Link key={p.id} href={`/fpic/${p.id}`} className="block bg-sr-gold-100/30 border border-sr-gold-600/30 rounded p-2 hover:bg-sr-gold-100/60">
                    <div className="font-mono text-xs font-semibold">{p.id}</div>
                    <Badge variant="status-fpic" className="mt-1">{p.status.replace(/_/g, " ")}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
