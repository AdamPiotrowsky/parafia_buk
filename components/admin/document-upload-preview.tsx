"use client";

import {
  FileText,
  Loader2,
  Upload,
} from "lucide-react";

import { FormEvent, useState } from "react";

import { DocumentContent } from "@/components/documents/document-content";

type DocumentType =
  | "announcements"
  | "intentions";

type PreviewResponse = {
  fileName: string;
  html: string;
  warnings: string[];
};

export function DocumentUploadPreview() {
  const [type, setType] =
    useState<DocumentType>("announcements");

  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<PreviewResponse | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!file) {
      setError("Najpierw wybierz plik Word.");

      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPreview(null);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("type", type);

      const response = await fetch(
        "/api/docx/preview",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Nie udało się przetworzyć dokumentu."
        );
      }

      setPreview(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Wystąpił nieznany błąd."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      {/* PANEL UPLOADU */}

      <div>
        <div className="sticky top-32 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
            <Upload size={21} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-stone-950">
            Import dokumentu
          </h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            Wybierz rodzaj dokumentu, a następnie
            prześlij plik Word w formacie .docx.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Rodzaj dokumentu
              </label>

              <select
                value={type}
                onChange={(event) =>
                  setType(
                    event.target.value as DocumentType
                  )
                }
                className="
                  w-full rounded-xl border border-stone-300
                  bg-white px-4 py-3
                  text-sm text-stone-900
                  outline-none
                  transition
                  focus:border-amber-700
                  focus:ring-2
                  focus:ring-amber-700/10
                "
              >
                <option value="announcements">
                  Ogłoszenia
                </option>

                <option value="intentions">
                  Intencje
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-700">
                Plik Word
              </label>

              <label
                className="
                  flex cursor-pointer flex-col
                  items-center justify-center
                  rounded-xl border-2
                  border-dashed border-stone-300
                  px-5 py-8
                  text-center
                  transition
                  hover:border-amber-700
                  hover:bg-amber-50/50
                "
              >
                <FileText
                  size={30}
                  className="text-stone-400"
                />

                <span className="mt-3 text-sm font-medium text-stone-700">
                  {file
                    ? file.name
                    : "Wybierz plik .docx"}
                </span>

                <span className="mt-1 text-xs text-stone-400">
                  maksymalnie 10 MB
                </span>

                <input
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={(event) => {
                    setFile(
                      event.target.files?.[0] ??
                        null
                    );

                    setPreview(null);
                  }}
                />
              </label>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className="
                flex w-full items-center
                justify-center gap-2
                rounded-xl
                bg-stone-950
                px-5 py-3
                text-sm font-semibold text-white
                transition-all
                hover:bg-amber-800
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Konwertowanie...
                </>
              ) : (
                <>
                  <Upload size={17} />
                  Pokaż podgląd
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* PODGLĄD */}

      <div className="min-w-0">
        <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-200 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
              Podgląd
            </p>

            <h2 className="mt-1 text-xl font-semibold text-stone-950">
              {type === "announcements"
                ? "Ogłoszenia parafialne"
                : "Intencje mszalne"}
            </h2>

            {preview && (
              <p className="mt-1 text-sm text-stone-400">
                {preview.fileName}
              </p>
            )}
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {preview ? (
              <DocumentContent
                html={preview.html}
              />
            ) : (
              <div className="flex min-h-96 items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50">
                <div className="max-w-xs text-center">
                  <FileText
                    size={35}
                    className="mx-auto text-stone-300"
                  />

                  <p className="mt-4 text-sm text-stone-500">
                    Po przesłaniu dokumentu
                    zobaczysz tutaj dokładnie to,
                    co będzie widział użytkownik.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {preview &&
          preview.warnings.length > 0 && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Uwagi konwertera
              </p>

              <ul className="mt-2 space-y-1 text-xs text-amber-800">
                {preview.warnings.map(
                  (warning, index) => (
                    <li key={index}>
                      {warning}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}