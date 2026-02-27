"use client";

import { useState, useEffect } from "react";
import MoviesGrid from "@/components/MoviesComponents/MoviesGrid";
import type { Movie } from "@/lib/tmdb";
import { useRouter } from "next/navigation";

interface LiveSearchProps {
  onSelect?: (movie: Movie) => void;
}

export default function LiveSearch({ onSelect }: LiveSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true);

      const endpoint = query
        ? `/api/search?query=${encodeURIComponent(query)}`
        : `/api/popular`;

      const res = await fetch(endpoint);
      const data = await res.json();

      setMovies(data.results as Movie[]);
      setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  function handleMovieClick(movie: Movie) {
    if (onSelect) {
      onSelect(movie);
    } else {
      router.push(`/movies/${movie.id}`);
    }
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-xl px-5 py-4 text-lg rounded-2xl bg-bgCard border border-borderMain focus:outline-none focus:ring-2 focus:ring-accent transition"
      />

      {loading && <p className="text-sm opacity-60">Buscando...</p>}

      <MoviesGrid movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
}
