import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Sanktuarium w Buku
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-400">
            Sanktuarium Matki Bożej Bukowskiej Literackiej oraz Parafia
            pw. św. Stanisława Biskupa w Buku.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white">Na skróty</h3>

          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/ogloszenia" className="hover:text-white">
              Ogłoszenia
            </Link>

            <Link href="/intencje" className="hover:text-white">
              Intencje
            </Link>

            <Link href="/aktualnosci" className="hover:text-white">
              Aktualności
            </Link>

            <Link href="/galeria" className="hover:text-white">
              Galeria
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-white">Kontakt</h3>

          <div className="mt-4 space-y-2 text-sm text-stone-400">
            <p>Buk, woj. wielkopolskie</p>
            <p>Dane kontaktowe uzupełnimy później.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-stone-500 lg:px-8">
          © {new Date().getFullYear()} Sanktuarium w Buku
        </div>
      </div>
    </footer>
  );
}