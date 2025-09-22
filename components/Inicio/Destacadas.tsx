import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/tmdb";

type Props = {
  movies: Movie[];
};

export default function Destacadas({ movies }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-accent my-10">
        🔥 Destacadas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="block group"
          >
            <article
              className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 
                         group-hover:-translate-y-1 group-hover:shadow-xl bg-bgCard text-textMain"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                width={780}
                height={320}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-lg md:text-2xl font-bold text-textMain">
                  {movie.title}
                </h3>
                <p className="text-sm text-textMuted line-clamp-2">
                  {movie.overview}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <hr className="my-20 border border-borderMain" />
    </section>
  );
}
