// components/FeaturedSection.tsx
import Image from "next/image";
import type { Movie } from "../lib/tmdb";

type Props = {
  movies: Movie[];
};

export default function Destacadas({ movies }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-color-accent my-20">
        🔥 Destacadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-64 md:h-80 object-cover"
              width={780}
              height={320}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-lg md:text-2xl font-bold text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-20 border-color-border" />
    </section>
  );
}
