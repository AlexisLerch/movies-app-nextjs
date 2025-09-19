import Link from "next/link";
import MoviesGrid from "../components/MoviesGrid";
import { getPopularMovies } from "../lib/tmdb";


export default async function BuscarPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams?.page ?? "1");
  const { results, total_pages } = await getPopularMovies(page);

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8 bg-color-background text-color-foreground min-h-screen">
      {/* Mensaje principal */}
      {/* <h1 className="text-3xl font-extralight text-center opacity-80 py-6">
        Welcome back, Alexis Lerch. Here’s what your friends have been watching…
      </h1> */}

      {/* Sección de películas */}
      <section>
        {/* <h2 className="text-2xl font-bold py-4 text-color-accent">🎬 Películas Populares</h2> */}
        <hr className="my-6 border-color-border" />
        <MoviesGrid movies={results} />
      </section>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-3 pt-6">
        <Link
          href={`/?page=${Math.max(1, page - 1)}`}
          className={`px-3 py-2 rounded border border-color-border bg-color-surface hover:bg-color-border transition ${
            page <= 1 ? "pointer-events-none opacity-40" : ""
          }`}
          aria-disabled={page <= 1}
        >
          ← Anterior
        </Link>
        <span className="text-sm text-color-muted">
          Página {page} de {total_pages}
        </span>
        <Link
          href={`/?page=${Math.min(total_pages, page + 1)}`}
          className={`px-3 py-2 rounded border border-color-border bg-color-surface hover:bg-color-border transition ${
            page >= total_pages ? "pointer-events-none opacity-40" : ""
          }`}
          aria-disabled={page >= total_pages}
        >
          Siguiente →
        </Link>
      </div>
    </main>
  );
}
