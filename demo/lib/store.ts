"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Meeting } from "./demo-data";

/**
 * Demo-mutaties — Zustand store met localStorage-persistence.
 *
 * Bevat door de gebruiker toegevoegde vergaderingen + alle document-uploads.
 * Bestand-metadata is persistent (overleeft refresh); de bestandsinhoud
 * zelf wordt niet bewaard (in productie: MinIO/S3 met PKI/QR).
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
  // Vergaderingen door gebruiker toegevoegd
  addedMeetings: Meeting[];
  addMeeting: (m: Meeting) => void;
  removeMeeting: (id: string) => void;

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
        set((s) => ({ addedMeetings: s.addedMeetings.filter((x) => x.id !== id) })),

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
    { name: "sgdp-store-v1" },
  ),
);
