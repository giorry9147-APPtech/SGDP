import "server-only";
import { cookies } from "next/headers";
import {
  findUserByCredentials, findUserById, SESSION_COOKIE_NAME, SESSION_TTL_SEC,
  type DemoUser,
} from "./auth-data";

/**
 * Server-only auth-helpers.
 *
 * Conform doc 07 §7.5: "uitnodiging-only, fixed credentials voor werkgroepleden".
 * NIET PRODUCTIE-VEILIG. In productie (doc 09 §9.3.4):
 * Keycloak / Surinaamse Digitale-ID met OIDC + MFA.
 */

export type { DemoUser };

export function validateCredentials(username: string, password: string): DemoUser | null {
  return findUserByCredentials(username, password);
}

export async function getCurrentUser(): Promise<DemoUser | null> {
  const store = await cookies();
  const userId = store.get(SESSION_COOKIE_NAME)?.value;
  if (!userId) return null;
  return findUserById(userId);
}

export async function setSession(userId: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SEC,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}
