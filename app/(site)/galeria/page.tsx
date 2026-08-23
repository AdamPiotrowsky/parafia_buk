import { Camera } from "lucide-react";

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="flex items-center gap-3">
        <Camera />

        <h1 className="text-4xl font-semibold tracking-tight">
          Galeria
        </h1>
      </div>

      <p className="mt-4 text-stone-600">
        Archiwum zdjęć z życia parafii i sanktuarium.
      </p>

      <div className="mt-10 rounded-2xl border border-dashed border-stone-300 p-10 text-center text-stone-500">
        Tutaj pojawią się galerie przeniesione z obecnej strony.
      </div>
    </div>
  );
}