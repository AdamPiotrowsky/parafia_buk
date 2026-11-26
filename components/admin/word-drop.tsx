"use client";

import { useRef, useState, useTransition } from "react";
import { FileText, Loader2, Upload } from "lucide-react";

import { convertWord } from "@/app/(pl)/zakrystia-7f3k/actions";
import type { ConvertedDocument } from "@/lib/documents/convert-docx";

/* Pole „przeciągnij tutaj plik Word” — po upuszczeniu zamienia dokument na treść strony */
export function WordDrop({
  onConverted,
  compact = false,
}: {
  onConverted: (doc: ConvertedDocument, fileName: string) => void;
  compact?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function handle(file: File | undefined) {
    if (!file) return;
    setError(null);
    start(async () => {
      const fd = new FormData();
      fd.append("file", file);
      const result = await convertWord(fd);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setLoaded(file.name);
      onConverted(result, file.name);
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files[0]);
        }}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-center transition ${
          compact ? "px-5 py-5" : "px-6 py-12"
        } ${over ? "border-lapis bg-lapis/5" : "border-line bg-white hover:border-lapis/50 hover:bg-parchment/50"}`}
      >
        {pending ? (
          <Loader2 className="animate-spin text-lapis" size={compact ? 22 : 30} />
        ) : loaded ? (
          <FileText className="text-gold" size={compact ? 22 : 30} />
        ) : (
          <Upload className="text-lapis" size={compact ? 22 : 30} />
        )}
        <span className={`font-semibold text-lapis ${compact ? "text-sm" : "text-lg"}`}>
          {pending ? "Odczytuję dokument…" : loaded ? `Wczytano: ${loaded}` : "Przeciągnij tutaj plik Word"}
        </span>
        <span className="text-sm text-ink-muted">
          {loaded ? "Możesz przeciągnąć inny plik, żeby go podmienić" : "albo kliknij, żeby wybrać plik (.docx)"}
        </span>
      </button>
      <input
        ref={input}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => {
          handle(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-2 rounded-lg bg-wine/10 px-4 py-2.5 text-sm text-wine">{error}</p>}
    </div>
  );
}
