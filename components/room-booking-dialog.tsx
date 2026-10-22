"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Library, Repeat, Search, ShieldAlert, Users, X } from "lucide-react";

import { bookingKey, groupColor, HOURS, roomGroups, rooms, type Booking, type RoomId } from "@/lib/rooms";
import { addDays, addMonths, dayLabel, describeSlots } from "@/lib/rooms-dates";

export type Editing = { date: string; hour: number; room: RoomId };

type Change = { date: string; hour: number; room: RoomId; who: string | null };
type Conflict = Change & { from: string };

const SIGNATURE_KEY = "salki-podpis";
const REPEAT_OPTIONS = [1, 2, 3, 6];

function readSignature() {
  try {
    return localStorage.getItem(SIGNATURE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function BookingDialog({
  editing,
  bookings,
  onClose,
  onSaved,
}: {
  editing: Editing;
  bookings: Record<string, Booking>;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const room = rooms.find((r) => r.id === editing.room)!;
  const at = (hour: number) => bookings[bookingKey({ ...editing, hour })];
  const current = at(editing.hour);

  // Kliknięcie w zajęte pole zaznacza cały blok tej grupy
  const block = useMemo(() => {
    if (!current) return { from: editing.hour, to: editing.hour + 1 };
    let from = editing.hour;
    let to = editing.hour + 1;
    while (from > HOURS[0] && at(from - 1)?.who === current.who) from--;
    while (to <= HOURS[HOURS.length - 1] && at(to)?.who === current.who) to++;
    return { from, to };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, current]);

  const [fromHour, setFromHour] = useState(block.from);
  const [toHour, setToHour] = useState(block.to);
  const [listChoice, setListChoice] = useState(current?.who ?? "");
  const [query, setQuery] = useState("");
  const [repeat, setRepeat] = useState(false);
  const [months, setMonths] = useState(3);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [mode, setMode] = useState<"save" | "release">("save");
  const [plan, setPlan] = useState<{ changes: Change[]; conflicts: Conflict[] } | null>(null);
  const [skipConflicts, setSkipConflicts] = useState(true);
  const [author, setAuthor] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    queueMicrotask(() => setAuthor(readSignature()));
    if (!current) searchRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, onClose]);

  const typed = query.trim();
  const exactGroup = roomGroups.find((g) => g.toLowerCase() === typed.toLowerCase());
  const isCustom = typed.length > 0 && !exactGroup;
  const choice = typed ? (exactGroup ?? typed) : listChoice;
  // Bez wpisywania: wybrana grupa przypięta na górze, pod nią pozostałe do szybkiej zmiany
  const pinned = !typed && listChoice ? listChoice : null;
  const filtered = typed
    ? roomGroups.filter((g) => g.toLowerCase().includes(typed.toLowerCase()))
    : roomGroups.filter((g) => g !== pinned);

  const dates = useMemo(() => {
    if (!repeat) return [editing.date];
    const until = addMonths(editing.date, months);
    const list: string[] = [];
    for (let d = editing.date; d <= until; d = addDays(d, 7)) list.push(d);
    return list;
  }, [repeat, months, editing.date]);

  const hours = HOURS.filter((h) => h >= fromHour && h < toHour);

  /* Przygotowanie zmian i sprawdzenie, czy nadpisują cudze rezerwacje (stan z serwera) */
  async function prepare(nextMode: "save" | "release") {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/salki?od=${dates[0]}&do=${dates[dates.length - 1]}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const server = Object.fromEntries(((await res.json()) as { bookings: Booking[] }).bookings.map((b) => [bookingKey(b), b]));

      const changes: Change[] = [];
      for (const date of dates) {
        for (const hour of hours) {
          const existing = server[bookingKey({ date, hour, room: editing.room })];
          if (nextMode === "save") changes.push({ date, hour, room: editing.room, who: choice });
          // Zwalniamy: w klikniętym dniu wszystko w zakresie, w kolejnych tygodniach tylko tę samą grupę
          else if (existing && (date === editing.date || existing.who === current?.who)) {
            changes.push({ date, hour, room: editing.room, who: null });
          }
        }
      }
      const conflicts: Conflict[] = changes.flatMap((c) => {
        const existing = server[bookingKey(c)];
        return existing && existing.who !== c.who ? [{ ...c, from: existing.who }] : [];
      });

      if (!changes.length) {
        setError("W wybranych terminach nie ma nic do zwolnienia.");
        return;
      }
      setMode(nextMode);
      setPlan({ changes, conflicts });
      if (conflicts.length) {
        setSkipConflicts(nextMode === "save" && repeat && conflicts.length < changes.length);
        setStep("confirm");
      } else {
        await send(changes, undefined, nextMode);
      }
    } catch {
      setError("Nie udało się sprawdzić grafiku. Spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }

  async function send(changes: Change[], signature: string | undefined, sendMode = mode) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/salki", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changes, author: signature }),
      });
      if (res.status === 409) {
        // Ktoś w międzyczasie zajął termin — trzeba potwierdzić nadpisanie
        await prepare(sendMode);
        return;
      }
      if (!res.ok) throw new Error();
      if (signature) {
        try {
          localStorage.setItem(SIGNATURE_KEY, signature);
        } catch {
          /* bez zapamiętywania podpisu */
        }
      }
      const terms = new Set(changes.map((c) => c.date)).size;
      onSaved(
        sendMode === "release"
          ? `Zwolniono salkę (${terms === 1 ? "1 termin" : `${terms} terminów`})`
          : `Zapisano: ${choice}${terms > 1 ? ` · ${terms} terminów` : ""}`
      );
    } catch {
      setError("Nie udało się zapisać. Sprawdź połączenie i spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }

  function confirm() {
    if (!plan) return;
    if (skipConflicts) {
      const keys = new Set(plan.conflicts.map(bookingKey));
      const free = plan.changes.filter((c) => !keys.has(bookingKey(c)));
      if (!free.length) {
        setError("Wszystkie wybrane terminy są zajęte — zaznacz nadpisanie albo wybierz inne godziny.");
        return;
      }
      send(free, undefined);
      return;
    }
    if (author.trim().split(/\s+/).length < 2) {
      setError("Podaj imię i nazwisko — zapiszemy je w historii zmian.");
      return;
    }
    send(plan.changes, author.trim());
  }

  /* Podsumowanie konfliktów: „Przymierze Miłosierdzia → Dobrem Zwyciężaj: czw. 22.10, 19:00–21:00” */
  const conflictGroups = useMemo(() => {
    const map = new Map<string, { from: string; to: string | null; slots: { date: string; hour: number }[] }>();
    for (const c of plan?.conflicts ?? []) {
      const k = `${c.from}|${c.who}`;
      if (!map.has(k)) map.set(k, { from: c.from, to: c.who, slots: [] });
      map.get(k)!.slots.push({ date: c.date, hour: c.hour });
    }
    return [...map.values()];
  }, [plan]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-lapis-deep/50 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Rezerwacja salki"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92svh] w-full max-w-lg flex-col rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-6 pb-4">
          <div>
            <p
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-lg font-bold ${
                editing.room === "duza" ? "bg-lapis text-gold-pale" : "border border-gold/60 bg-gold-pale text-[#5c4515]"
              }`}
            >
              {editing.room === "duza" ? <Users size={20} /> : <Library size={20} />}
              {room.name}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold first-letter:uppercase text-lapis">
              {dayLabel(editing.date, { weekday: "long", day: "numeric", month: "long" })}
            </p>
            {current && (
              <p className="mt-1 text-sm text-ink-muted">
                Obecnie: <span className={`rounded-md border px-1.5 py-0.5 font-semibold ${groupColor(current.who)}`}>{current.who}</span>
              </p>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Zamknij" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-parchment">
            <X size={20} />
          </button>
        </div>

        {step === "form" ? (
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              if (choice) prepare("save");
            }}
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-4">
              {/* Godziny */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <span className="text-ink-muted">od</span>
                  <select
                    value={fromHour}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setFromHour(v);
                      if (toHour <= v) setToHour(v + 1);
                    }}
                    className="rounded-lg border border-line bg-white px-3 py-2 font-semibold text-ink"
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {h}:00
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2">
                  <span className="text-ink-muted">do</span>
                  <select value={toHour} onChange={(e) => setToHour(Number(e.target.value))} className="rounded-lg border border-line bg-white px-3 py-2 font-semibold text-ink">
                    {HOURS.filter((h) => h >= fromHour).map((h) => (
                      <option key={h + 1} value={h + 1}>
                        {h + 1}:00
                      </option>
                    ))}
                  </select>
                </label>
                <span className="text-ink-muted">· {hours.length} godz.</span>
              </div>

              {/* Kto */}
              <label className="mt-4 flex items-center gap-2 rounded-xl border border-line px-3 transition focus-within:border-lapis focus-within:ring-2 focus-within:ring-lapis/15">
                <Search size={16} className="shrink-0 text-ink-muted" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={current ? "Zmień — szukaj lub wpisz własną nazwę" : "Kto zajmuje salkę? Szukaj lub wpisz"}
                  className="h-12 w-full bg-transparent text-ink outline-none placeholder:text-ink-muted focus-visible:outline-none"
                  maxLength={80}
                  aria-label="Kto zajmuje salkę"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} aria-label="Wyczyść" className="text-ink-muted hover:text-ink">
                    <X size={16} />
                  </button>
                )}
              </label>

              <ul className="mt-2 max-h-56 overflow-y-auto py-1" role="listbox" aria-label="Grupy">
                {isCustom && <ChoiceRow checked label={typed} hint="własna nazwa" onClick={() => undefined} />}
                {pinned && (
                  <>
                    <ChoiceRow
                      checked
                      label={pinned}
                      color={groupColor(pinned)}
                      hint={roomGroups.includes(pinned) ? (pinned === current?.who ? "obecnie" : undefined) : "własna nazwa"}
                      onClick={() => undefined}
                    />
                    <li className="mx-3 my-1 border-t border-line" aria-hidden />
                  </>
                )}
                {filtered.map((g) => (
                  <ChoiceRow
                    key={g}
                    checked={choice === g}
                    label={g}
                    color={groupColor(g)}
                    onClick={() => {
                      setListChoice(g);
                      setQuery("");
                    }}
                  />
                ))}
                {!filtered.length && !isCustom && <li className="px-3 py-2 text-sm text-ink-muted">Brak wyników</li>}
              </ul>

              {/* Co tydzień */}
              <div className="mt-3 rounded-xl bg-parchment p-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} className="h-5 w-5 accent-[#1b2f5b]" />
                  <Repeat size={16} className="text-gold" />
                  <span className="font-semibold text-ink">Powtarzaj co tydzień</span>
                </label>
                {repeat && (
                  <div className="mt-3 pl-8 text-sm">
                    <div className="flex flex-wrap gap-1.5">
                      {REPEAT_OPTIONS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMonths(m)}
                          className={`rounded-full px-3 py-1.5 font-semibold transition ${months === m ? "bg-lapis text-gold-pale" : "border border-line bg-white text-lapis hover:border-lapis/40"}`}
                        >
                          {m === 1 ? "1 miesiąc" : m < 5 ? `${m} miesiące` : `${m} miesięcy`}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-ink-muted">
                      {dates.length} terminów · {dayLabel(editing.date, { weekday: "long" })}, do {dayLabel(dates[dates.length - 1], { day: "numeric", month: "long" })}
                    </p>
                  </div>
                )}
              </div>

              {error && <p className="mt-3 text-sm text-wine">{error}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-line p-6 pt-4">
              {current && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => prepare("release")}
                  className="rounded-full border border-wine/30 px-5 py-2.5 text-sm font-semibold text-wine hover:bg-wine hover:text-white disabled:opacity-40"
                >
                  Zwolnij salkę
                </button>
              )}
              <button type="button" onClick={onClose} className="ml-auto rounded-full px-5 py-2.5 text-sm font-semibold text-ink-muted hover:bg-parchment">
                Anuluj
              </button>
              <button type="submit" disabled={!choice || busy} className="rounded-full bg-lapis px-6 py-2.5 text-sm font-bold text-gold-pale hover:bg-lapis-light disabled:opacity-40">
                {busy ? "Zapisywanie…" : "Zapisz"}
              </button>
            </div>
          </form>
        ) : (
          /* Potwierdzenie nadpisania cudzej rezerwacji */
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              confirm();
            }}
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-4">
              <div className="flex items-start gap-3 rounded-xl border border-wine/25 bg-wine/5 p-4">
                <ShieldAlert size={22} className="mt-0.5 shrink-0 text-wine" />
                <div>
                  <p className="font-semibold text-wine">{mode === "release" ? "Zwalniasz cudzą rezerwację" : "Te godziny są już zajęte"}</p>
                  <p className="mt-1 text-sm text-ink-soft">Zmiana zostanie zapisana w historii zmian razem z Twoim imieniem i nazwiskiem.</p>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {conflictGroups.map((g) => (
                  <li key={g.from + g.to} className="rounded-xl border border-line p-4">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                      <span className={`rounded-md border px-2 py-0.5 ${groupColor(g.from)}`}>{g.from}</span>
                      <ArrowRight size={14} className="text-ink-muted" />
                      {g.to ? <span className={`rounded-md border px-2 py-0.5 ${groupColor(g.to)}`}>{g.to}</span> : <span className="text-wine">wolne</span>}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">{describeSlots(g.slots)}</p>
                  </li>
                ))}
              </ul>

              {mode === "save" && plan && plan.conflicts.length < plan.changes.length && (
                <fieldset className="mt-4 space-y-2 text-sm">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="radio" checked={skipConflicts} onChange={() => setSkipConflicts(true)} className="h-4 w-4 accent-[#1b2f5b]" />
                    Pomiń zajęte terminy — zapisz tylko wolne ({plan.changes.length - plan.conflicts.length} godz.)
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input type="radio" checked={!skipConflicts} onChange={() => setSkipConflicts(false)} className="h-4 w-4 accent-[#1b2f5b]" />
                    Nadpisz zajęte terminy
                  </label>
                </fieldset>
              )}

              {!skipConflicts && (
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-ink">Imię i nazwisko osoby zmieniającej</span>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    autoFocus
                    placeholder="np. Jan Kowalski"
                    maxLength={80}
                    className="mt-1.5 h-12 w-full rounded-xl border border-line px-3 text-ink outline-none focus:border-lapis focus:ring-2 focus:ring-lapis/15 focus-visible:outline-none"
                  />
                </label>
              )}

              {error && <p className="mt-3 text-sm text-wine">{error}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-line p-6 pt-4">
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setError(null);
                }}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-muted hover:bg-parchment"
              >
                ← Wróć
              </button>
              <button type="submit" disabled={busy} className="ml-auto rounded-full bg-wine px-6 py-2.5 text-sm font-bold text-white hover:bg-[#6a221f] disabled:opacity-40">
                {busy ? "Zapisywanie…" : skipConflicts ? "Zapisz wolne terminy" : mode === "release" ? "Tak, zwolnij" : "Tak, nadpisz"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ChoiceRow({
  checked,
  label,
  hint,
  color,
  onClick,
}: {
  checked: boolean;
  label: string;
  hint?: string;
  color?: string;
  onClick: () => void;
}) {
  return (
    <li role="option" aria-selected={checked}>
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${checked ? "bg-lapis/[0.06]" : "hover:bg-parchment"}`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
            checked ? "border-lapis bg-lapis text-white" : "border-line bg-white"
          }`}
          aria-hidden
        >
          {checked && <Check size={13} strokeWidth={3} />}
        </span>
        {color && <span className={`h-2.5 w-2.5 shrink-0 rounded-full border ${color}`} aria-hidden />}
        <span className={`flex-1 ${checked ? "font-semibold text-lapis" : "text-ink"}`}>{label}</span>
        {hint && <span className="rounded-full bg-gold-pale px-2 py-0.5 text-[0.68rem] font-semibold text-[#7d5f25]">{hint}</span>}
      </button>
    </li>
  );
}
