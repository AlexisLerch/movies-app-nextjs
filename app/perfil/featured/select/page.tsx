"use client";

import { useSearchParams, useRouter } from "next/navigation";
import LiveSearch from "@/components/Buscar/LiveSearch";
import type { Movie } from "@/lib/tmdb";

export default function SelectFeaturedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slot = searchParams.get("slot");

  async function handleSelect(movie: Movie) {
    await fetch("/api/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tmdbId: movie.id, slot: Number(slot) }),
    });
    router.push("/perfil");
  }

  return (
    <div className="min-h-screen bg-bgMain text-textMain">
      <div className="max-w-350 mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Elegí tu película destacada</h1>
        <LiveSearch onSelect={handleSelect} />
      </div>
    </div>
  );
}
