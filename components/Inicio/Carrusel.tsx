"use client";

import { useRef } from "react";
import MovieCard from "../MoviesComponents/MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function Carousel({ movies }: { movies: Movie[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const amount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Flecha izquierda */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black text-xl"
      >
        ←
      </button>

      {/* Carrusel */}
      <div
        ref={containerRef}
        className="
          flex 
          gap-4 
          overflow-x-auto 
          no-scrollbar 
          scroll-smooth
          px-4 sm:px-8
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              shrink-0 
              w-35 
              sm:w-40 
              md:w-45
            "
          >
            <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black text-xl"
      >
        →
      </button>
    </div>
  );
}
