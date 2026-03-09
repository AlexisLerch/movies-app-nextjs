"use client";

import Image from "next/image";
import type { Movie } from "@/lib/tmdb";

interface MoviesGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export default function MoviesGrid({ movies, onMovieClick }: MoviesGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {movies.map((movie) => {
        const poster = movie.poster_path
          ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w342${movie.poster_path}`
          : null;

        return (
          <div
            key={movie.id}
            onClick={() => onMovieClick?.(movie)}
            className="cursor-pointer group"
          >
            <div className="aspect-2/3 relative rounded-xl overflow-hidden">
              {poster ? (
                <Image
                  src={poster}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="w-full h-full bg-gray-800" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
