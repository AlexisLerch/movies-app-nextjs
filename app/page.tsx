import { getPopularMoviesExact } from "../lib/tmdb";
import MovieCard from "@/components/MoviesComponents/MovieCard";
import Carousel from "@/components/Inicio/Carrusel";
import Destacadas from "@/components/Inicio/Destacadas";

export default async function Home() {
  const results = await getPopularMoviesExact(26);

  const featured = results.slice(0, 4); // 4 más populares (destacadas)
  const carousel = results.slice(4, 14); // 10 siguientes
  const simpleList = results.slice(14, 26); // 10 más en grid

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-10 bg-color-background text-color-foreground min-h-screen ">
      <section className="w-full mb-6">
        <h1 className="text-2xl font-semibold text-textMuted/60 mt-6 text-center opacity-50">
          Welcome back, <span className="text-textMain/80">Alexis Lerch</span>.
          Here’s what your friends have been watching…
        </h1>
      </section>

      {/* Sección de destacadas */}
      <section>
        <Destacadas movies={featured} />
      </section>

      {/* Carrusel */}
      <section>
        <h2 className="text-3xl font-bold mb-4 ">Más Populares</h2>
        <Carousel movies={carousel} />
        <hr className="my-20 border-color-border" />
      </section>

      {/* Grid simple */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Recomendadas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 pb-50">
          {simpleList.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="text-center text-sm text-color-muted">
        <p>Powered by TMDB</p>
      </section>
    </div>
  );
}
