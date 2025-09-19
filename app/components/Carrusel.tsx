"use client";

import { useRef } from "react";
import MovieCard from "./MovieCard";

export type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
};


export default function Carousel({ movies }: { movies: Movie[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const amount = 300; // cuánto scrollear por click
      containerRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Flecha izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black text-xl"
      >
        ←
      </button>

      {/* Carrusel */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-10"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[150px]">
            <MovieCard
                id={movie.id}
                title={movie.title ?? movie.name ?? "Sin título"}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                release_date={movie.release_date ?? movie.first_air_date}
                />
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black text-xl"
      >
        →
      </button>
    </div>
  );
}
