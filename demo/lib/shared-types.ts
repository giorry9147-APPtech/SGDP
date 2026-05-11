/**
 * Gedeeld door client en server. Geen `server-only`/`client-only` imports.
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
  // Base64 data-URL voor bestanden ≤ 3 MB. Ontbreekt bij te grote bestanden.
  dataUrl?: string;
};
