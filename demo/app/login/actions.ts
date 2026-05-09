"use server";

import { redirect } from "next/navigation";
import { validateCredentials, setSession, clearSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const user = validateCredentials(username, password);
  if (!user) {
    return { error: "Ongeldige gebruikersnaam of wachtwoord." };
  }

  await setSession(user.userId);
  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
