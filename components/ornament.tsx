/* Drobne elementy zdobnicze w duchu iluminacji */

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-gold ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M5 9h14" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[0.72rem] font-bold uppercase tracking-[0.28em] ${
        light ? "text-gold-light" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

/* Gwiazda maryjna (dwunastoramienna) */
export function MarianStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill="currentColor">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d="M50 6 L53 44 L50 50 L47 44 Z" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}
