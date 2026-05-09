"use client";

import { useState } from "react";
import { Plus, CheckSquare, User, Calendar } from "lucide-react";
import {
  Dialog, DialogContent, DialogTrigger, DialogClose,
} from "@/components/ui/dialog";
import { useSgdpStore } from "@/lib/store";
import { workgroupMembers } from "@/lib/demo-data";
import type { ActionItem } from "@/lib/demo-data";

const WORKSTREAMS = [
  "alle",
  "juridisch",
  "inventarisatie_gis",
  "consultatie",
  "decentralisatie",
  "rapportage",
  "communicatie",
] as const;

export function NewActionDialog({
  meetingId,
  defaultOwnerId,
}: {
  meetingId: string;
  defaultOwnerId: string;
}) {
  const addActionItem = useSgdpStore((s) => s.addActionItem);
  const [open, setOpen] = useState(false);

  const inSevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString().slice(0, 10);

  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState(defaultOwnerId);
  const [dueDate, setDueDate] = useState(inSevenDays);
  const [workstream, setWorkstream] = useState<string>("alle");

  const reset = () => {
    setDescription("");
    setOwnerId(defaultOwnerId);
    setDueDate(inSevenDays);
    setWorkstream("alle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAction: ActionItem = {
      id: `ACT-USER-${Date.now()}`,
      description: description.trim(),
      ownerId,
      dueDate,
      status: "open",
      meetingId,
      workstream,
    };
    addActionItem(newAction);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-sr-green-700 hover:bg-sr-green-50 border border-sr-line hover:border-sr-green-500 rounded transition-colors"
        >
          <Plus className="size-3" />
          Actie
        </button>
      </DialogTrigger>
      <DialogContent
        title="Actiepunt toewijzen"
        description="Beschrijving + eigenaar + deadline. Doc 02 §2.8."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              <CheckSquare className="inline size-3 mr-1 -mt-0.5" /> Beschrijving actie
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
              placeholder="Inventarisatie CT-005 afronden — kaart + bewijsregister"
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
                <User className="inline size-3 mr-1 -mt-0.5" /> Eigenaar
              </label>
              <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
              >
                {workgroupMembers.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
                <Calendar className="inline size-3 mr-1 -mt-0.5" /> Deadline
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              Werkstroom
            </label>
            <select
              value={workstream}
              onChange={(e) => setWorkstream(e.target.value)}
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            >
              {WORKSTREAMS.map((w) => (
                <option key={w} value={w}>{w.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>

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
              Actie toevoegen
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
