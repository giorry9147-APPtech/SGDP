/**
 * Client-/server-safe types voor het `/api/shared`-contract.
 * Geen `server-only` imports — wordt door zowel route handler als
 * Zustand store gebruikt.
 */

import type { Meeting, Decision, ActionItem } from "./demo-data";
import type { DocumentMeta } from "./shared-types";

export type SharedAction =
  | { type: "addMeeting";       payload: Meeting }
  | { type: "removeMeeting";    payload: { id: string } }
  | { type: "addDecision";      payload: Decision }
  | { type: "removeDecision";   payload: { id: string } }
  | { type: "addActionItem";    payload: ActionItem }
  | { type: "removeActionItem"; payload: { id: string } }
  | { type: "addDocuments";     payload: { docs: DocumentMeta[] } }
  | { type: "removeDocument";   payload: { id: string } };
