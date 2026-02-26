import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/tmdb";

type Props = {
  movies: Movie[];
};

export default function Destacadas({ movies }: Props) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent">
        🔥 Destacadas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="group block"
          >
            <article
              className="
                relative 
                rounded-2xl 
                overflow-hidden 
                shadow-lg 
                transition-all 
                duration-300 
                bg-bgCard 
                text-textMain
                group-hover:-translate-y-1 
                group-hover:shadow-2xl
              "
            >
              {/* Imagen responsive con aspect ratio */}
              <div className="relative w-full aspect-video">
                <Image
                  src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {movie.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2 sm:line-clamp-3">
                  {movie.overview}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <hr className="my-12 sm:my-16 border-borderMain" />
    </section>
  );
}
