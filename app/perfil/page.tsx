import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getMovieDetail } from "@/lib/tmdb";
import SimpleCarrusel from "@/components/SimpleCarrusel";
import Avatar from "@/public/images/avatar.jpg";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true, name: true, email: true },
  });

  if (!dbUser) {
    redirect("/login");
  }

  // ===============================
  // STATS
  // ===============================

  const [watchlistCount, favoritesCount, watchCount] = await Promise.all([
    prisma.watchlist.count({
      where: { userId: dbUser.id },
    }),
    prisma.favorite.count({
      where: { userId: dbUser.id },
    }),
    prisma.watched.count({
      where: { userId: dbUser.id },
    }),
  ]);

  // ===============================
  // WATCHED + RATINGS
  // ===============================

  const watched = await prisma.watched.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const ratings = await prisma.rating.findMany({
    where: {
      userId: dbUser.id,
      movieId: {
        in: watched.map((w) => w.tmdbId),
      },
    },
  });

  const ratingMap = Object.fromEntries(
    ratings.map((r) => [r.movieId, r.score]),
  );

  const recentMovies = await Promise.all(
    watched.map(async (w) => {
      const movie = await getMovieDetail(String(w.tmdbId));

      return {
        ...w,
        movie,
        rating: ratingMap[w.tmdbId] ?? 0,
      };
    }),
  );

  // ===============================
  // FEATURED
  // ===============================

  const featuredMovies = await prisma.featuredMovie.findMany({
    where: { userId: dbUser.id },
  });

  const featuredWithDetails = await Promise.all(
    featuredMovies.map(async (m) => {
      try {
        const movie = await getMovieDetail(String(m.tmdbId));
        return { ...m, movie };
      } catch {
        return null;
      }
    }),
  );

  const validFeatured = featuredWithDetails.filter(Boolean);

  const stats = {
    watched: watchCount,
    favorites: favoritesCount,
    lists: watchlistCount,
  };

  const slots = [1, 2, 3, 4];

  return (
    <div className="min-h-screen mx-auto max-w-6xl bg-bgMain text-textMain px-6 py-10 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-borderMain">
          <Image
            src={Avatar}
            alt="Avatar"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{dbUser.name}</h1>
          <p className="text-textMuted">{dbUser.email}</p>

          <div className="flex justify-center md:justify-start gap-8 mt-6">
            <Link href="/perfil/vistas">
              <div>
                <p className="font-bold text-lg">{stats.watched}</p>
                <p className="text-textMuted text-sm">Watched</p>
              </div>
            </Link>

            <Link href="/perfil/favoritas">
              <div>
                <p className="font-bold text-lg">{stats.favorites}</p>
                <p className="text-textMuted text-sm">Favorites</p>
              </div>
            </Link>

            <Link href="/perfil/watchlist">
              <div>
                <p className="font-bold text-lg">{stats.lists}</p>
                <p className="text-textMuted text-sm">WatchLists</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Destacadas</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {slots.map((slot) => {
            const movieInSlot = validFeatured.find((m) => m?.slot === slot);

            if (!movieInSlot) {
              return (
                <Link
                  key={slot}
                  href={`/perfil/featured/select?slot=${slot}`}
                  className="aspect-2/3 bg-bgCard border-2 border-dashed border-borderMain rounded-2xl flex items-center justify-center hover:opacity-80 transition"
                >
                  <span className="text-4xl text-textMuted">+</span>
                </Link>
              );
            }

            const poster = movieInSlot.movie.poster_path
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/w342${movieInSlot.movie.poster_path}`
              : null;

            return (
              <Link
                key={slot}
                href={`/perfil/featured/select?slot=${slot}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-2/3 w-full relative">
                  {poster ? (
                    <Image
                      src={poster}
                      alt={movieInSlot.movie.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <hr className="text-2xl"></hr>

      {/* ÚLTIMAS VISTAS */}
      <div className="mt-16 mb-20">
        <h2 className="text-xl font-semibold mb-6">Últimas vistas</h2>

        {recentMovies.length === 0 ? (
          <div className="bg-bgCard p-6 rounded-2xl border border-borderMain">
            <p className="text-textMuted text-sm">
              No viste ninguna película todavía.
            </p>
          </div>
        ) : (
          <SimpleCarrusel movies={recentMovies} />
        )}
      </div>
      <hr className="mb-40 text-2xl"></hr>
    </div>
  );
}
