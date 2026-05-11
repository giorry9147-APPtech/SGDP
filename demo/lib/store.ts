"use client";

import { create } from "zustand";
import type { Meeting, Decision, ActionItem } from "./demo-data";
import type { DocumentMeta, EntityType } from "./shared-types";
import type { SharedAction } from "./shared-state-client";

export type { DocumentMeta, EntityType };

/**
 * Demo-mutaties — Zustand store, gevuld vanuit `/api/shared`.
 *
 * Vergaderingen, besluiten, actiepunten en document-uploads worden
 * server-side in één JSON-bestand bewaard. Elke ingelogde gebruiker
 * (op welke browser/device dan ook) ziet hetzelfde via initial fetch
 * + polling in `components/shared-sync.tsx`.
 *
 * Mutaties zijn optimistisch: lokaal direct toegepast, POST naar
 * server in de achtergrond. Bij fout: revert + tonen via console.
 * Productie: vervangen door database + objectstore.
 */

// Max bestandsgrootte die we inline (base64) meesturen naar de server.
// Base64 voegt ~33% toe; 3 MB origineel ≈ 4 MB op disk per document.
const MAX_INLINE_BYTES = 3 * 1024 * 1024;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function postAction(action: SharedAction) {
  const res = await fetch("/api/shared", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action),
  });
  if (!res.ok) throw new Error(`POST /api/shared faalde: ${res.status}`);
  return res.json() as Promise<{
    version: number;
    addedMeetings: Meeting[];
    addedDecisions: Decision[];
    addedActionItems: ActionItem[];
    documents: DocumentMeta[];
  }>;
}

type SgdpStore = {
  version: number;
  addedMeetings: Meeting[];
  addedDecisions: Decision[];
  addedActionItems: ActionItem[];
  documents: DocumentMeta[];

  // Server-bootstrapping
  hydrateFromServer: (snapshot: {
    version: number;
    addedMeetings: Meeting[];
    addedDecisions: Decision[];
    addedActionItems: ActionItem[];
    documents: DocumentMeta[];
  }) => void;

  // Mutaties (optimistisch + POST)
  addMeeting: (m: Meeting) => Promise<void>;
  removeMeeting: (id: string) => Promise<void>;
  addDecision: (d: Decision) => Promise<void>;
  removeDecision: (id: string) => Promise<void>;
  addActionItem: (a: ActionItem) => Promise<void>;
  removeActionItem: (id: string) => Promise<void>;
  addDocuments: (
    entityType: EntityType,
    entityId: string,
    files: File[],
    user: { userId: string; name: string },
  ) => Promise<void>;
  removeDocument: (id: string) => Promise<void>;
};

export const useSgdpStore = create<SgdpStore>()((set, get) => ({
  version: 0,
  addedMeetings: [],
  addedDecisions: [],
  addedActionItems: [],
  documents: [],

  hydrateFromServer: (snapshot) => {
    // Alleen bijwerken als server een nieuwere versie heeft, zodat een
    // poll die net na een optimistische write binnenkomt geen oudere
    // toestand terugzet.
    if (snapshot.version >= get().version) set({ ...snapshot });
  },

  addMeeting: async (m) => {
    set((s) => ({ addedMeetings: [m, ...s.addedMeetings] }));
    try {
      const next = await postAction({ type: "addMeeting", payload: m });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set((s) => ({ addedMeetings: s.addedMeetings.filter((x) => x.id !== m.id) }));
    }
  },

  removeMeeting: async (id) => {
    const snapshot = get();
    set({
      addedMeetings: snapshot.addedMeetings.filter((x) => x.id !== id),
      addedDecisions: snapshot.addedDecisions.filter((d) => d.meetingId !== id),
      addedActionItems: snapshot.addedActionItems.filter((a) => a.meetingId !== id),
    });
    try {
      const next = await postAction({ type: "removeMeeting", payload: { id } });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set({
        addedMeetings: snapshot.addedMeetings,
        addedDecisions: snapshot.addedDecisions,
        addedActionItems: snapshot.addedActionItems,
      });
    }
  },

  addDecision: async (d) => {
    set((s) => ({ addedDecisions: [d, ...s.addedDecisions] }));
    try {
      const next = await postAction({ type: "addDecision", payload: d });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set((s) => ({ addedDecisions: s.addedDecisions.filter((x) => x.id !== d.id) }));
    }
  },

  removeDecision: async (id) => {
    const before = get().addedDecisions;
    set({ addedDecisions: before.filter((x) => x.id !== id) });
    try {
      const next = await postAction({ type: "removeDecision", payload: { id } });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set({ addedDecisions: before });
    }
  },

  addActionItem: async (a) => {
    set((s) => ({ addedActionItems: [a, ...s.addedActionItems] }));
    try {
      const next = await postAction({ type: "addActionItem", payload: a });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set((s) => ({ addedActionItems: s.addedActionItems.filter((x) => x.id !== a.id) }));
    }
  },

  removeActionItem: async (id) => {
    const before = get().addedActionItems;
    set({ addedActionItems: before.filter((x) => x.id !== id) });
    try {
      const next = await postAction({ type: "removeActionItem", payload: { id } });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set({ addedActionItems: before });
    }
  },

  addDocuments: async (entityType, entityId, files, user) => {
    const docs: DocumentMeta[] = await Promise.all(
      files.map(async (f, i) => {
        const dataUrl =
          f.size <= MAX_INLINE_BYTES ? await fileToDataUrl(f) : undefined;
        return {
          id: `DOC-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
          entityType,
          entityId,
          name: f.name,
          size: f.size,
          mimeType: f.type || "application/octet-stream",
          uploadedAt: new Date().toISOString(),
          uploadedByUserId: user.userId,
          uploadedByName: user.name,
          dataUrl,
        };
      }),
    );
    set((s) => ({ documents: [...docs, ...s.documents] }));
    try {
      const next = await postAction({ type: "addDocuments", payload: { docs } });
      set({ ...next });
    } catch (err) {
      console.error(err);
      const ids = new Set(docs.map((d) => d.id));
      set((s) => ({ documents: s.documents.filter((d) => !ids.has(d.id)) }));
    }
  },

  removeDocument: async (id) => {
    const before = get().documents;
    set({ documents: before.filter((d) => d.id !== id) });
    try {
      const next = await postAction({ type: "removeDocument", payload: { id } });
      set({ ...next });
    } catch (err) {
      console.error(err);
      set({ documents: before });
    }
  },
}));
