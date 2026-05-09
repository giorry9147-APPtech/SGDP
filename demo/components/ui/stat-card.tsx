import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  icon?: LucideIcon;
  trend?: { value: string; direction: "up" | "down" | "flat" };
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}) {
  const variantStyles = {
    default: "border-sr-line",
    success: "border-sr-green-500 bg-sr-green-50",
    warning: "border-sr-gold-600 bg-sr-gold-100/30",
    danger:  "border-sr-red-700 bg-sr-red-50",
  } as const;

  const valueColor = {
    default: "text-sr-ink-900",
    success: "text-sr-green-900",
    warning: "text-sr-gold-700",
    danger:  "text-sr-red-900",
  } as const;

  return (
    <div className={cn(
      "sr-card sr-tile p-4 flex flex-col",
      variantStyles[variant],
      className,
    )}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-sr-ink-500">
          {label}
        </div>
        {Icon && <Icon className="size-4 text-sr-ink-300" />}
      </div>
      <div className={cn("text-3xl font-bold leading-none mb-1.5", valueColor[variant])}>
        {value}
      </div>
      {sub && (
        <div className="text-xs text-sr-ink-500">{sub}</div>
      )}
      {trend && (
        <div className={cn(
          "text-[11px] mt-1.5 flex items-center gap-1",
          trend.direction === "up" ? "text-sr-green-700" :
          trend.direction === "down" ? "text-sr-red-700" : "text-sr-ink-500",
        )}>
          {trend.direction === "up" ? "▲" : trend.direction === "down" ? "▼" : "—"} {trend.value}
        </div>
      )}
    </div>
  );
}
