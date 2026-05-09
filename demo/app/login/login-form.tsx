"use client";

import { useActionState, useState } from "react";
import { LogIn, AlertCircle, Loader2, Eye, EyeOff, ArrowRight, Crown } from "lucide-react";
import { demoUsers } from "@/lib/auth-data";
import { loginAction, type LoginState } from "./actions";
import { cn } from "@/lib/utils";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [selectedUsername, setSelectedUsername] = useState<string>("edgar.dikan");
  const [showPassword, setShowPassword] = useState(false);

  const selectedUser = demoUsers.find(u => u.username === selectedUsername);

  return (
    <form action={formAction} className="space-y-5">
      {/* Werkgroep-cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700">
            Werkgroep-lid
          </label>
          <span className="text-[10px] text-sr-ink-300">{demoUsers.length} accounts</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {demoUsers.map((u) => {
            const initials = u.name.split(" ").map(s => s[0]).join("").slice(0, 2);
            const active = selectedUsername === u.username;
            const isVoorzitter = u.userId === "WG-01";
            return (
              <button
                type="button"
                key={u.userId}
                onClick={() => setSelectedUsername(u.username)}
                aria-pressed={active}
                className={cn(
                  "sr-member-card flex items-center gap-2.5 p-2.5 rounded-md border text-left",
                  active
                    ? "is-active"
                    : "bg-white border-sr-line hover:bg-sr-green-50",
                )}
              >
                <div className={cn(
                  "size-8 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold relative",
                  isVoorzitter
                    ? "bg-sr-green-700 text-white"
                    : active
                    ? "bg-sr-green-700 text-white"
                    : "bg-sr-cream text-sr-ink-700 border border-sr-line",
                )}>
                  {initials}
                  {isVoorzitter && (
                    <Crown className="size-2.5 absolute -top-1 -right-1 text-sr-gold-500 fill-sr-gold-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "text-[12px] font-semibold leading-tight truncate",
                    active ? "text-sr-green-900" : "text-sr-ink-900",
                  )}>
                    {u.name}
                  </div>
                  <div className="text-[10px] text-sr-ink-500 truncate leading-tight">
                    {u.role.replace("Lid (", "").replace(")", "").replace("Lid", u.workstream.replace(/_/g, " "))}
                  </div>
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
        <label htmlFor="password" className="block text-[10px] font-bold uppercase tracking-[0.14em] text-sr-ink-700 mb-1.5">
          Wachtwoord
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            defaultValue="sgdp2026"
            autoComplete="current-password"
            className="w-full pl-3 pr-10 py-2.5 border border-sr-line rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sr-green-500 focus:border-sr-green-500 transition-shadow font-mono tracking-wider"
          />
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            tabIndex={-1}
            aria-label={showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-sr-ink-300 hover:text-sr-green-700 hover:bg-sr-green-50 transition-colors"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-sr-ink-500 flex items-center gap-1.5">
          <span>Demo-wachtwoord:</span>
          <code className="bg-sr-cream px-1.5 py-0.5 rounded font-mono text-[10px] border border-sr-line">sgdp2026</code>
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
        className="group w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-sr-green-700 hover:bg-sr-green-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md text-sm transition-all shadow-sm hover:shadow-md"
      >
        {isPending ? (
          <><Loader2 className="size-4 animate-spin" /> Inloggen…</>
        ) : (
          <>
            <LogIn className="size-4" />
            <span>Inloggen als {selectedUser?.name.split(" ")[0]}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
