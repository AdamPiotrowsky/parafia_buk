import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ base, current, pages }: { base: string; current: number; pages: number }) {
  if (pages <= 1) return null;
  const href = (p: number) => (p === 1 ? base : `${base}?strona=${p}`);

  // 1 … 4 5 6 … 21
  const shown = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pages || Math.abs(p - current) <= 1
  );

  const cell = "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition";

  return (
    <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Strony">
      {current > 1 && (
        <Link href={href(current - 1)} className={`${cell} border border-line text-lapis hover:bg-parchment-deep`} aria-label="Poprzednia strona">
          <ChevronLeft size={16} />
        </Link>
      )}
      {shown.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - shown[i - 1] > 1 && <span className="text-ink-muted">…</span>}
          <Link
            href={href(p)}
            aria-current={p === current ? "page" : undefined}
            className={`${cell} ${p === current ? "bg-lapis text-gold-pale" : "border border-line text-lapis hover:bg-parchment-deep"}`}
          >
            {p}
          </Link>
        </span>
      ))}
      {current < pages && (
        <Link href={href(current + 1)} className={`${cell} border border-line text-lapis hover:bg-parchment-deep`} aria-label="Następna strona">
          <ChevronRight size={16} />
        </Link>
      )}
    </nav>
  );
}
