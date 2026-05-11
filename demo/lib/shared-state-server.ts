// Server-only: gebruikt node:fs en mag NIET door client-code worden
// geïmporteerd. De `server-only`-marker is hier weggelaten omdat het
// pakket niet in node_modules staat; het bestand wordt alleen door
// `app/api/shared/route.ts` geïmporteerd.
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Meeting, Decision, ActionItem } from "./demo-data";
import type { DocumentMeta } from "./shared-types";
import type { SharedAction } from "./shared-state-client";

export type { SharedAction };

/**
 * Server-side persistent state voor alle gebruiker-toegevoegde data
 * (vergaderingen, besluiten, actiepunten, document-uploads).
 *
 * Eén JSON-bestand op disk; alle ingelogde leden zien hetzelfde via
 * de polling client in `components/shared-sync.tsx`.
 *
 * Geschikt voor demo (één server-proces, lokale of single-tenant deploy).
 * Productie: vervangen door database + objectstore.
 */

export type SharedState = {
  version: number;
  addedMeetings: Meeting[];
  addedDecisions: Decision[];
  addedActionItems: ActionItem[];
  documents: DocumentMeta[];
};

const EMPTY: SharedState = {
  version: 0,
  addedMeetings: [],
  addedDecisions: [],
  addedActionItems: [],
  documents: [],
};

const STATE_FILE = path.resolve(process.cwd(), ".shared-state.json");

let lock: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const next = lock.then(fn, fn);
  lock = next.catch(() => {});
  return next;
}

async function readFile(): Promise<SharedState> {
  try {
    const raw = await fs.readFile(STATE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<SharedState>;
    return { ...EMPTY, ...parsed };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return { ...EMPTY };
    throw err;
  }
}

async function writeFile(state: SharedState): Promise<void> {
  const tmp = `${STATE_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(state), "utf8");
  await fs.rename(tmp, STATE_FILE);
}

export function readState(): Promise<SharedState> {
  return withLock(readFile);
}

function apply(state: SharedState, action: SharedAction): SharedState {
  switch (action.type) {
    case "addMeeting":
      if (state.addedMeetings.some((m) => m.id === action.payload.id)) return state;
      return { ...state, addedMeetings: [action.payload, ...state.addedMeetings] };
    case "removeMeeting":
      return {
        ...state,
        addedMeetings: state.addedMeetings.filter((m) => m.id !== action.payload.id),
        addedDecisions: state.addedDecisions.filter((d) => d.meetingId !== action.payload.id),
        addedActionItems: state.addedActionItems.filter((a) => a.meetingId !== action.payload.id),
      };
    case "addDecision":
      if (state.addedDecisions.some((d) => d.id === action.payload.id)) return state;
      return { ...state, addedDecisions: [action.payload, ...state.addedDecisions] };
    case "removeDecision":
      return {
        ...state,
        addedDecisions: state.addedDecisions.filter((d) => d.id !== action.payload.id),
      };
    case "addActionItem":
      if (state.addedActionItems.some((a) => a.id === action.payload.id)) return state;
      return { ...state, addedActionItems: [action.payload, ...state.addedActionItems] };
    case "removeActionItem":
      return {
        ...state,
        addedActionItems: state.addedActionItems.filter((a) => a.id !== action.payload.id),
      };
    case "addDocuments": {
      const seen = new Set(state.documents.map((d) => d.id));
      const fresh = action.payload.docs.filter((d) => !seen.has(d.id));
      return { ...state, documents: [...fresh, ...state.documents] };
    }
    case "removeDocument":
      return {
        ...state,
        documents: state.documents.filter((d) => d.id !== action.payload.id),
      };
  }
}

export function dispatch(action: SharedAction): Promise<SharedState> {
  return withLock(async () => {
    const current = await readFile();
    const next = apply(current, action);
    if (next === current) return current;
    const written: SharedState = { ...next, version: current.version + 1 };
    await writeFile(written);
    return written;
  });
}
