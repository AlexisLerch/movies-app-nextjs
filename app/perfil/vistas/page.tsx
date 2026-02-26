import { prisma } from "@/lib/prisma";
import { getMovieDetail } from "@/lib/tmdb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE!;

type WatchedRecord = {
  id: string;
  userId: number;
  tmdbId: number;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <p>No autorizado</p>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <p>Usuario no encontrado</p>;
  }

  const watched = await prisma.watched.findMany({
    where: { userId: user.id },
  });

  const movies = await Promise.all(
    watched.map((fav: WatchedRecord) => getMovieDetail(fav.tmdbId.toString())),
  );

  return (
    <main className="min-h-screen mx-auto max-w-6xl p-6 mt-10 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Mi Watchlist</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie: Movie) => {
          const imgSrc = movie.poster_path
            ? `${IMG_BASE}/w342${movie.poster_path}`
            : null;

          return (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="bg-bgCard rounded-lg overflow-hidden shadow hover:scale-105 transition">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={movie.title}
                    width={342}
                    height={513}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="aspect-2/3 bg-gray-800 grid place-items-center text-sm">
                    Sin imagen
                  </div>
                )}

                <div className="p-3">
                  <p className="font-semibold text-sm line-clamp-1">
                    {movie.title}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
