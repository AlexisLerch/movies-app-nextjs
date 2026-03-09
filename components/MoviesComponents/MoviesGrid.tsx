import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";

interface MoviesGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export default function MoviesGrid({ movies, onMovieClick }: MoviesGridProps) {
  return (
    <section className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onClick={() => onMovieClick?.(m)} />
      ))}
    </section>
  );
}
