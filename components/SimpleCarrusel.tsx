"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type MovieItem = {
  id: string | number;
  tmdbId: number;
  rating: number;
  movie: {
    title: string;
    poster_path: string | null;
  };
};

type Props = {
  movies: MovieItem[];
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = rating >= star;
        const isHalf = rating >= star - 0.5 && rating < star;

        return (
          <span
            key={star}
            className={`text-sm drop-shadow-md ${
              isFull
                ? "text-yellow-400"
                : isHalf
                  ? "text-yellow-400 opacity-50"
                  : "text-white/20"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default function SimpleCarousel({ movies }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const amount = 400;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Botón izquierda */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-bgCard/80 backdrop-blur border border-borderMain hover:bg-bgCard transition text-textMain rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-lg"
      >
        ←
      </button>

      {/* Botón derecha */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-bgCard/80 backdrop-blur border border-borderMain hover:bg-bgCard transition text-textMain rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-lg"
      >
        →
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {movies.map((item) => {
          const poster = item.movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.movie.poster_path}`
            : null;

          return (
            <Link
              key={item.id}
              href={`/movies/${item.tmdbId}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg min-w-40 snap-start"
            >
              <div className="aspect-2/3 w-full relative">
                {poster ? (
                  <Image
                    src={poster}
                    alt={item.movie.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800" />
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-white text-sm font-semibold">Ver</span>
                </div>

                {item.rating > 0 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Stars rating={item.rating} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
