import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(d: Date | string, opts?: Intl.DateTimeFormatOptions) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("nl-NL", opts ?? { day: "numeric", month: "short", year: "numeric" });
}

export function formatRelativeDays(days: number): string {
  if (days === 0) return "vandaag";
  if (days === 1) return "morgen";
  if (days === -1) return "gisteren";
  if (days > 0) return `over ${days} dagen`;
  return `${Math.abs(days)} dagen geleden`;
}

export function daysBetween(a: Date | string, b: Date | string = new Date()): number {
  const d1 = typeof a === "string" ? new Date(a) : a;
  const d2 = typeof b === "string" ? new Date(b) : b;
  return Math.round((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
}
