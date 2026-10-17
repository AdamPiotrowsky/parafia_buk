"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value, label = "Kopiuj numer konta" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* schowek niedostępny — numer i tak jest widoczny */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-semibold text-gold-light transition hover:border-gold-light hover:bg-gold-light/10"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Skopiowano" : label}
    </button>
  );
}
