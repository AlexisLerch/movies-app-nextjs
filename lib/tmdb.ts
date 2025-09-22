const BASE_URL = process.env.TMDB_BASE_URL!;
const API_KEY = process.env.TMDB_API_KEY!;

export type TMDBPaginated<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  id: number;
  title: string;
  name?: string; // por si el endpoint trae "name" (series)
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
};

export type MovieDetail = Movie & {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
    }[];
  };
  videos: {
    results: {
      key: string;
      site: string;
      type: string;
      name: string;
    }[];
  };
};

async function tmdbGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  // puedes setear idioma si quieres:
  // url.searchParams.set("language", "es-ES");

  const res = await fetch(url.toString(), {
    ...init,
    // Para forzar SSR fresh data cada carga:
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }
  return res.json();
}

// Populares (películas)
export async function getPopularMovies(page = 3) {
  return tmdbGet<TMDBPaginated<Movie>>(`/movie/popular?page=${page}`);
}

// Popular movies con múltiples páginas
export async function getPopularMoviesExact(count = 26) {
  let allResults: Movie[] = [];
  let page = 1;

  while (allResults.length < count) {
    const data = await tmdbGet<TMDBPaginated<Movie>>(`/movie/popular?page=${page}`);
    allResults = [...allResults, ...data.results];
    page++;
  }

  return allResults.slice(0, count);
}

// Tendencias (por semana)
export async function getTrendingMovies(page = 1) {
  return tmdbGet<TMDBPaginated<Movie>>(`/trending/movie/week?page=${page}`);
}

// Detalle de película
export async function getMovieDetail(id: string) {
   return tmdbGet<MovieDetail>(`/movie/${id}?append_to_response=credits,videos&language=es-ES`);
}


