import LoginForm from "@/components/Login/Login";
import Destacadas from "@/components/Inicio/Destacadas";
import Carousel from "@/components/Inicio/Carrusel";
import MovieCard from "@/components/MoviesComponents/MovieCard";
import { getPopularMoviesExact } from "@/lib/tmdb";

export default async function LoginPage() {
  const results = await getPopularMoviesExact(26);

  const featured = results.slice(0, 4);
  const carousel = results.slice(4, 14);
  const simpleList = results.slice(14, 26);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-color-background text-color-foreground mt-10">
      <LoginForm />
      <div className="mx-auto max-w-6xl p-6 space-y-10 bg-color-background text-color-foreground min-h-screen ">
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
    </div>
  );
}
