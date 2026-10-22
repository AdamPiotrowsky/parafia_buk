"use client";

import { useEffect, useState } from "react";
import { ArrowRight, History, X } from "lucide-react";

import { groupColor, rooms, type ChangeLog } from "@/lib/rooms";
import { describeSlots } from "@/lib/rooms-dates";

const when = (iso: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

/* Historia nadpisań i zwolnień cudzych rezerwacji */
export function HistoryDialog({ onClose }: { onClose: () => void }) {
  const [log, setLog] = useState<ChangeLog[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/salki/historia", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { log: ChangeLog[] }) => setLog(d.log))
      .catch(() => setError(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-lapis-deep/50 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Historia zmian"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88svh] w-full max-w-2xl flex-col rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line p-6 pb-4">
          <div className="flex items-center gap-3">
            <History size={22} className="text-gold" />
            <div>
              <p className="font-display text-2xl font-semibold text-lapis">Historia zmian</p>
              <p className="text-sm text-ink-muted">Nadpisane i zwolnione cudze rezerwacje — od najnowszych</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Zamknij" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-parchment">
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 pt-4">
          {error && <p className="text-sm text-wine">Nie udało się wczytać historii.</p>}
          {!log && !error && <p className="text-sm text-ink-muted">Wczytywanie…</p>}
          {log && !log.length && <p className="py-10 text-center text-ink-muted">Na razie nikt niczego nie nadpisał.</p>}
          <ol className="space-y-3">
            {log?.map((e, i) => (
              <li key={e.at + i} className="rounded-xl border border-line p-4">
                <p className="text-sm">
                  <strong className="text-ink">{e.by}</strong>
                  <span className="text-ink-muted"> · {when(e.at)}</span>
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                  <span className="text-ink-muted">{rooms.find((r) => r.id === e.room)?.name}:</span>
                  <span className={`rounded-md border px-2 py-0.5 ${groupColor(e.from)}`}>{e.from}</span>
                  <ArrowRight size={14} className="text-ink-muted" />
                  {e.to ? <span className={`rounded-md border px-2 py-0.5 ${groupColor(e.to)}`}>{e.to}</span> : <span className="text-wine">zwolniono</span>}
                </p>
                <p className="mt-1.5 text-sm text-ink-muted">{describeSlots(e.slots, 6)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
