"use client";

import { useRouter } from "next/navigation";
import LiveSearch from "@/components/Buscar/LiveSearch";
import type { Movie } from "@/lib/tmdb";

export default function SelectFeaturedClient({ slot }: { slot?: string }) {
  const router = useRouter();

  async function handleSelect(movie: Movie) {
    const res = await fetch("/api/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tmdbId: movie.id, slot: Number(slot) }),
    });

    console.log(await res.json());

    router.replace("/perfil");
    router.refresh();
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
