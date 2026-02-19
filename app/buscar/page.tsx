import Link from "next/link";
import MoviesGrid from "@/components/MoviesComponents/MoviesGrid";
import { getPopularMovies, searchMovies } from "@/lib/tmdb";

interface BuscarPageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const params = await searchParams;

  const page = Number(params?.page ?? "1");
  const query = params?.query ?? "";

  const data = query
    ? await searchMovies(query, page)
    : await getPopularMovies(page);

  const { results, total_pages } = data;

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8 bg-color-background text-color-foreground min-h-screen">
      {/* Mensaje principal */}
      {/* 🔎 Buscador */}
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Buscar Películas</h1>

        <form
          action="/buscar"
          className="w-full max-w-2xl flex items-center gap-3"
        >
          <input
            type="text"
            name="query"
            placeholder="Ej: Batman, Avengers, Titanic..."
            className="flex-1 px-4 py-3 rounded-xl bg-bgCard border border-borderMain focus:outline-none focus:ring-2 focus:ring-accent transition"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition"
          >
            Buscar
          </button>
        </form>
      </section>
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
