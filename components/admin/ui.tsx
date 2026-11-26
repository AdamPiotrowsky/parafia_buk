"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Trash2 } from "lucide-react";

/* Drobne elementy wspólne dla formularzy panelu */

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint && <span className="ml-2 text-xs text-ink-muted">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-lapis/60 focus:ring-2 focus:ring-lapis/10";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-lapis px-7 py-3 text-sm font-bold text-gold-pale transition hover:bg-lapis-light disabled:opacity-60"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export function FormMessage({ state }: { state: { error?: string; ok?: string } | undefined }) {
  if (state?.error) return <p className="rounded-xl bg-wine/10 px-4 py-3 text-sm font-medium text-wine">{state.error}</p>;
  if (state?.ok) return <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{state.ok}</p>;
  return null;
}

/* Usuwanie z potwierdzeniem — `action` to akcja serwera z dowiązanym id */
export function DeleteButton({ action, what }: { action: () => Promise<void>; what: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Na pewno usunąć ${what}? Tego nie da się cofnąć.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-wine hover:bg-wine/10">
        <Trash2 size={15} /> Usuń
      </button>
    </form>
  );
}
