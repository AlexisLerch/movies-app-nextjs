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
    <div className="min-h-screen bg-color-background text-color-foreground">
      {/* Contenedor general */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Login centrado */}
        <div className="flex justify-center">
          <LoginForm />
        </div>

        {/* Destacadas */}
        <section>
          <Destacadas movies={featured} />
        </section>

        {/* Carrusel */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            Más Populares
          </h2>

          <Carousel movies={carousel} />

          <hr className="my-12 sm:my-16 border-color-border" />
        </section>

        {/* Grid Recomendadas */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            Recomendadas
          </h2>

          <div
            className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-6 
            gap-4 sm:gap-6 lg:gap-8
          "
          >
            {simpleList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="text-center text-xs sm:text-sm text-color-muted pt-10">
          <p>Powered by TMDB</p>
        </section>
      </div>
    </div>
  );
}
