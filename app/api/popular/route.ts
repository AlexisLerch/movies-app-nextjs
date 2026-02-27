import { NextResponse } from "next/server";
import { getPopularMovies } from "@/lib/tmdb";

export async function GET() {
  const data = await getPopularMovies(1);

  return NextResponse.json({
    results: data.results,
  });
}
