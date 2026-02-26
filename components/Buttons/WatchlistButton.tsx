"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tmdbId: number;
  initialIsWatchlist: boolean;
  className?: string;
};

export default function WatchlistButton({
  tmdbId,
  initialIsWatchlist,
  className,
}: Props) {
  const router = useRouter();
  const [isWatchlist, setIsWatchlist] = useState(initialIsWatchlist);
  const [loading, setLoading] = useState(false);

  const toggleWatchlist = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/watchlist", {
        method: isWatchlist ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tmdbId }),
      });

      if (!res.ok) throw new Error("Error al actualizar watchlist");

      setIsWatchlist(!isWatchlist);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const baseClass =
    "px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm";
  const colorClass = isWatchlist
    ? "bg-gray-900 hover:bg-gray-800"
    : "bg-gray-900 hover:bg-gray-800";

  return (
    <button
      onClick={toggleWatchlist}
      disabled={loading}
      className={`${baseClass} ${colorClass} text-white ${className || ""}`}
    >
      {loading
        ? "Procesando..."
        : isWatchlist
          ? "❌ Quitar de Watchlist"
          : "⌚ Agregar a Watchlist"}
    </button>
  );
}
