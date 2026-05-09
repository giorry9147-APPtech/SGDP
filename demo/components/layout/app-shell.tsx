"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, Map, FileText, Users, Workflow, FolderOpen,
  Building2, ShieldCheck, ScrollText, AlertCircle, ChevronRight,
  Repeat, Leaf, LogOut, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/login/actions";
import type { DemoUser } from "@/lib/auth-data";
import { UserProvider } from "@/components/user-context";

const nav = [
  { href: "/",                label: "Executive Dashboard", icon: LayoutDashboard, badge: "PRESIDENT" },
  { href: "/kaart",           label: "GIS-kaart",            icon: Map },
  { href: "/aanvragen",       label: "Aanvragen & Advies",   icon: FileText, hot: true },
  { href: "/fpic",            label: "FPIC & Consultatie",   icon: Users,    hot: true },
  { href: "/dossiers",        label: "Dossiers",             icon: FolderOpen },
  { href: "/grondhuur",       label: "Grondhuur & Conversie", icon: Repeat },
  { href: "/milieu",          label: "Milieu & NMA",         icon: Leaf },
  { href: "/werkgroep",       label: "Werkgroep",            icon: Workflow },
  { href: "/stakeholders",    label: "Stakeholders",         icon: Building2 },
  { href: "/audit",           label: "Audit Trail",          icon: ShieldCheck },
  { href: "/regels",          label: "Adviesregels",         icon: ScrollText },
];

export function AppShell({ children, user }: { children: React.ReactNode; user: DemoUser }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-sr-cream">
      {/* Officiële Surinaamse vlag-strip bovenaan */}
      <div className="sr-flag-bar" />

      {/* Officiële header */}
      <header className="bg-white border-b border-sr-line shadow-sm">
        <div className="px-6 py-3 flex items-center gap-4">
          <div className="sr-coa">
            <span style={{ lineHeight: 1 }}>SR</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-sr-green-900 uppercase">
              <span>Republiek Suriname</span>
              <span className="text-sr-ink-300">•</span>
              <span className="text-sr-red-700">Kabinet van de President</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-xl font-bold text-sr-ink-900 leading-tight">
                SGDP — Grondenrechten &amp; Decentralisatie Platform
              </h1>
              <span className="text-xs text-sr-ink-500 italic">
                Werkarm van het Staatshoofd
              </span>
            </div>
          </div>

          {/* Demo-banner rechtsboven */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-sr-gold-100 border border-sr-gold-600">
            <AlertCircle className="size-4 text-sr-gold-700" />
            <div className="text-[11px] leading-tight">
              <div className="font-semibold text-sr-gold-700">DEMO — niet voor besluitvorming</div>
              <div className="text-sr-ink-500">Alle data fictief, gelabeld &quot;DEMO_…&quot;</div>
            </div>
          </div>

          <UserMenu user={user} />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-sr-line flex flex-col">
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto sr-scrollbar">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                    active
                      ? "bg-sr-green-100 text-sr-green-900 font-medium"
                      : "text-sr-ink-700 hover:bg-sr-green-50",
                  )}
                >
                  <Icon className={cn(
                    "size-4 shrink-0",
                    active ? "text-sr-green-700" : "text-sr-ink-500 group-hover:text-sr-green-700",
                  )} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hot && (
                    <span className="size-1.5 rounded-full bg-sr-red-700 sr-pulse" />
                  )}
                  {item.badge && (
                    <span className="text-[9px] font-bold tracking-wider bg-sr-gold-500 text-sr-ink-900 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                  {active && <ChevronRight className="size-3.5 text-sr-green-700" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer-info sidebar */}
          <div className="px-4 py-3 border-t border-sr-line text-[11px] text-sr-ink-500 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-sr-green-500 sr-pulse" />
              <span>Werkgroep actief — Fase F2 / F3</span>
            </div>
            <div>Mandaat: dec. 2025 — okt. 2026</div>
            <div className="flex items-center gap-1 text-sr-ink-300 pt-1">
              <span>v0.1.0 · ruleset 1.0.0</span>
            </div>
          </div>
        </aside>

        {/* Hoofdgebied */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <UserProvider user={user}>{children}</UserProvider>
        </main>
      </div>

      {/* Vlag-strip onderaan */}
      <div className="sr-flag-bar" />
    </div>
  );
}

function UserMenu({ user }: { user: DemoUser }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const initials = user.name.split(" ").map(s => s[0]).join("").slice(0, 2);
  const isVoorzitter = user.userId === "WG-01";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 border rounded-md bg-white hover:bg-sr-green-50 transition-colors",
          open ? "border-sr-green-700 ring-1 ring-sr-green-700" : "border-sr-line",
        )}
      >
        <div className={cn(
          "size-7 rounded-full flex items-center justify-center text-[11px] font-semibold",
          isVoorzitter ? "bg-sr-green-700 text-white" : "bg-sr-green-100 text-sr-green-900 border border-sr-green-500",
        )}>
          {initials}
        </div>
        <div className="text-[11px] leading-tight text-left">
          <div className="font-semibold text-sr-ink-900">{user.name}</div>
          <div className="text-sr-ink-500 truncate max-w-[180px]">{user.role}</div>
        </div>
        <ChevronDown className={cn(
          "size-3.5 text-sr-ink-500 transition-transform",
          open && "rotate-180",
        )} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-72 sr-card shadow-lg z-50 overflow-hidden">
          <div className="px-3 py-3 border-b border-sr-line bg-sr-cream">
            <div className="text-[10px] font-bold uppercase tracking-wider text-sr-ink-500 mb-1">
              Ingelogd als
            </div>
            <div className="text-sm font-semibold text-sr-ink-900">{user.name}</div>
            <div className="text-xs text-sr-ink-500">{user.role}</div>
            <div className="text-[10px] text-sr-ink-300 mt-1.5 font-mono flex items-center gap-2">
              <span>{user.userId}</span>
              <span>·</span>
              <span>workstream: {user.workstream.replace(/_/g, " ")}</span>
            </div>
          </div>

          <div className="px-3 py-2 text-[11px] text-sr-ink-500 leading-relaxed">
            <strong className="text-sr-ink-700">Demo-sessie.</strong> In productie:
            Surinaamse Digitale-ID met OIDC + MFA (doc 09 §9.3.4).
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-sr-red-900 hover:bg-sr-red-50 border-t border-sr-line transition-colors"
            >
              <LogOut className="size-4 text-sr-red-700" />
              <span>Uitloggen</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
