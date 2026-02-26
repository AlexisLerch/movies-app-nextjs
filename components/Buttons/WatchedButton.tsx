"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tmdbId: number;
  initialIsWatched: boolean;
  className?: string;
};

export default function WatchedButton({
  tmdbId,
  initialIsWatched,
  className,
}: Props) {
  const router = useRouter();
  const [isWatched, setIsWatched] = useState(initialIsWatched);
  const [loading, setLoading] = useState(false);

  const toggleWatched = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/watched", {
        method: isWatched ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });

      if (!res.ok) throw new Error("Error al actualizar película vista");

      setIsWatched(!isWatched);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la película vista");
    } finally {
      setLoading(false);
    }
  };

  const baseClass =
    "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm";
  const colorClass = isWatched
    ? "bg-gray-900 hover:bg-gray-800"
    : "bg-gray-900 hover:bg-gray-800";

  return (
    <button
      onClick={toggleWatched}
      disabled={loading}
      className={`${baseClass} ${colorClass} text-white ${className || ""}`}
    >
      {loading
        ? "Procesando..."
        : isWatched
          ? "👁️ Visto"
          : "👁️ Marcar como visto"}
    </button>
  );
}
