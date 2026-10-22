"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, History, MoveHorizontal, X } from "lucide-react";

import { BookingDialog, type Editing } from "@/components/room-booking-dialog";
import { HistoryDialog } from "@/components/room-history";
import { warsawNow } from "@/lib/liturgy";
import { bookingKey, groupColor, HOURS, rooms, type Booking, type RoomId } from "@/lib/rooms";
import { addDays, dayLabel, hourLabel, mondayOf, toDate, todayString } from "@/lib/rooms-dates";

type View = "tydzien" | "dzien";
type Hover = { x: number; y: number; who: string; detail: string; past?: boolean };

/* Telefon (< 640 px) — zawsze widok jednego dnia */
const PHONE_QUERY = "(max-width: 639px)";
function useIsPhone() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(PHONE_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false
  );
}

const roomShort: Record<RoomId, string> = { duza: "Duża", biblioteka: "Bibl." };

/* Nagłówek strony jest przyklejony u góry — tabele przyklejamy tuż pod nim */
const BELOW_SITE_HEADER = "top-[calc(6.75rem+1px)]";

export function RoomSchedule() {
  const [today, setToday] = useState<string | null>(null);
  const [week, setWeek] = useState<string | null>(null); // poniedziałek widocznego tygodnia
  const [day, setDay] = useState<string | null>(null); // dzień w widoku „Dzień”
  const [chosenView, setChosenView] = useState<View>("tydzien");
  const [bookings, setBookings] = useState<Record<string, Booking>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [hover, setHover] = useState<Hover | null>(null);

  const isPhone = useIsPhone();
  const view: View = isPhone ? "dzien" : chosenView;

  useEffect(() => {
    const t = todayString();
    queueMicrotask(() => {
      setToday(t);
      setWeek(mondayOf(t));
      setDay(t);
    });
  }, []);

  const days = useMemo(() => (week ? Array.from({ length: 7 }, (_, i) => addDays(week, i)) : []), [week]);

  const load = useCallback(async (from: string, to: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/salki?od=${from}&do=${to}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { bookings: Booking[] };
      setBookings((prev) => {
        const next = Object.fromEntries(Object.entries(prev).filter(([, b]) => b.date < from || b.date > to));
        for (const b of data.bookings) next[bookingKey(b)] = b;
        return next;
      });
      setError(null);
    } catch {
      setError("Nie udało się wczytać grafiku. Spróbuj odświeżyć stronę.");
    } finally {
      setLoading(false);
    }
  }, []);

  const range = useMemo(() => {
    if (!week || !day) return null;
    return view === "tydzien" ? { from: week, to: addDays(week, 6) } : { from: day, to: day };
  }, [week, day, view]);

  useEffect(() => {
    if (range) queueMicrotask(() => load(range.from, range.to));
  }, [range, load]);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(id);
  }, [notice]);

  if (!today || !week || !day || !range) {
    return <div className="h-96 animate-pulse rounded-2xl bg-parchment-deep/60" />;
  }

  const nowHour = warsawNow().minutes / 60;
  const isPast = (date: string, hour: number) => date < today || (date === today && hour + 1 <= nowHour);
  const get = (date: string, hour: number, room: RoomId) => bookings[bookingKey({ date, hour, room })];

  /* „19:00–22:00” — cały blok tej samej grupy wokół danej godziny */
  const blockOf = (date: string, hour: number, room: RoomId) => {
    const who = get(date, hour, room)?.who;
    let from = hour;
    let to = hour + 1;
    while (from > HOURS[0] && get(date, from - 1, room)?.who === who) from--;
    while (to <= HOURS[HOURS.length - 1] && get(date, to, room)?.who === who) to++;
    return `${from}:00–${to}:00`;
  };

  /* Dymek po najechaniu: pełna nazwa rezerwacji albo informacja, że termin minął */
  const showHover = (e: React.MouseEvent<HTMLElement>, date: string, hour: number, room: RoomId) => {
    const b = get(date, hour, room);
    const past = isPast(date, hour);
    if (!b && !past) return setHover(null);
    const r = e.currentTarget.getBoundingClientRect();
    const where = `${rooms.find((x) => x.id === room)?.name} · ${dayLabel(date, { weekday: "short", day: "numeric", month: "short" })}`;
    setHover({
      x: r.left + r.width / 2,
      y: r.top,
      past,
      who: past ? "Termin minął — nie można go zarezerwować" : b!.who,
      detail: b ? `${past ? `${b.who} · ` : ""}${where} · ${blockOf(date, hour, room)}` : `${where} · ${hourLabel(hour)}`,
    });
  };

  const thisWeek = mondayOf(today);
  const canGoBack = view === "tydzien" ? week > thisWeek : day > today;
  const shift = (dir: 1 | -1) => {
    if (view === "tydzien") setWeek(addDays(week, 7 * dir));
    else {
      const d = addDays(day, dir);
      if (d >= today) {
        setDay(d);
        setWeek(mondayOf(d));
      }
    }
  };

  const title =
    view === "tydzien"
      ? `${dayLabel(days[0], { day: "numeric", month: "long" })} – ${dayLabel(days[6], { day: "numeric", month: "long", year: "numeric" })}`
      : dayLabel(day, { weekday: "long", day: "numeric", month: "long" });

  const openEdit = (date: string, hour: number, room: RoomId) => {
    setHover(null);
    if (isPast(date, hour)) setNotice("Ten termin już minął — nie można go zarezerwować ani zmienić.");
    else setEditing({ date, hour, room });
  };

  return (
    <div>
      {/* Pasek narzędzi */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {!isPhone && <h2 className="font-display text-3xl font-semibold first-letter:uppercase text-lapis">{title}</h2>}

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          {!isPhone && (
            <div className="flex rounded-full border border-lapis/20 p-1" role="tablist" aria-label="Widok">
              {(["tydzien", "dzien"] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setChosenView(v)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${view === v ? "bg-lapis text-gold-pale" : "text-lapis hover:bg-parchment-deep"}`}
                >
                  {v === "tydzien" ? "Tydzień" : "Dzień"}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setWeek(thisWeek);
              setDay(today);
            }}
            className="flex items-center gap-2 rounded-full border border-lapis/20 px-4 py-2 text-sm font-semibold text-lapis hover:bg-parchment-deep"
          >
            <CalendarDays size={16} /> Dziś
          </button>
          {!isPhone && (
            <>
              <button type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Wcześniej" className="flex h-10 w-10 items-center justify-center rounded-full border border-lapis/20 text-lapis hover:bg-parchment-deep disabled:opacity-30">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => shift(1)} aria-label="Później" className="flex h-10 w-10 items-center justify-center rounded-full border border-lapis/20 text-lapis hover:bg-parchment-deep">
                <ChevronRight size={18} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink-muted hover:bg-parchment-deep hover:text-lapis sm:ml-0"
          >
            <History size={15} /> Historia zmian
          </button>
        </div>
      </div>

      {error && <p className="mt-4 rounded-xl border border-wine/30 bg-wine/5 px-4 py-3 text-sm text-wine">{error}</p>}

      {view === "tydzien" ? (
        <>
          <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted lg:hidden">
            <MoveHorizontal size={15} className="text-gold" /> Przesuń tabelę w bok, aby zobaczyć cały tydzień.
          </p>
          <div
            className="mt-2 max-h-[calc(100svh-9rem)] overflow-auto rounded-2xl border border-line bg-vellum [scrollbar-color:var(--color-gold)_transparent] lg:mt-5 lg:max-h-none lg:overflow-visible"
            onScroll={() => setHover(null)}
          >
            <table className="w-full min-w-[60rem] table-fixed border-collapse lg:min-w-0">
              <colgroup>
                <col className="w-[3.75rem]" />
                <col className="w-[3.25rem]" />
                {days.map((d) => (
                  <col key={d} />
                ))}
              </colgroup>
              <thead className="sticky top-0 z-20 bg-vellum shadow-[0_8px_12px_-12px_rgba(16,29,59,0.35)] lg:top-[calc(6.75rem+1px)]">
                <tr>
                  <th colSpan={2} className="sticky left-0 z-30 rounded-tl-2xl bg-vellum" />
                  {days.map((d) => {
                    const isToday = d === today;
                    const weekend = [0, 6].includes(toDate(d).getUTCDay());
                    return (
                      <th key={d} className={`border-l border-line bg-vellum px-1.5 pb-2 pt-3 ${d < today ? "[&>button]:opacity-50" : ""}`}>
                        <button
                          type="button"
                          onClick={() => {
                            setDay(d < today ? today : d);
                            setChosenView("dzien");
                          }}
                          className={`w-full rounded-xl px-2 py-1.5 transition ${isToday ? "bg-lapis text-gold-pale shadow-md hover:bg-lapis-light" : "hover:bg-parchment-deep"}`}
                          title="Pokaż ten dzień"
                        >
                          <span className={`block text-[0.66rem] font-bold uppercase tracking-[0.14em] ${isToday ? "text-gold-light" : weekend ? "text-wine" : "text-ink-muted"}`}>
                            {isToday ? "dziś" : dayLabel(d, { weekday: "long" })}
                          </span>
                          <span className={`font-display text-2xl font-semibold leading-none ${isToday ? "" : "text-lapis"}`}>{dayLabel(d, { day: "numeric" })}</span>
                          <span className={`ml-1 text-xs ${isToday ? "text-gold-pale/70" : "text-ink-muted"}`}>{dayLabel(d, { month: "short" })}</span>
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {HOURS.flatMap((h) =>
                  rooms.map((r, ri) => (
                    <tr key={`${h}-${r.id}`} className={ri === 0 ? "border-t border-line" : ""}>
                      {ri === 0 && (
                        <td rowSpan={2} className="sticky left-0 z-10 bg-vellum pl-3 align-middle font-display text-base font-semibold tabular-nums text-ink">
                          {h}:00
                        </td>
                      )}
                      <td className={`sticky left-[3.75rem] z-10 bg-vellum pr-1 text-[0.6rem] font-bold uppercase tracking-[0.08em] ${ri === 0 ? "pt-1 text-lapis/70" : "pb-1 text-gold"}`}>
                        {roomShort[r.id]}
                      </td>
                      {days.map((d) => {
                        const b = get(d, h, r.id);
                        const past = isPast(d, h);
                        const continues = b && get(d, h - 1, r.id)?.who === b.who;
                        return (
                          <td
                            key={d}
                            className={`border-l border-line px-1 ${ri === 0 ? "pt-1 pb-px" : "pb-1 pt-px"} ${d === today ? "bg-gold-pale/35" : ""}`}
                          >
                            <button
                              type="button"
                              aria-disabled={past}
                              onClick={() => openEdit(d, h, r.id)}
                              onMouseEnter={(e) => showHover(e, d, h, r.id)}
                              onMouseLeave={() => setHover(null)}
                              aria-label={`${r.name}, ${hourLabel(h)}: ${b ? b.who : "wolne"}${past ? " (termin minął)" : ""}`}
                              className={`group relative block h-[1.6rem] w-full truncate rounded-md px-1.5 text-left text-[0.7rem] leading-[1.6rem] transition ${
                                b
                                  ? `${groupColor(b.who)} border font-semibold ${past ? "" : "hover:brightness-95"} ${continues ? "opacity-80" : ""}`
                                  : past
                                    ? "hover:bg-wine/5 hover:ring-1 hover:ring-wine/30"
                                    : "hover:bg-white hover:ring-1 hover:ring-lapis/20"
                              } ${past ? "cursor-not-allowed opacity-40 hover:opacity-90" : ""}`}
                            >
                              {b?.who}
                              {past && !b && (
                                <X size={13} strokeWidth={2.5} className="absolute inset-0 m-auto text-wine opacity-0 transition group-hover:opacity-100" aria-hidden />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border border-line bg-vellum">
          <table className="w-full table-fixed border-collapse">
            <thead className={`sticky ${BELOW_SITE_HEADER} z-20 bg-vellum/95 shadow-[0_8px_12px_-12px_rgba(16,29,59,0.35)] backdrop-blur`}>
              {isPhone && (
                <tr>
                  <th colSpan={3} className="px-2 pb-1 pt-3">
                    <div className="flex items-center justify-between gap-2">
                      <button type="button" onClick={() => shift(-1)} disabled={!canGoBack} aria-label="Poprzedni dzień" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lapis text-gold-pale disabled:opacity-25">
                        <ChevronLeft size={22} />
                      </button>
                      <div className="min-w-0 text-center">
                        <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold">{day === today ? "Dziś" : dayLabel(day, { year: "numeric" })}</p>
                        <p className="font-display text-xl font-semibold leading-tight first-letter:uppercase text-lapis">{title}</p>
                      </div>
                      <button type="button" onClick={() => shift(1)} aria-label="Następny dzień" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lapis text-gold-pale">
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </th>
                </tr>
              )}
              <tr className="text-left text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold">
                <th className="w-[4.25rem] rounded-tl-2xl px-3 py-3 sm:w-32 sm:px-5">Godz.</th>
                {rooms.map((r) => (
                  <th key={r.id} className="px-2 py-3">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((h) => {
                const past = isPast(day, h);
                return (
                  <tr key={h} className={`border-t border-line transition ${past ? "opacity-45 hover:opacity-90" : ""}`}>
                    <td className="px-3 py-1.5 font-display text-base font-semibold tabular-nums text-ink sm:px-5 sm:text-lg">
                      <span className="sm:hidden">{h}:00</span>
                      <span className="hidden sm:inline">{hourLabel(h)}</span>
                    </td>
                    {rooms.map((r) => {
                      const b = get(day, h, r.id);
                      return (
                        <td key={r.id} className="px-1 py-1.5 last:pr-2 sm:px-1.5 sm:last:pr-4">
                          <button
                            type="button"
                            aria-disabled={past}
                            onClick={() => openEdit(day, h, r.id)}
                            onMouseEnter={(e) => showHover(e, day, h, r.id)}
                            onMouseLeave={() => setHover(null)}
                            className={`group flex h-12 w-full items-center rounded-xl border px-2.5 text-left text-[0.8rem] leading-tight transition sm:px-3 sm:text-sm ${
                              b
                                ? `${groupColor(b.who)} font-semibold ${past ? "" : "hover:brightness-95"}`
                                : past
                                  ? "border-dashed border-line text-wine hover:border-wine/40 hover:bg-wine/5"
                                  : "border-dashed border-line text-ink-muted hover:border-lapis/40 hover:bg-white"
                            } ${past ? "cursor-not-allowed" : ""}`}
                          >
                            {b ? (
                              <span className="line-clamp-2">{b.who}</span>
                            ) : past ? (
                              <span className="flex items-center gap-1.5 text-xs font-semibold opacity-0 transition group-hover:opacity-100">
                                <X size={14} strokeWidth={2.5} /> Termin minął
                              </span>
                            ) : (
                              <span className="opacity-40 transition group-hover:opacity-100 sm:opacity-0">+ wolne</span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs text-ink-muted">
        {loading ? "Wczytywanie…" : "Kliknij wolne pole, aby zarezerwować, lub zajęte — aby zmienić albo zwolnić. Przeszłe godziny są wyszarzone."}
      </p>

      {/* Dymek z pełną nazwą po najechaniu */}
      {hover && (
        <div className="pointer-events-none fixed z-[55] -translate-x-1/2 -translate-y-full pb-2" style={{ left: hover.x, top: hover.y }} role="tooltip">
          <div className={`max-w-xs rounded-xl px-3.5 py-2 text-center shadow-xl ${hover.past ? "bg-wine" : "bg-lapis-deep"}`}>
            <p className={`flex items-center justify-center gap-1.5 text-sm font-semibold ${hover.past ? "text-white" : "text-gold-pale"}`}>
              {hover.past && <X size={14} strokeWidth={2.5} />}
              {hover.who}
            </p>
            <p className={`text-[0.7rem] ${hover.past ? "text-white/80" : "text-gold-pale/70"}`}>{hover.detail}</p>
          </div>
        </div>
      )}

      {notice && (
        <div className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-lapis-deep px-5 py-3 text-sm font-semibold text-gold-pale shadow-xl sm:bottom-8" role="status">
          {notice}
        </div>
      )}

      {editing && (
        <BookingDialog
          editing={editing}
          bookings={bookings}
          onClose={() => setEditing(null)}
          onSaved={(message) => {
            setEditing(null);
            setNotice(message);
            load(range.from, range.to);
          }}
        />
      )}

      {historyOpen && <HistoryDialog onClose={() => setHistoryOpen(false)} />}
    </div>
  );
}
