"use client";

import {
  Workflow, Calendar, CheckSquare, Vote, Users, Clock,
  AlertCircle, CheckCircle2, Sparkles, Trash2,
} from "lucide-react";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { PageHeader, SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import {
  meetings, decisions, actionItems, workgroupMembers, milestones,
} from "@/lib/demo-data";
import { cn, formatDate, daysBetween } from "@/lib/utils";
import { useSgdpStore } from "@/lib/store";
import { NewMeetingDialog } from "@/components/forms/new-meeting-dialog";
import { NewDecisionDialog } from "@/components/forms/new-decision-dialog";
import { NewActionDialog } from "@/components/forms/new-action-dialog";
import { DocumentUpload } from "@/components/forms/document-upload";
import { useUser } from "@/components/user-context";

export default function WerkgroepPage() {
  const user = useUser();
  const addedMeetings = useSgdpStore(useShallow((s) => s.addedMeetings));
  const addedDecisions = useSgdpStore(useShallow((s) => s.addedDecisions));
  const addedActionItems = useSgdpStore(useShallow((s) => s.addedActionItems));
  const removeMeeting = useSgdpStore((s) => s.removeMeeting);
  const removeDecision = useSgdpStore((s) => s.removeDecision);
  const removeActionItem = useSgdpStore((s) => s.removeActionItem);

  const allMeetings = [...addedMeetings, ...meetings].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const upcomingMeetings = allMeetings.slice(0, 5);

  const allDecisions = [...addedDecisions, ...decisions];
  const allActions = [...addedActionItems, ...actionItems];
  const openActions = allActions.filter(a => a.status === "open" || a.status === "in_uitvoering" || a.status === "achterstallig");
  const recentDecisions = allDecisions.slice(0, 5);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="Module 6 — Werkgroep-werkruimte"
        title="Werkgroep Grondenrechten & Decentralisatie"
        description="Vergaderingen, besluiten, actiepunten en mijlpalen. Werkarm van het Staatshoofd; benoemd december 2025."
        action={<NewMeetingDialog />}
      />

      {/* Leden */}
      <div className="sr-card p-5 mb-6">
        <SectionHeader icon={Users} title="Werkgroep-leden" description="6 leden + secretariaat" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {workgroupMembers.map((m) => {
            const initials = m.name.split(" ").map(s => s[0]).join("").slice(0, 2);
            return (
              <div key={m.id} className="sr-card p-3 text-center">
                <div className={cn(
                  "size-12 mx-auto rounded-full flex items-center justify-center text-sm font-bold mb-2",
                  m.id === "WG-01" ? "bg-sr-green-700 text-white" : "bg-sr-green-100 text-sr-green-900",
                )}>
                  {initials}
                </div>
                <div className="text-xs font-semibold text-sr-ink-900 leading-tight">{m.name}</div>
                <div className="text-[10px] text-sr-ink-500 mt-0.5">{m.role}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vergaderingen */}
        <div className="sr-card p-5 lg:col-span-2">
          <SectionHeader
            icon={Calendar}
            title="Vergaderingen"
            description="Plenair, werkstroom, klankbord, veldconsultatie, stuur."
            action={
              <span className="text-[10px] text-sr-ink-500">
                {addedMeetings.length} eigen · {meetings.length} seed
              </span>
            }
          />

          <div className="space-y-3">
            {upcomingMeetings.map((m) => {
              const isUserAdded = m.id.startsWith("MTG-USER-");
              const meetingDecisions = addedDecisions.filter((d) => d.meetingId === m.id);
              const meetingActions = addedActionItems.filter((a) => a.meetingId === m.id);
              return (
                <div key={m.id} className={cn(
                  "sr-card sr-tile p-3.5",
                  isUserAdded && "border-sr-green-500 bg-sr-green-50/30",
                )}>
                  <div className="flex items-start gap-3">
                    <div className="size-12 rounded-md bg-sr-green-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold uppercase text-sr-green-700">
                        {new Date(m.date).toLocaleDateString("nl-NL", { month: "short" })}
                      </span>
                      <span className="text-base font-bold text-sr-green-900 leading-none">
                        {new Date(m.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm text-sr-ink-900">{m.title}</span>
                        <Badge variant={
                          m.type === "plenair" ? "green" :
                          m.type === "veldconsultatie" ? "gold" :
                          m.type === "stuur_president" ? "red" : "neutral"
                        } className="text-[10px]">{m.type.replace(/_/g, " ")}</Badge>
                        {isUserAdded && (
                          <Badge variant="status-fpic" className="text-[10px]">
                            <Sparkles className="size-2.5" /> nieuw
                          </Badge>
                        )}
                        {isUserAdded && (
                          <button
                            type="button"
                            onClick={() => removeMeeting(m.id)}
                            aria-label="Verwijder vergadering"
                            className="ml-auto size-6 rounded-md flex items-center justify-center text-sr-ink-300 hover:bg-sr-red-50 hover:text-sr-red-700 transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="text-xs text-sr-ink-500 mb-2">
                        {formatDate(m.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {m.location} · {m.attendees.length} aanwezigen
                      </div>

                      <details className="text-xs">
                        <summary className="cursor-pointer text-sr-green-700 hover:text-sr-green-900 font-medium">
                          Agenda ({m.agenda.length}) · besluiten ({m.decisions.length + meetingDecisions.length}) · acties ({m.actionItemsCreated + meetingActions.length})
                        </summary>
                        <div className="mt-2 space-y-2">
                          {m.attendees.length > 0 && (
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1">Aanwezigen</div>
                              <div className="text-sr-ink-700 text-[11px]">
                                {m.attendees.map((a) => {
                                  const wm = workgroupMembers.find((w) => w.id === a);
                                  return wm ? wm.name : a;
                                }).join(" · ")}
                              </div>
                            </div>
                          )}
                          {m.agenda.length > 0 && (
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1">Agenda</div>
                              <ul className="space-y-0.5">
                                {m.agenda.map((a, i) => <li key={i} className="text-sr-ink-700">{i + 1}. {a}</li>)}
                              </ul>
                            </div>
                          )}
                          {(m.decisions.length > 0 || meetingDecisions.length > 0) && (
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1">Besluiten</div>
                              <ul className="space-y-0.5">
                                {m.decisions.map((d, i) => <li key={i} className="text-sr-ink-700">• {d}</li>)}
                                {meetingDecisions.map((d) => (
                                  <li key={d.id} className="text-sr-ink-700 flex items-center gap-1.5">
                                    <Sparkles className="size-2.5 text-sr-green-700" />
                                    <span>{d.title} <span className="text-sr-ink-500 font-mono text-[10px]">({d.vote.for}-{d.vote.against}-{d.vote.abstain})</span></span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {meetingActions.length > 0 && (
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1">Toegevoegde acties</div>
                              <ul className="space-y-0.5">
                                {meetingActions.map((a) => {
                                  const owner = workgroupMembers.find((m) => m.id === a.ownerId);
                                  return (
                                    <li key={a.id} className="text-sr-ink-700 flex items-center gap-1.5">
                                      <Sparkles className="size-2.5 text-sr-green-700" />
                                      <span>{a.description} — <span className="text-sr-ink-500">{owner?.name} · {formatDate(a.dueDate)}</span></span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </details>

                      <div className="mt-3 pt-2 border-t border-sr-line flex items-center gap-2 flex-wrap">
                        <NewDecisionDialog meetingId={m.id} meetingDate={m.date} />
                        <NewActionDialog meetingId={m.id} defaultOwnerId={user.userId} />
                        <div className="ml-auto">
                          <DocumentUpload entityType="meeting" entityId={m.id} variant="compact" label="Notulen / bijlage" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mijlpalen */}
        <div className="sr-card p-5">
          <SectionHeader icon={Workflow} title="Fasen & mijlpalen" description="40-weken-mandaat" />
          <div className="space-y-3">
            {(["F1", "F2", "F3", "F4", "F5"] as const).map((phase) => {
              const ms = milestones.filter(m => m.phase === phase);
              const done = ms.filter(m => m.status === "voltooid").length;
              const phaseLabels: Record<string, string> = {
                F1: "Constituering & scope",
                F2: "Inventarisatie & data",
                F3: "Consultatie & FPIC",
                F4: "Analyse & advies",
                F5: "Rapportage & overdracht",
              };
              const pct = Math.round((done / ms.length) * 100);
              return (
                <div key={phase}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-sr-green-700">{phase}</span>
                    <span className="text-xs font-medium text-sr-ink-900">{phaseLabels[phase]}</span>
                    <span className="ml-auto text-[10px] text-sr-ink-500 tabular-nums">{done}/{ms.length}</span>
                  </div>
                  <div className="h-1.5 bg-sr-ink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sr-green-600 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Besluiten + acties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="sr-card p-5">
          <SectionHeader
            icon={Vote}
            title="Recente besluiten"
            description="Met stemverhouding en uitvoeringsstatus."
            action={
              <span className="text-[10px] text-sr-ink-500">
                {addedDecisions.length} eigen
              </span>
            }
          />
          <div className="space-y-3">
            {recentDecisions.map((d) => {
              const isUserAdded = d.id.startsWith("BES-USER-");
              return (
                <div key={d.id} className={cn(
                  "border-l-2 pl-3 py-1",
                  isUserAdded ? "border-sr-green-700 bg-sr-green-50/30" : "border-sr-green-500",
                )}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[10px] text-sr-ink-500">{d.id}</span>
                    <Badge variant={
                      d.status === "voltooid" ? "green" :
                      d.status === "in_uitvoering" ? "gold" : "neutral"
                    } className="text-[10px]">{d.status.replace(/_/g, " ")}</Badge>
                    {isUserAdded && (
                      <Badge variant="status-fpic" className="text-[10px]">
                        <Sparkles className="size-2.5" /> nieuw
                      </Badge>
                    )}
                    <span className="ml-auto text-[10px] text-sr-ink-500 font-mono">
                      {d.vote.for}-{d.vote.against}-{d.vote.abstain}
                    </span>
                    {isUserAdded && (
                      <button
                        type="button"
                        onClick={() => removeDecision(d.id)}
                        aria-label="Verwijder besluit"
                        className="size-5 rounded flex items-center justify-center text-sr-ink-300 hover:bg-sr-red-50 hover:text-sr-red-700"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    )}
                  </div>
                  <div className="text-sm font-medium text-sr-ink-900 mb-0.5">{d.title}</div>
                  <div className="text-xs text-sr-ink-700 leading-relaxed">{d.outcome}</div>
                  <div className="text-[10px] text-sr-ink-500 mt-1">{formatDate(d.date)}</div>
                  <div className="mt-2">
                    <DocumentUpload entityType="decision" entityId={d.id} variant="compact" label="Bijlage" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sr-card p-5">
          <SectionHeader
            icon={CheckSquare}
            title="Actiepunten"
            description={`${openActions.length} open · ${allActions.filter(a => a.status === "achterstallig").length} achterstallig`}
            action={
              <span className="text-[10px] text-sr-ink-500">
                {addedActionItems.length} eigen
              </span>
            }
          />
          <div className="space-y-2">
            {openActions.slice(0, 8).map((a) => {
              const owner = workgroupMembers.find(m => m.id === a.ownerId);
              const days = daysBetween(a.dueDate);
              const isUserAdded = a.id.startsWith("ACT-USER-");
              return (
                <div key={a.id} className={cn(
                  "flex items-start gap-2.5 text-xs py-1.5 border-b border-sr-line last:border-0",
                  isUserAdded && "bg-sr-green-50/30 -mx-2 px-2 rounded",
                )}>
                  <div className={cn(
                    "size-4 rounded shrink-0 mt-0.5 flex items-center justify-center",
                    a.status === "achterstallig" ? "bg-sr-red-100 border border-sr-red-700" :
                    a.status === "in_uitvoering" ? "bg-sr-gold-100 border border-sr-gold-600" :
                    "bg-white border border-sr-ink-300",
                  )}>
                    {a.status === "achterstallig" && <AlertCircle className="size-3 text-sr-red-700" />}
                    {a.status === "in_uitvoering" && <Clock className="size-3 text-sr-gold-700" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <div className="text-sr-ink-900 leading-tight flex-1">{a.description}</div>
                      {isUserAdded && (
                        <>
                          <Badge variant="status-fpic" className="text-[9px]">
                            <Sparkles className="size-2" /> nieuw
                          </Badge>
                          <button
                            type="button"
                            onClick={() => removeActionItem(a.id)}
                            aria-label="Verwijder actie"
                            className="size-5 rounded flex items-center justify-center text-sr-ink-300 hover:bg-sr-red-50 hover:text-sr-red-700"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="text-[10px] text-sr-ink-500 mt-0.5">
                      {owner?.name} · deadline {formatDate(a.dueDate)} ·
                      <span className={cn(
                        "ml-1 font-medium",
                        days < 0 ? "text-sr-red-700" :
                        days <= 3 ? "text-sr-gold-700" : "text-sr-ink-500",
                      )}>
                        {days < 0 ? `${Math.abs(days)}d over deadline` :
                         days === 0 ? "vandaag" :
                         `over ${days}d`}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <DocumentUpload entityType="action" entityId={a.id} variant="compact" label="Bewijs" />
                    </div>
                  </div>
                </div>
              );
            })}
            {allActions.filter(a => a.status === "voltooid").length > 0 && (
              <div className="pt-2 mt-2 border-t border-sr-line text-[10px] text-sr-ink-500 flex items-center gap-1">
                <CheckCircle2 className="size-3 text-sr-green-700" />
                <span>{allActions.filter(a => a.status === "voltooid").length} acties voltooid (verborgen)</span>
              </div>
            )}
          </div>
          <Link href="/werkgroep" className="text-xs font-medium text-sr-green-700 hover:text-sr-green-900 mt-3 inline-block">
            Alle actiepunten →
          </Link>
        </div>
      </div>
    </div>
  );
}
