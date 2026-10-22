import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PhotoGrid } from "@/components/photo-grid";
import { albums } from "@/lib/legacy";
import { legacyUrl } from "@/lib/legacy/assets";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug);
  const album = albums.find((a) => a.slug === slug);
  return { title: album?.title ?? "Galeria" };
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decodeURIComponent((await params).slug);
  const album = albums.find((a) => a.slug === slug);
  if (!album) notFound();

  return (
    <>
      <PageHeader eyebrow={`Galeria · ${album.photos.length} zdjęć`} title={album.title} />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <Link href="/galeria" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-lapis hover:text-gold">
          <ArrowLeft size={15} /> Wszystkie albumy
        </Link>
        <PhotoGrid photos={album.photos.map(legacyUrl)} title={album.title} />
      </section>
    </>
  );
}
