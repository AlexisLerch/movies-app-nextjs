"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tmdbId: number;
  initialIsFavorite: boolean;
  className?: string;
};

export default function FavoriteButton({
  tmdbId,
  initialIsFavorite,
  className,
}: Props) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/favorites", {
        method: isFavorite ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });

      if (!res.ok) throw new Error("Error al actualizar favoritos");

      setIsFavorite(!isFavorite);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar favoritos");
    } finally {
      setLoading(false);
    }
  };

  const baseClass =
    "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm";
  const colorClass = isFavorite
    ? "bg-gray-900 hover:bg-gray-800"
    : "bg-gray-900 hover:bg-gray-800";

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`${baseClass} ${colorClass} text-white ${className || ""}`}
    >
      {loading
        ? "Procesando..."
        : isFavorite
          ? "❤️ En Favoritos"
          : "🤍 Agregar a Favoritos"}
    </button>
  );
}
