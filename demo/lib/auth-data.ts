/**
 * Client-veilige auth-data (geen `next/headers` import).
 * Wordt gebruikt door zowel client (login-form, app-shell) als server (auth.ts).
 */

export type DemoUser = {
  userId: string;
  username: string;
  password: string;     // demo-only plain
  name: string;
  role: string;
  workstream: string;
};

export const demoUsers: DemoUser[] = [
  { userId: "WG-01", username: "edgar.dikan",      password: "sgdp2026", name: "Edgar Dikan",      role: "Voorzitter / Presidentieel adviseur", workstream: "alle" },
  { userId: "WG-02", username: "armand.jurel",     password: "sgdp2026", name: "Armand Jurel",     role: "Lid",                                workstream: "decentralisatie" },
  { userId: "WG-03", username: "theresia.cirino",  password: "sgdp2026", name: "Theresia Cirino",  role: "Lid",                                workstream: "consultatie" },
  { userId: "WG-04", username: "mike.nerkust",     password: "sgdp2026", name: "Mike Nerkust",     role: "Lid",                                workstream: "inventarisatie_gis" },
  { userId: "WG-05", username: "martin.misiedjan", password: "sgdp2026", name: "Martin Misiedjan", role: "Lid (juridisch)",                    workstream: "juridisch" },
  { userId: "WG-06", username: "sarwan.ramai",     password: "sgdp2026", name: "Sarwan Ramai",     role: "Lid",                                workstream: "decentralisatie" },
];

export function findUserByCredentials(username: string, password: string): DemoUser | null {
  const u = username.trim().toLowerCase();
  return demoUsers.find(c => c.username === u && c.password === password) ?? null;
}

export function findUserById(userId: string): DemoUser | null {
  return demoUsers.find(c => c.userId === userId) ?? null;
}

export const SESSION_COOKIE_NAME = "sgdp-session";
export const SESSION_TTL_SEC = 60 * 60 * 8; // 8 uur
