import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AdminHeader({
  title,
  lead,
  back,
  action,
}: {
  title: string;
  lead?: string;
  back?: { href: string; label: string };
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-8">
      {back && (
        <Link href={back.href} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-lapis hover:text-gold">
          <ArrowLeft size={15} /> {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold text-lapis sm:text-5xl">{title}</h1>
          {lead && <p className="mt-2 max-w-2xl text-ink-muted">{lead}</p>}
        </div>
        {action}
      </div>
    </header>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-full bg-lapis px-6 py-3 text-sm font-bold text-gold-pale transition hover:bg-lapis-light">
      {children}
    </Link>
  );
}

export function SavedNote({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">Zapisano — zmiany są już na stronie.</p>;
}

export const formatStamp = (iso: string) =>
  new Date(iso).toLocaleString("pl-PL", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Warsaw" });
