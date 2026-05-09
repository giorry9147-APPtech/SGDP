"use client";

import { useState } from "react";
import { Plus, Vote } from "lucide-react";
import {
  Dialog, DialogContent, DialogTrigger, DialogClose,
} from "@/components/ui/dialog";
import { useSgdpStore } from "@/lib/store";
import type { Decision } from "@/lib/demo-data";

const STATUSES: { value: Decision["status"]; label: string }[] = [
  { value: "open",          label: "Open" },
  { value: "in_uitvoering", label: "In uitvoering" },
  { value: "voltooid",      label: "Voltooid" },
  { value: "ingetrokken",   label: "Ingetrokken" },
];

export function NewDecisionDialog({
  meetingId,
  meetingDate,
}: {
  meetingId: string;
  meetingDate: string;
}) {
  const addDecision = useSgdpStore((s) => s.addDecision);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [outcome, setOutcome] = useState("");
  const [voteFor, setVoteFor] = useState(6);
  const [voteAgainst, setVoteAgainst] = useState(0);
  const [voteAbstain, setVoteAbstain] = useState(0);
  const [status, setStatus] = useState<Decision["status"]>("in_uitvoering");
  const [linkedCases, setLinkedCases] = useState("");

  const reset = () => {
    setTitle("");
    setOutcome("");
    setVoteFor(6);
    setVoteAgainst(0);
    setVoteAbstain(0);
    setStatus("in_uitvoering");
    setLinkedCases("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDecision: Decision = {
      id: `BES-USER-${Date.now()}`,
      meetingId,
      date: meetingDate,
      title: title.trim(),
      outcome: outcome.trim(),
      vote: { for: voteFor, against: voteAgainst, abstain: voteAbstain },
      status,
      linkedCases: linkedCases.split(",").map((s) => s.trim()).filter(Boolean),
    };
    addDecision(newDecision);
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
          Besluit
        </button>
      </DialogTrigger>
      <DialogContent
        title="Besluit registreren"
        description="Met stemverhouding (voor-tegen-onthouding). Doc 02 §2.3.3."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              <Vote className="inline size-3 mr-1 -mt-0.5" /> Titel besluit
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Conceptrapport President gereed voor 18 mei"
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              Uitkomst / motivatie
            </label>
            <textarea
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              rows={3}
              required
              placeholder="Werkgroep stemt unaniem in met..."
              className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
              Stemverhouding (voor / tegen / onthouding)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min={0}
                value={voteFor}
                onChange={(e) => setVoteFor(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-sr-green-50 focus:outline-none focus:ring-2 focus:ring-sr-green-500 font-mono text-center"
              />
              <input
                type="number"
                min={0}
                value={voteAgainst}
                onChange={(e) => setVoteAgainst(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-sr-red-50 focus:outline-none focus:ring-2 focus:ring-sr-green-500 font-mono text-center"
              />
              <input
                type="number"
                min={0}
                value={voteAbstain}
                onChange={(e) => setVoteAbstain(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-sr-cream focus:outline-none focus:ring-2 focus:ring-sr-green-500 font-mono text-center"
              />
            </div>
            <p className="mt-1 text-[10px] text-sr-ink-500">
              Quorum = 4 van 6 leden (doc 01 §1.8). Voorzitter doorslag bij staking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Decision["status"])}
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5 block">
                Gekoppelde dossiers <span className="text-sr-ink-300 font-normal lowercase">(IDs, komma-gescheiden)</span>
              </label>
              <input
                type="text"
                value={linkedCases}
                onChange={(e) => setLinkedCases(e.target.value)}
                placeholder="APP-2026-009, FPIC-002"
                className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500 font-mono text-xs"
              />
            </div>
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
              Besluit vastleggen
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
