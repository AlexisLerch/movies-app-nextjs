"use client";

import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";

interface MoviesGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export default function MoviesGrid({ movies, onMovieClick }: MoviesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick?.(movie)} // 👈 funciona ahora
        />
      ))}
    </div>
  );
}
