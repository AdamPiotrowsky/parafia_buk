"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({
  value,
  label = "Kopiuj numer konta",
  tone = "dark",
}: {
  value: string;
  label?: string;
  tone?: "dark" | "light";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        // Bez https (np. podgląd przez adres w sieci domowej) nowoczesny schowek jest niedostępny
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        if (!ok) return;
      }
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
      className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
        tone === "light"
          ? "border-lapis/25 text-lapis hover:border-lapis hover:bg-parchment-deep"
          : "border-gold/40 text-gold-light hover:border-gold-light hover:bg-gold-light/10"
      } ${copied ? (tone === "light" ? "border-emerald-600/40 text-emerald-700" : "") : ""}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Skopiowano" : label}
    </button>
  );
}
