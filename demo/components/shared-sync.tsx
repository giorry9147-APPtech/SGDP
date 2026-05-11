"use client";

import { useEffect } from "react";
import { useSgdpStore } from "@/lib/store";

const POLL_INTERVAL_MS = 3000;

/**
 * Bootstrapped de Zustand store met server-side gedeelde state en
 * polt elke paar seconden voor wijzigingen door andere ingelogde
 * leden. Geen UI — wordt 1× in de layout gerenderd voor ingelogde
 * gebruikers.
 */
export function SharedSync() {
  const hydrate = useSgdpStore((s) => s.hydrateFromServer);

  useEffect(() => {
    let cancelled = false;

    async function fetchOnce() {
      try {
        const res = await fetch("/api/shared", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) hydrate(data);
      } catch {
        // Stil falen — volgende poll probeert opnieuw.
      }
    }

    fetchOnce();
    const id = window.setInterval(fetchOnce, POLL_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") fetchOnce();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [hydrate]);

  return null;
}
