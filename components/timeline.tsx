import type { TimelineEvent } from "@/lib/history";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative">
      <span className="absolute bottom-3 left-[9.5rem] top-3 hidden w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 sm:block" aria-hidden />
      {events.map((e) => (
        <li key={e.year + e.title} className="relative grid gap-1 py-5 sm:grid-cols-[9.5rem_1fr] sm:gap-0">
          <p
            className={`font-display font-semibold leading-none tabular-nums sm:whitespace-nowrap sm:pr-7 sm:text-right ${
              e.major ? "text-wine" : "pt-1 text-gold"
            } ${e.year.length > 6 ? "text-xl" : e.major ? "text-3xl" : "text-2xl"}`}
          >
            {e.year}
          </p>
          <span
            className={`absolute left-[9.5rem] top-[1.6rem] hidden -translate-x-1/2 rotate-45 sm:block ${
              e.major ? "h-3.5 w-3.5 border border-gold bg-wine" : "h-2.5 w-2.5 bg-gold"
            }`}
            aria-hidden
          />
          <div className="sm:pl-8">
            <h3 className={`font-display font-semibold text-lapis ${e.major ? "text-2xl" : "text-xl"}`}>{e.title}</h3>
            <p className="mt-1 max-w-2xl leading-7 text-ink-soft">{e.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
