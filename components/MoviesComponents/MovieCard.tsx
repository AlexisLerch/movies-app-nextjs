import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer block"
    >
      <div className="aspect-2/3 relative w-full">
        {poster ? (
          <Image
            src={poster}
            alt={movie.title ?? movie.name ?? "Poster"}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
      </div>
    </Link>
  );
}
