"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  children,
  title,
  description,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-[calc(100vw-2rem)] max-w-2xl max-h-[90vh] overflow-hidden flex flex-col",
          "bg-white rounded-lg shadow-xl border border-sr-line",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 p-5 pb-3 border-b border-sr-line shrink-0">
          <div className="min-w-0">
            <DialogPrimitive.Title className="text-base font-semibold text-sr-ink-900">
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="text-xs text-sr-ink-500 mt-1 leading-relaxed">
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          <DialogPrimitive.Close
            aria-label="Sluiten"
            className="size-7 rounded-md flex items-center justify-center text-sr-ink-500 hover:bg-sr-cream hover:text-sr-ink-900 transition-colors shrink-0"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        </div>
        <div className="p-5 overflow-y-auto sr-scrollbar">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
