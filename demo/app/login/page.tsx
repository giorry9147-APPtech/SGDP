import { AlertCircle, Lock } from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata = { title: "Inloggen — SGDP" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sr-cream">
      <div className="sr-flag-bar" />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Officiële kop */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="sr-coa">
              <span style={{ lineHeight: 1 }}>SR</span>
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sr-green-900">
                Republiek Suriname · Kabinet van de President
              </div>
              <div className="text-lg font-bold text-sr-ink-900 leading-tight">
                SGDP — Grondenrechten &amp; Decentralisatie Platform
              </div>
              <div className="text-xs text-sr-ink-500 italic">Werkarm van het Staatshoofd</div>
            </div>
          </div>

          <div className="sr-card p-6">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-sr-line">
              <Lock className="size-4 text-sr-green-700" />
              <h1 className="text-base font-semibold text-sr-ink-900">Werkgroep-toegang</h1>
            </div>

            <LoginForm />
          </div>

          {/* Demo-banner */}
          <div className="mt-4 flex items-start gap-2 p-3 bg-sr-gold-100 border border-sr-gold-600 rounded-md">
            <AlertCircle className="size-4 text-sr-gold-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-sr-ink-700 leading-relaxed">
              <strong className="text-sr-gold-700">DEMO — niet voor besluitvorming.</strong>{" "}
              Alle data zijn fictief en gelabeld &quot;DEMO_…&quot;. Conform doc 07 §7.5 zijn dit
              uitnodiging-only fixed credentials voor de zes werkgroep-leden.
              In productie wordt dit Keycloak/Surinaamse Digitale-ID met OIDC + MFA.
            </div>
          </div>

          <div className="mt-3 text-center text-[10px] text-sr-ink-300">
            v0.2.0 · ruleset 1.0.0 · Mandaat dec. 2025 — okt. 2026
          </div>
        </div>
      </main>

      <div className="sr-flag-bar" />
    </div>
  );
}
