import MovieCard from "./MovieCard";
import type { Movie } from "../../../lib/tmdb";

export default function MoviesGrid({ movies }: { movies: Movie[] }) {
  return (
    <section className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          id={m.id}
          title={m.title ?? m.name ?? "Sin título"}
          poster_path={m.poster_path}
          vote_average={m.vote_average}
          release_date={m.release_date ?? m.first_air_date}
        />
      ))}
    </section>
  );
}
