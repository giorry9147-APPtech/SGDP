"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Meeting, Decision, ActionItem } from "./demo-data";

/**
 * Demo-mutaties — Zustand store met localStorage-persistence.
 *
 * Bevat door de gebruiker toegevoegde vergaderingen, besluiten,
 * actiepunten + alle document-uploads. Bestand-metadata is persistent
 * (overleeft refresh); de bestandsinhoud zelf wordt niet bewaard
 * (in productie: MinIO/S3 met PKI/QR).
 */

export type EntityType =
  | "meeting"
  | "fpic_event"
  | "fpic_process"
  | "case"
  | "decision"
  | "action"
  | "env_case"
  | "tenure"
  | "conversion"
  | "forfeiture";

export type DocumentMeta = {
  id: string;
  entityType: EntityType;
  entityId: string;
  name: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  uploadedByUserId: string;
  uploadedByName: string;
};

type SgdpStore = {
  // Vergaderingen
  addedMeetings: Meeting[];
  addMeeting: (m: Meeting) => void;
  removeMeeting: (id: string) => void;

  // Besluiten
  addedDecisions: Decision[];
  addDecision: (d: Decision) => void;
  removeDecision: (id: string) => void;

  // Actiepunten
  addedActionItems: ActionItem[];
  addActionItem: (a: ActionItem) => void;
  removeActionItem: (id: string) => void;

  // Document-uploads (alleen metadata persistent)
  documents: DocumentMeta[];
  addDocuments: (
    entityType: EntityType,
    entityId: string,
    files: File[],
    user: { userId: string; name: string },
  ) => void;
  removeDocument: (id: string) => void;
};

export const useSgdpStore = create<SgdpStore>()(
  persist(
    (set) => ({
      addedMeetings: [],
      addMeeting: (m) =>
        set((s) => ({ addedMeetings: [m, ...s.addedMeetings] })),
      removeMeeting: (id) =>
        set((s) => ({
          addedMeetings: s.addedMeetings.filter((x) => x.id !== id),
          addedDecisions: s.addedDecisions.filter((d) => d.meetingId !== id),
          addedActionItems: s.addedActionItems.filter((a) => a.meetingId !== id),
        })),

      addedDecisions: [],
      addDecision: (d) =>
        set((s) => ({ addedDecisions: [d, ...s.addedDecisions] })),
      removeDecision: (id) =>
        set((s) => ({ addedDecisions: s.addedDecisions.filter((x) => x.id !== id) })),

      addedActionItems: [],
      addActionItem: (a) =>
        set((s) => ({ addedActionItems: [a, ...s.addedActionItems] })),
      removeActionItem: (id) =>
        set((s) => ({ addedActionItems: s.addedActionItems.filter((x) => x.id !== id) })),

      documents: [],
      addDocuments: (entityType, entityId, files, user) => {
        const newDocs: DocumentMeta[] = files.map((f, i) => ({
          id: `DOC-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
          entityType,
          entityId,
          name: f.name,
          size: f.size,
          mimeType: f.type || "application/octet-stream",
          uploadedAt: new Date().toISOString(),
          uploadedByUserId: user.userId,
          uploadedByName: user.name,
        }));
        set((s) => ({ documents: [...newDocs, ...s.documents] }));
      },
      removeDocument: (id) =>
        set((s) => ({ documents: s.documents.filter((d) => d.id !== id) })),
    }),
    { name: "sgdp-store-v2" },
  ),
);
