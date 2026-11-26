import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Megaphone, Newspaper, Plus, ScrollText, Upload } from "lucide-react";

import { AdminHeader, formatStamp } from "@/components/admin/admin-header";
import { ADMIN_PATH } from "@/lib/admin/path";
import { listBulletins, listNews } from "@/lib/content-store";

export const metadata: Metadata = { title: "Start" };

export default async function AdminHome() {
  const [announcements, intentions, news] = await Promise.all([
    listBulletins("announcements"),
    listBulletins("intentions"),
    listNews(),
  ]);

  const cards = [
    {
      icon: Megaphone,
      title: "Ogłoszenia",
      current: announcements[0] && `${announcements[0].title}${announcements[0].dateLabel ? ` · ${announcements[0].dateLabel}` : ""}`,
      updated: announcements[0]?.createdAt,
      href: `${ADMIN_PATH}/ogloszenia`,
      add: { href: `${ADMIN_PATH}/ogloszenia/nowe`, label: "Wgraj z Worda", icon: Upload },
    },
    {
      icon: ScrollText,
      title: "Intencje",
      current: intentions[0] && `${intentions[0].title}${intentions[0].dateLabel ? ` · ${intentions[0].dateLabel}` : ""}`,
      updated: intentions[0]?.createdAt,
      href: `${ADMIN_PATH}/intencje`,
      add: { href: `${ADMIN_PATH}/intencje/nowe`, label: "Wgraj z Worda", icon: Upload },
    },
    {
      icon: Newspaper,
      title: "Aktualności",
      current: news[0]?.title,
      updated: news[0]?.createdAt,
      href: `${ADMIN_PATH}/aktualnosci`,
      add: { href: `${ADMIN_PATH}/aktualnosci/nowa`, label: "Dodaj aktualność", icon: Plus },
    },
  ];

  return (
    <>
      <AdminHeader title="Szczęść Boże!" lead="Co chcesz dziś zaktualizować na stronie parafii?" />
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, current, updated, href, add }) => (
          <div key={title} className="flex flex-col rounded-2xl border border-line bg-vellum p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lapis text-gold-light">
              <Icon size={20} />
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-lapis">{title}</h2>
            <p className="mt-1 flex-1 text-sm text-ink-muted">
              {current ? (
                <>
                  Teraz na stronie: <span className="font-semibold text-ink">{current}</span>
                  {updated && <span className="block text-xs">dodano {formatStamp(updated)}</span>}
                </>
              ) : (
                "Nic jeszcze nie dodano."
              )}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href={add.href} className="inline-flex items-center gap-2 rounded-full bg-lapis px-5 py-2.5 text-sm font-bold text-gold-pale hover:bg-lapis-light">
                <add.icon size={15} /> {add.label}
              </Link>
              <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-lapis hover:text-gold">
                Wszystkie <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
