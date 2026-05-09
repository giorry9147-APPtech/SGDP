"use client";

import { useActionState, useState } from "react";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";
import { demoUsers } from "@/lib/auth-data";
import { loginAction, type LoginState } from "./actions";
import { cn } from "@/lib/utils";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [selectedUsername, setSelectedUsername] = useState<string>("edgar.dikan");

  return (
    <form action={formAction} className="space-y-5">
      {/* Werkgroep-cards */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-sr-ink-700 mb-2">
          Selecteer werkgroep-lid
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {demoUsers.map((u) => {
            const initials = u.name.split(" ").map(s => s[0]).join("").slice(0, 2);
            const active = selectedUsername === u.username;
            return (
              <button
                type="button"
                key={u.userId}
                onClick={() => setSelectedUsername(u.username)}
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md border text-left transition-colors",
                  active
                    ? "bg-sr-green-100 border-sr-green-700 ring-1 ring-sr-green-700"
                    : "bg-white border-sr-line hover:bg-sr-green-50",
                )}
              >
                <div className={cn(
                  "size-9 shrink-0 rounded-full flex items-center justify-center text-xs font-bold",
                  u.userId === "WG-01"
                    ? "bg-sr-green-700 text-white"
                    : active
                    ? "bg-sr-green-100 text-sr-green-900 border border-sr-green-700"
                    : "bg-sr-cream text-sr-ink-700 border border-sr-line",
                )}>
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-sr-ink-900 truncate">{u.name}</div>
                  <div className="text-[10px] text-sr-ink-500 truncate">{u.role}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden username (gekoppeld aan selectie) */}
      <input type="hidden" name="username" value={selectedUsername} />

      {/* Wachtwoord */}
      <div>
        <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-sr-ink-700 mb-1.5">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          defaultValue="sgdp2026"
          autoComplete="current-password"
          className="w-full px-3 py-2 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500 focus:border-sr-green-500"
        />
        <p className="mt-1.5 text-[11px] text-sr-ink-500">
          Demo-wachtwoord voor alle accounts: <code className="bg-sr-cream px-1 rounded font-mono text-[10px]">sgdp2026</code>
        </p>
      </div>

      {/* Foutmelding */}
      {state.error && (
        <div className="flex items-start gap-2 p-3 bg-sr-red-50 border border-sr-red-700 rounded-md">
          <AlertCircle className="size-4 text-sr-red-700 shrink-0 mt-0.5" />
          <span className="text-xs text-sr-red-900">{state.error}</span>
        </div>
      )}

      {/* Login-knop */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sr-green-700 hover:bg-sr-green-900 disabled:opacity-60 text-white font-semibold rounded-md text-sm transition-colors"
      >
        {isPending ? (
          <><Loader2 className="size-4 animate-spin" /> Inloggen…</>
        ) : (
          <><LogIn className="size-4" /> Inloggen</>
        )}
      </button>
    </form>
  );
}
