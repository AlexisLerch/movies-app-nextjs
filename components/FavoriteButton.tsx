"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tmdbId: number;
  initialIsFavorite: boolean;
};

export default function FavoriteButton({ tmdbId, initialIsFavorite }: Props) {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST", // 👈 mejor que toggle oculto
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar favoritos");
      }

      // Actualización inmediata (UX)
      setIsFavorite(!isFavorite);

      // 🔥 Fuerza actualización del Server Component
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-white transition ${
        isFavorite
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-700 hover:bg-gray-800"
      }`}
    >
      {loading
        ? "Procesando..."
        : isFavorite
          ? "❤️ En Favoritos"
          : "🤍 Agregar a Favoritos"}
    </button>
  );
}
