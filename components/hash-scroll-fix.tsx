"use client";

import { useEffect } from "react";

/*
 * Długie strony (np. kalendarz świętych): przeglądarka skacze do #kotwicy od razu,
 * a dopiero potem doładowują się czcionki i tekst wyżej trochę „rośnie” — cel zjeżdża pod pasek.
 * Po załadowaniu czcionek ustawiamy go jeszcze raz, o ile użytkownik w międzyczasie sam nie przewijał.
 */
export function HashScrollFix() {
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const el = id && document.getElementById(id);
    if (!el) return;
    let touched = false;
    const stop = () => (touched = true);
    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", stop, opts);
    window.addEventListener("touchmove", stop, opts);
    window.addEventListener("keydown", stop, opts);
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        if (!touched) el.scrollIntoView({ block: "start" });
      });
    });
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);
  return null;
}
