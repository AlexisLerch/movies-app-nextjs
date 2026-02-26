import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  console.log("USER ID EN PERFIL:", user.id);

  const favoriteMovies = [
    { id: 1, title: "Fight Club", poster: "/mock1.jpg" },
    { id: 2, title: "Interstellar", poster: "/mock2.jpg" },
    { id: 3, title: "The Dark Knight", poster: "/mock3.jpg" },
    { id: 4, title: "Whiplash", poster: "/mock4.jpg" },
  ];

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    select: {
      id: true,
    },
  });

  const watchlistCount = await prisma.watchlist.count({
    where: { userId: dbUser?.id },
  });

  const favoritesCount = await prisma.favorite.count({
    where: { userId: dbUser?.id },
  });

  const watchCount = await prisma.watched.count({
    where: { userId: dbUser?.id },
  });

  const stats = {
    watched: watchCount,
    favorites: favoritesCount,
    lists: watchlistCount,
  };

  return (
    <div className="min-h-screen mx-auto max-w-6xl p-6 space-y-10 bg-bgMain text-textMain px-6 py-10">
      {/* HEADER PERFIL */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-borderMain">
          <Image
            src={"/avatar-placeholder.png"}
            alt="Avatar"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-textMuted">@{user.email?.split("@")[0]}</p>

          <p className="mt-4 text-sm max-w-md">
            Cinefilo. Amante del thriller psicológico y el sci-fi. 🎥
          </p>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 mt-6">
            <div>
              <Link href="/perfil/vistas">
                <p className="font-bold text-lg">{stats.watched}</p>
                <p className="text-textMuted text-sm">Watched</p>
              </Link>
            </div>
            <div>
              <Link href="/perfil/favoritas">
                <p className="font-bold text-lg">{stats.favorites}</p>
                <p className="text-textMuted text-sm">Favorites</p>
              </Link>
            </div>
            <div>
              <Link href="/perfil/watchlist">
                <p className="font-bold text-lg">{stats.lists}</p>
                <p className="text-textMuted text-sm">WatchLists</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAVORITAS */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">⭐ Favorites</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {favoriteMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-bgCard rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <div className="h-64 bg-gray-800" />
              <div className="p-3">
                <p className="text-sm font-medium truncate">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVIDAD (placeholder) */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
        <div className="bg-bgCard p-6 rounded-2xl border border-borderMain">
          <p className="text-textMuted text-sm">No recent activity yet.</p>
        </div>
      </div>
    </div>
  );
}
