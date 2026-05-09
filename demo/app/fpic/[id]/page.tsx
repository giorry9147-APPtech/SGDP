"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Crown, Users, MapPin, Calendar, FileText,
  Mic, Video, Camera, Edit3, ScrollText,
} from "lucide-react";
import { fpicProcesses, communities, applications } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { DocumentUpload } from "@/components/forms/document-upload";
import { cn, formatDate } from "@/lib/utils";

const EVENT_ICONS = {
  info_provided: ScrollText,
  meeting: Users,
  feedback_received: Edit3,
  objection_filed: Edit3,
  condition_added: Edit3,
  consent_given: Crown,
  consent_withdrawn: Crown,
} as const;

const EVENT_LABELS = {
  info_provided: "Informatie verstrekt",
  meeting: "Consultatiesessie",
  feedback_received: "Feedback ontvangen",
  objection_filed: "Bezwaar ingediend",
  condition_added: "Voorwaarde toegevoegd",
  consent_given: "Instemming gegeven",
  consent_withdrawn: "Instemming ingetrokken",
} as const;

const EVIDENCE_ICONS = {
  audio: Mic,
  video: Video,
  foto: Camera,
  verslag: FileText,
  handtekening: Edit3,
} as const;

export default function FpicDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fpic = fpicProcesses.find(p => p.id === id);
  if (!fpic) notFound();

  const community = communities.find(c => c.id === fpic.communityId);
  const application = applications.find(a => a.id === fpic.caseId);

  const statusLabel = fpic.status.replace(/_/g, " ");

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <Link href="/fpic" className="inline-flex items-center gap-1.5 text-xs text-sr-ink-500 hover:text-sr-green-700 mb-3">
        <ArrowLeft className="size-3.5" /> FPIC-trajecten
      </Link>

      {/* Hero */}
      <div className="sr-card p-6 mb-6 bg-sr-gold-100/30 border-sr-gold-600/40">
        <div className="flex items-start gap-4">
          <div className="size-14 rounded-md bg-sr-gold-100 border border-sr-gold-600 flex items-center justify-center shrink-0">
            <Users className="size-7 text-sr-gold-700" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-sr-gold-700 mb-1">
              FPIC-traject {fpic.id} · {community?.peopleGroup === "inheems" ? "Inheemse" : "Tribale"} gemeenschap
            </div>
            <h1 className="text-2xl font-bold text-sr-ink-900 mb-2">{community?.name}</h1>
            <div className="flex items-center gap-3 flex-wrap text-sm text-sr-ink-700">
              <Badge variant="status-fpic" className="text-xs">{statusLabel}</Badge>
              {community?.traditionalAuthority.granman && (
                <span><Crown className="inline size-3.5 mr-1 -mt-0.5 text-sr-gold-700" />{community.traditionalAuthority.granman}</span>
              )}
              <span>·</span>
              <span>{community?.populationEstimate.toLocaleString("nl-NL")} bewoners</span>
              <span>·</span>
              <span>{community?.primaryLanguage}</span>
              {fpic.startedAt && (<><span>·</span><span><Calendar className="inline size-3.5 mr-1 -mt-0.5" />gestart {formatDate(fpic.startedAt)}</span></>)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tijdlijn / events */}
        <div className="lg:col-span-2 sr-card p-5">
          <h2 className="text-base font-semibold text-sr-ink-900 mb-4 flex items-center gap-2">
            <Calendar className="size-4 text-sr-green-700" />
            Consultatie-tijdlijn ({fpic.events.length} event{fpic.events.length === 1 ? "" : "s"})
          </h2>

          {fpic.events.length === 0 ? (
            <div className="text-center py-10">
              <div className="size-12 mx-auto rounded-full bg-sr-ink-100 flex items-center justify-center mb-3">
                <Users className="size-6 text-sr-ink-300" />
              </div>
              <div className="text-sm font-medium text-sr-ink-700 mb-1">Nog geen consultatie-events</div>
              <div className="text-xs text-sr-ink-500 mb-4">Werkstroom Consultatie & FPIC moet identificatie van traditioneel gezag opstarten.</div>
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-sr-gold-600 hover:bg-sr-gold-700 text-white text-sm font-medium rounded-md">
                FPIC-procedure starten
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {fpic.events.map((ev, idx) => {
                const Icon = EVENT_ICONS[ev.type];
                const last = idx === fpic.events.length - 1;
                return (
                  <div key={ev.id} className="flex gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={cn(
                        "size-9 rounded-full flex items-center justify-center text-white",
                        ev.type === "consent_given" ? "bg-sr-green-700" :
                        ev.type === "consent_withdrawn" ? "bg-sr-red-700" :
                        ev.type === "objection_filed" ? "bg-sr-red-700" :
                        "bg-sr-gold-600",
                      )}>
                        <Icon className="size-4" />
                      </div>
                      {!last && <div className="flex-1 w-0.5 bg-sr-ink-100 my-1 min-h-6" />}
                    </div>

                    <div className="flex-1 pb-3 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-sm text-sr-ink-900">{EVENT_LABELS[ev.type]}</span>
                        <span className="text-xs text-sr-ink-500">·</span>
                        <span className="text-xs text-sr-ink-500">{formatDate(ev.date, { day: "numeric", month: "long", year: "numeric" })}</span>
                        {ev.location && (<>
                          <span className="text-xs text-sr-ink-500">·</span>
                          <span className="text-xs text-sr-ink-500"><MapPin className="inline size-3 mr-0.5 -mt-0.5" />{ev.location}</span>
                        </>)}
                      </div>
                      <div className="text-sm text-sr-ink-700 leading-relaxed mb-2">{ev.notes}</div>
                      <div className="text-[11px] text-sr-ink-500 mb-2">
                        Aanwezig: {ev.attendees.join(" · ")}
                      </div>

                      {ev.evidence.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {ev.evidence.map((e, i) => {
                            const EIcon = EVIDENCE_ICONS[e.type];
                            return (
                              <div key={i} className="inline-flex items-center gap-1.5 bg-white border border-sr-line rounded px-2 py-1 text-[11px] text-sr-ink-700">
                                <EIcon className="size-3 text-sr-green-700" />
                                <span className="truncate max-w-[200px]">{e.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <DocumentUpload entityType="fpic_event" entityId={ev.id} variant="compact" label="Extra evidence toevoegen" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-sr-line">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1.5">FPIC-traject — algemene bijlagen</div>
            <DocumentUpload entityType="fpic_process" entityId={fpic.id} variant="dropzone" label="Klik of sleep een document hier" />
          </div>
        </div>

        {/* Side info */}
        <div className="space-y-4">
          {/* Traditioneel gezag */}
          {community && (
            <div className="sr-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="size-4 text-sr-gold-700" />
                <h3 className="text-sm font-semibold text-sr-ink-900">Traditioneel gezag</h3>
              </div>
              <div className="space-y-2 text-xs">
                {community.traditionalAuthority.granman && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">Granman</div>
                    <div className="font-medium text-sr-ink-900">{community.traditionalAuthority.granman}</div>
                  </div>
                )}
                {community.traditionalAuthority.kapiteins.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">Kapiteins</div>
                    {community.traditionalAuthority.kapiteins.map((k, i) => (
                      <div key={i} className="text-sr-ink-900">{k}</div>
                    ))}
                  </div>
                )}
                {community.traditionalAuthority.basjas.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">Basja's</div>
                    {community.traditionalAuthority.basjas.map((b, i) => (
                      <div key={i} className="text-sr-ink-900">{b}</div>
                    ))}
                  </div>
                )}
                <div className="pt-2 mt-2 border-t border-sr-line">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500">FPIC-contact</div>
                  <div className="text-sr-ink-900">{community.fpicContactPerson}</div>
                </div>
              </div>
            </div>
          )}

          {/* Voorwaarden */}
          {fpic.conditions && fpic.conditions.length > 0 && (
            <div className="sr-card p-4 bg-sr-green-50 border-sr-green-100">
              <h3 className="text-sm font-semibold text-sr-green-900 mb-2">Voorwaarden gemeenschap</h3>
              <ul className="space-y-1.5 text-xs text-sr-ink-700">
                {fpic.conditions.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-sr-green-700">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gekoppelde aanvraag */}
          {application && (
            <div className="sr-card p-4">
              <h3 className="text-sm font-semibold text-sr-ink-900 mb-2">Gekoppelde aanvraag</h3>
              <Link href={`/aanvragen/${application.id}`} className="block bg-sr-cream rounded p-2 hover:bg-sr-green-50">
                <div className="font-mono text-xs font-semibold text-sr-green-900">{application.caseNumber}</div>
                <div className="text-xs text-sr-ink-700">{application.applicantName}</div>
                <div className="text-[11px] text-sr-ink-500">{application.purpose.replace(/_/g, " ")}</div>
              </Link>
            </div>
          )}

          {/* Juridische basis */}
          <div className="sr-card p-4 text-xs">
            <h3 className="text-sm font-semibold text-sr-ink-900 mb-2">Juridische basis</h3>
            <ul className="space-y-1 text-sr-ink-700">
              <li>• <strong>UNDRIP</strong> — recht op FPIC</li>
              <li>• <strong>VIDS FPIC-document</strong></li>
              <li>• <strong>IACHR Saramaka</strong> (2007) — collectieve titel + FPIC bij major-impact</li>
              <li>• <strong>IACHR Kaliña-Lokono</strong> (2015) — toegang en effectieve participatie</li>
              <li>• <strong>Ontwerpwet Collectieve Rechten ITP</strong> — DNA in behandeling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
