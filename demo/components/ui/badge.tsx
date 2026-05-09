import { cn } from "@/lib/utils";

type Variant =
  | "default" | "outline"
  | "risk-low" | "risk-medium" | "risk-high" | "risk-critical"
  | "status-pending" | "status-active" | "status-blocked" | "status-fpic"
  | "green" | "red" | "gold" | "neutral";

const variants: Record<Variant, string> = {
  default:           "bg-sr-ink-100 text-sr-ink-700 border border-sr-line",
  outline:           "bg-transparent text-sr-ink-700 border border-sr-ink-300",
  "risk-low":        "sr-risk-low",
  "risk-medium":     "sr-risk-medium",
  "risk-high":       "sr-risk-high",
  "risk-critical":   "sr-risk-critical",
  "status-pending":  "sr-status-pending",
  "status-active":   "sr-status-active",
  "status-blocked":  "sr-status-blocked",
  "status-fpic":     "sr-status-fpic",
  green:             "bg-sr-green-100 text-sr-green-900 border border-sr-green-500",
  red:               "bg-sr-red-100 text-sr-red-900 border border-sr-red-700",
  gold:              "bg-sr-gold-100 text-sr-gold-700 border border-sr-gold-600",
  neutral:           "bg-sr-ink-100 text-sr-ink-700 border border-sr-line",
};

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium leading-tight",
      variants[variant],
      className,
    )}>
      {children}
    </span>
  );
}

export function riskVariant(level: "laag" | "middel" | "hoog" | "zeer_hoog"): Variant {
  switch (level) {
    case "laag":      return "risk-low";
    case "middel":    return "risk-medium";
    case "hoog":      return "risk-high";
    case "zeer_hoog": return "risk-critical";
  }
}

export function riskLabel(level: "laag" | "middel" | "hoog" | "zeer_hoog"): string {
  switch (level) {
    case "laag":      return "Laag";
    case "middel":    return "Middel";
    case "hoog":      return "Hoog";
    case "zeer_hoog": return "Zeer hoog";
  }
}
