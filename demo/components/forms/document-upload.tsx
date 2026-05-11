"use client";

import { useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Paperclip, Upload, FileText, Image as ImageIcon, Film, Music, X, Download,
} from "lucide-react";
import { useSgdpStore, type EntityType } from "@/lib/store";
import { useUser } from "@/components/user-context";
import { cn, formatDate } from "@/lib/utils";

function iconFor(mime: string) {
  if (mime.startsWith("image/")) return ImageIcon;
  if (mime.startsWith("video/")) return Film;
  if (mime.startsWith("audio/")) return Music;
  return FileText;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function DocumentUpload({
  entityType,
  entityId,
  className,
  variant = "compact",
  label,
}: {
  entityType: EntityType;
  entityId: string;
  className?: string;
  variant?: "compact" | "dropzone";
  label?: string;
}) {
  const user = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const documents = useSgdpStore(
    useShallow((s) =>
      s.documents.filter((d) => d.entityType === entityType && d.entityId === entityId),
    ),
  );
  const addDocuments = useSgdpStore((s) => s.addDocuments);
  const removeDocument = useSgdpStore((s) => s.removeDocument);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    await addDocuments(entityType, entityId, Array.from(files), {
      userId: user.userId,
      name: user.name,
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {variant === "dropzone" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-1 p-3 border-2 border-dashed rounded-md cursor-pointer transition-colors",
            dragOver
              ? "border-sr-green-700 bg-sr-green-50"
              : "border-sr-line hover:border-sr-green-500 hover:bg-sr-cream",
          )}
        >
          <Upload className="size-4 text-sr-green-700" />
          <div className="text-xs text-sr-ink-700 font-medium">
            {label ?? "Klik of sleep bestand(en) hier"}
          </div>
          <div className="text-[10px] text-sr-ink-500">
            PDF · JPG · PNG · MP3 · MP4 · GeoJSON · Shapefile
          </div>
        </div>
      )}

      {variant === "compact" && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-sr-line rounded-md text-[11px] font-medium hover:bg-sr-green-50 hover:border-sr-green-500 transition-colors"
        >
          <Paperclip className="size-3 text-sr-green-700" />
          {label ?? "Document toevoegen"}
        </button>
      )}

      {documents.length > 0 && (
        <ul className="space-y-1.5">
          {documents.map((doc) => {
            const Icon = iconFor(doc.mimeType);
            return (
              <li
                key={doc.id}
                className="flex items-start gap-2 p-2 bg-white border border-sr-line rounded-md text-xs"
              >
                <Icon className="size-3.5 text-sr-green-700 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sr-ink-900 truncate">{doc.name}</div>
                  <div className="text-[10px] text-sr-ink-500 truncate">
                    {formatBytes(doc.size)} · {doc.uploadedByName} · {formatDate(doc.uploadedAt)}
                  </div>
                </div>
                {doc.dataUrl ? (
                  <a
                    href={doc.dataUrl}
                    download={doc.name}
                    aria-label="Downloaden"
                    title="Downloaden"
                    className="size-6 rounded-md flex items-center justify-center text-sr-green-700 hover:bg-sr-green-50 hover:text-sr-green-900 transition-colors shrink-0"
                  >
                    <Download className="size-3.5" />
                  </a>
                ) : (
                  <span
                    title="Bestand te groot voor demo-opslag (> 3 MB); download niet beschikbaar"
                    className="text-[9px] text-sr-ink-400 px-1 self-center"
                  >
                    te groot
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeDocument(doc.id)}
                  aria-label="Verwijderen"
                  className="size-6 rounded-md flex items-center justify-center text-sr-ink-300 hover:bg-sr-red-50 hover:text-sr-red-700 transition-colors shrink-0"
                >
                  <X className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
