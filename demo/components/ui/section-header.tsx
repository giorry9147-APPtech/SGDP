import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function SectionHeader({
  title,
  description,
  icon: Icon,
  action,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-4", className)}>
      <div className="flex items-start gap-3 min-w-0">
        {Icon && (
          <div className="size-9 rounded-md bg-sr-green-100 text-sr-green-700 flex items-center justify-center shrink-0">
            <Icon className="size-5" />
          </div>
        )}
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-sr-ink-900 leading-tight">{title}</h2>
          {description && (
            <p className="text-sm text-sr-ink-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4 pb-5 mb-6 border-b border-sr-line", className)}>
      <div>
        {eyebrow && (
          <div className="text-[11px] font-semibold uppercase tracking-wider text-sr-green-700 mb-1">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl font-bold text-sr-ink-900 leading-tight">{title}</h1>
        {description && (
          <p className="text-sm text-sr-ink-500 mt-1.5 max-w-2xl">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 pb-1">{action}</div>}
    </div>
  );
}
