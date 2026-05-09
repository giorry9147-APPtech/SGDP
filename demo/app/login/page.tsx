import {
  AlertCircle, ShieldCheck, Scale, Globe2, Users, Lock,
} from "lucide-react";
import { LoginForm } from "./login-form";

export const metadata = { title: "Inloggen — SGDP" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sr-cream">
      <div className="sr-flag-bar" />

      <div className="flex-1 grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* ─── BRAND PANEL (links) ─────────────────────────── */}
        <aside className="relative sr-brand-panel text-white overflow-hidden hidden lg:flex flex-col">
          {/* Subtiele patroon-overlay */}
          <div className="absolute inset-0 sr-brand-pattern pointer-events-none" />

          {/* Goud-accent strip rechts */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1 opacity-60"
            style={{ background: "linear-gradient(to bottom, transparent, var(--sr-gold-500), transparent)" }}
          />

          <div className="relative flex-1 flex flex-col px-12 xl:px-16 pt-6 xl:pt-8 pb-12 xl:pb-16">
            {/* Top — institutioneel */}
            <div className="flex items-center gap-3 sr-fade-up">
              <span className="sr-coa-large">SR</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-sr-gold-500/90">
                  Republiek Suriname
                </div>
                <div className="text-sm font-semibold text-white/90">
                  Kabinet van de President
                </div>
              </div>
            </div>

            {/* Midden — kernboodschap */}
            <div className="flex-1 flex flex-col justify-center max-w-xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-sr-gold-500 mb-3 sr-fade-up-1">
                Werkarm van het Staatshoofd
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold leading-[1.05] mb-5 sr-fade-up-1">
                Grondenrechten
                <br />
                <span className="text-sr-gold-500">&amp; Decentralisatie</span>
                <br />
                Platform
              </h1>
              <p className="text-base xl:text-lg text-white/80 leading-relaxed mb-10 max-w-lg sr-fade-up-2">
                Eén werkomgeving voor de Werkgroep Grondenrechten en Decentralisatie:
                kaart, dossiers, FPIC, conflictdetectie en regelgebaseerd advies —
                met respect voor traditioneel gezag en IACHR-jurisprudentie.
              </p>

              {/* Kernwaarden */}
              <ul className="space-y-3 max-w-md sr-fade-up-3">
                <Pillar icon={Users}      title="FPIC by design"     desc="ITP-gemeenschappen zijn co-eigenaar van hun data." />
                <Pillar icon={ShieldCheck} title="Audit by default"   desc="Append-only log met cryptografische hash-keten." />
                <Pillar icon={Scale}       title="Uitlegbaar advies"   desc="22 transparante regels — geen black-box AI." />
                <Pillar icon={Globe2}      title="Federatief mandaat"  desc="MI-GLIS, GBB, NMA — elk binnen eigen bevoegdheid." />
              </ul>
            </div>

            {/* Footer — mandaat */}
            <div className="flex items-center justify-between text-[11px] text-white/50 pt-8 border-t border-white/10 sr-fade-up-3">
              <div>Mandaat dec. 2025 — okt. 2026</div>
              <div className="font-mono">v0.2.0 · ruleset 1.0.0</div>
            </div>
          </div>
        </aside>

        {/* ─── LOGIN PANEL (rechts) ────────────────────────── */}
        <main className="flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-sr-cream">
          <div className="w-full max-w-md">
            {/* Mobiele kop (alleen <lg) */}
            <div className="lg:hidden mb-6 text-center sr-fade-up">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="sr-coa">SR</span>
                <div className="text-left">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-sr-green-900">
                    Republiek Suriname · Kabinet van de President
                  </div>
                  <div className="text-base font-bold text-sr-ink-900 leading-tight">
                    SGDP — Grondenrechten &amp; Decentralisatie
                  </div>
                </div>
              </div>
            </div>

            {/* Welkom — desktop */}
            <div className="mb-6 sr-fade-up-1 hidden lg:block">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-sr-green-700 mb-2">
                Werkgroep-toegang
              </div>
              <h2 className="text-2xl font-bold text-sr-ink-900 leading-tight mb-1.5">
                Welkom terug
              </h2>
              <p className="text-sm text-sr-ink-500">
                Selecteer uw account om door te gaan.
              </p>
            </div>

            {/* Form-card */}
            <div className="sr-glass-card p-6 sm:p-7 sr-fade-up-2">
              <div className="lg:hidden flex items-center gap-2 mb-5 pb-3 border-b border-sr-line">
                <Lock className="size-4 text-sr-green-700" />
                <h1 className="text-base font-semibold text-sr-ink-900">Werkgroep-toegang</h1>
              </div>

              <LoginForm />
            </div>

            {/* Demo-banner */}
            <div className="mt-5 flex items-start gap-2.5 p-3.5 bg-sr-gold-100/60 border border-sr-gold-600/50 rounded-lg sr-fade-up-3">
              <AlertCircle className="size-4 text-sr-gold-700 shrink-0 mt-0.5" />
              <div className="text-[11px] text-sr-ink-700 leading-relaxed">
                <strong className="text-sr-gold-700">DEMO — niet voor besluitvorming.</strong>{" "}
                Alle data is fictief en gelabeld &quot;DEMO_…&quot;. Conform doc 07 §7.5
                uitnodiging-only fixed credentials. In productie: Surinaamse Digitale-ID
                met OIDC + MFA.
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="sr-flag-bar" />
    </div>
  );
}

/* ─── Sub-components ─────────────────────────── */

function Pillar({
  icon: Icon, title, desc,
}: {
  icon: typeof Users; title: string; desc: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="size-8 rounded-md shrink-0 flex items-center justify-center bg-white/10 border border-white/20">
        <Icon className="size-4 text-sr-gold-500" />
      </div>
      <div className="min-w-0 pt-0.5">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-[12px] text-white/60 leading-snug">{desc}</div>
      </div>
    </li>
  );
}
