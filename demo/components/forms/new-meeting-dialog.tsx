"use client";

import { useState } from "react";
import { Plus, Calendar, MapPin, Users, ListChecks } from "lucide-react";
import {
  Dialog, DialogContent, DialogTrigger, DialogClose,
} from "@/components/ui/dialog";
import { useSgdpStore } from "@/lib/store";
import { workgroupMembers, type Meeting } from "@/lib/demo-data";
import { useUser } from "@/components/user-context";
import { cn } from "@/lib/utils";

const MEETING_TYPES: { value: Meeting["type"]; label: string }[] = [
  { value: "plenair",         label: "Plenair" },
  { value: "werkstroom",      label: "Werkstroom-overleg" },
  { value: "klankbord",       label: "Klankbordsessie" },
  { value: "veldconsultatie", label: "Veldconsultatie / FPIC" },
  { value: "stuur_president", label: "Stuuroverleg President" },
];

export function NewMeetingDialog() {
  const user = useUser();
  const addMeeting = useSgdpStore((s) => s.addMeeting);
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const [type, setType] = useState<Meeting["type"]>("plenair");
  const [date, setDate] = useState(today);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Kabinet van de President, Paramaribo");
  const [attendees, setAttendees] = useState<string[]>([user.userId]);
  const [extraAttendeesText, setExtraAttendeesText] = useState("");
  const [agendaText, setAgendaText] = useState("");

  const reset = () => {
    setType("plenair");
    setDate(today);
    setTitle("");
    setLocation("Kabinet van de President, Paramaribo");
    setAttendees([user.userId]);
    setExtraAttendeesText("");
    setAgendaText("");
  };

  const toggleAttendee = (id: string) => {
    setAttendees((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = MEETING_TYPES.find((t) => t.value === type)?.label ?? type;
    const extras = extraAttendeesText.split("\n").map((s) => s.trim()).filter(Boolean);
    const newMeeting: Meeting = {
      id: `MTG-USER-${Date.now()}`,
      date,
      type,
      title: title.trim() || `${typeLabel} ${date}`,
      location: location.trim(),
      attendees: [...attendees, ...extras],
      agenda: agendaText.split("\n").map((s) => s.trim()).filter(Boolean),
      decisions: [],
      actionItemsCreated: 0,
    };
    addMeeting(newMeeting);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sr-green-700 hover:bg-sr-green-900 text-white text-xs font-medium rounded-md shadow-sm transition-colors">
          <Plus className="size-3.5" />
          Nieuwe vergadering
        </button>
      </DialogTrigger>
      <DialogContent
        title="Nieuwe vergadering plannen"
        description="Velden conform doc 02 §2.2 — type, agenda, aanwezigen. Demo: server-side gedeeld (alle ingelogde leden zien dit); productie: PostgreSQL + audit-trail."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              <Calendar className="inline size-3 mr-1 -mt-0.5" /> Type vergadering
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Meeting["type"])}
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            >
              {MEETING_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Datum + titel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
                Datum
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
                Titel <span className="text-sr-ink-300 font-normal lowercase">(optioneel)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Plenaire week 19"
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
              />
            </div>
          </div>

          {/* Locatie */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              <MapPin className="inline size-3 mr-1 -mt-0.5" /> Locatie
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            />
          </div>

          {/* Aanwezigen */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700">
                <Users className="inline size-3 mr-1 -mt-0.5" /> Aanwezigen
              </label>
              <span className="text-[10px] text-sr-ink-500">{attendees.length} geselecteerd</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {workgroupMembers.map((m) => {
                const checked = attendees.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleAttendee(m.id)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md border text-left transition-colors",
                      checked
                        ? "bg-sr-green-100 border-sr-green-700"
                        : "bg-white border-sr-line hover:bg-sr-green-50",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      tabIndex={-1}
                      className="accent-sr-green-700 pointer-events-none"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-sr-ink-900 truncate">{m.name}</div>
                      <div className="text-[10px] text-sr-ink-500 truncate">{m.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-2">
              <label className="text-[10px] font-medium text-sr-ink-500 mb-1 block">
                Extra uitgenodigden / waarnemers <span className="text-sr-ink-300">(één per regel)</span>
              </label>
              <textarea
                value={extraAttendeesText}
                onChange={(e) => setExtraAttendeesText(e.target.value)}
                rows={3}
                placeholder={"DEMO_Granman R. Misiedjan\nVIDS-waarnemer\n20 dorpsbewoners\nKAMPOS-coördinator"}
                className="w-full px-3 py-2 border border-sr-line rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
              />
              <p className="mt-1 text-[10px] text-sr-ink-500">
                Voor traditioneel gezag, koepelorganisaties (VIDS/KAMPOS), pers, of aantallen (&quot;20 dorpsbewoners&quot;).
              </p>
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              <ListChecks className="inline size-3 mr-1 -mt-0.5" /> Agenda{" "}
              <span className="text-sr-ink-300 font-normal lowercase">(één punt per regel)</span>
            </label>
            <textarea
              value={agendaText}
              onChange={(e) => setAgendaText(e.target.value)}
              rows={4}
              placeholder={"Vaststelling notulen vorige vergadering\nVoortgang werkstromen\nRisico-update"}
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            />
          </div>

          {/* Knoppen */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-sr-line">
            <DialogClose asChild>
              <button
                type="button"
                className="px-3 py-2 border border-sr-line rounded-md text-sm font-medium hover:bg-sr-cream"
              >
                Annuleren
              </button>
            </DialogClose>
            <button
              type="submit"
              className="px-3 py-2 bg-sr-green-700 hover:bg-sr-green-900 text-white text-sm font-medium rounded-md shadow-sm"
            >
              Vergadering toevoegen
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
