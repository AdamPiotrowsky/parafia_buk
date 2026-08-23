import { NextResponse } from "next/server";

import { convertDocxToHtml } from "@/lib/documents/convert-docx";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Nie przesłano pliku.",
        },
        {
          status: 400,
        }
      );
    }

    if (!file.name.toLowerCase().endsWith(".docx")) {
      return NextResponse.json(
        {
          error:
            "Dozwolone są wyłącznie pliki Word w formacie .docx.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            "Plik jest za duży. Maksymalny rozmiar to 10 MB.",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const result = await convertDocxToHtml(buffer);

    return NextResponse.json({
      fileName: file.name,
      html: result.html,
      warnings: result.warnings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Wystąpił błąd podczas przetwarzania dokumentu.",
      },
      {
        status: 500,
      }
    );
  }
}