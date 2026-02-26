"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tmdbId: number;
  initialIsWatchlist: boolean;
};

export default function WatchlistButton({ tmdbId, initialIsWatchlist }: Props) {
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

      if (!res.ok) throw new Error();

      setIsWatchlist(!isWatchlist);

      // 🔥 Esto es clave
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-white transition ${
        isWatchlist ? "bg-red-500" : "bg-accent"
      }`}
    >
      {loading
        ? "Procesando..."
        : isWatchlist
          ? "❌ Quitar de Watchlist"
          : "⌚ Agregar a Watchlist"}
    </button>
  );
}
