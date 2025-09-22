import Image from "next/image";
import { getMovieDetail } from "@/lib/tmdb";
import ImageModal from "@/components/Modal/ImageModal";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE!;

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const movie = await getMovieDetail(id);

  const year = movie.release_date?.slice(0, 4) ?? "";
  const imgPoster = movie.poster_path ? `${IMG_BASE}/w500${movie.poster_path}` : null;
  const imgBackdrop = movie.backdrop_path ? `${IMG_BASE}/w1280${movie.backdrop_path}` : null;

  // Director
  const director = movie.credits.crew.find((c) => c.job === "Director");

  // Actores principales
  const topCast = movie.credits.cast.slice(0, 5);

  // Trailer de YouTube (si existe)
  const trailer = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  return (
    <main className="max-w-5xl mx-auto p-4 mt-10">
      {/* Banner */}
      {imgBackdrop && (
        <ImageModal
          src={imgBackdrop}
          alt={`${movie.title} backdrop`}
          thumb={
            <div className="relative w-full h-64 md:h-96 mb-6">
              <Image
                src={imgBackdrop}
                alt={`${movie.title} backdrop`}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg" />
            </div>
          }
        />
      )}

      {/* Poster */}
      <div className="flex flex-col md:flex-row gap-12 pt-8">
        {imgPoster && (
          <ImageModal
            src={imgPoster}
            alt={movie.title}
            thumb={
              <div className="mx-auto mb-6 w-[60%] max-w-[280px] md:mx-0 md:mb-0 md:w-[300px]">
                <Image
                  src={imgPoster}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            }
          />
        )}

        {/* Info principal */}
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-textMuted mb-2">“{movie.tagline}”</p>
          )}
          <p className="text-textMuted mb-4">
            {year} · ⭐ {movie.vote_average.toFixed(1)} · ⏱ {movie.runtime} min
          </p>

          <p className="text-textMuted italic leading-relaxed mb-10">{movie.overview}</p>

          {/* Géneros */}
          {movie.genres.length > 0 && (
            <p className="mb-2">
              <span className="font-semibold text-lg">Géneros:</span>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}

          {/* Director */}
          {director && (
            <p className="mb-2">
              <span className="font-semibold text-lg">Director:</span> {director.name}
            </p>
          )}

          {/* Actores */}
          {topCast.length > 0 && (
            <p className="mb-8">
              <span className="font-semibold text-lg">Reparto:</span>{" "}
              {topCast.map((a) => `${a.name} (${a.character})`).join(", ")}
            </p>
          )}

          {/* Budget y revenue */}
          <div className="flex flex-row gap-10 justify-center md:justify-start">

          {movie.budget > 0 && (
            <p className="mb-2">
              <span className="font-semibold text-sm">Presupuesto:</span> ${movie.budget.toLocaleString()}
            </p>
          )}
          {movie.revenue > 0 && (
            <p className="mb-2">
              <span className="font-semibold text-sm">Recaudación:</span> ${movie.revenue.toLocaleString()}
            </p>
          )}
          </div>
        </div>
      </div>

      {/* Trailer */}
      {trailer && (
        <div className="mt-8 mb-50 pt-10">
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}

      {/* Footer */}
      <section className="text-center text-sm text-color-muted pt-40 pb-15">
        <p>Powered by TMDB</p>
      </section>
    </main>
  );
}
