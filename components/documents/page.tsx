import { DocumentUploadPreview } from "@/components/admin/document-upload-preview";

export default function DokumentyAdminPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
            Panel administracyjny
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
            Dokumenty
          </h1>

          <p className="mt-3 max-w-2xl text-stone-500">
            Importuj ogłoszenia lub intencje
            bezpośrednio z dokumentu Word.
          </p>
        </div>

        <DocumentUploadPreview />
      </div>
    </main>
  );
}