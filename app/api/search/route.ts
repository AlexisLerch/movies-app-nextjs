import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const data = await searchMovies(query, 1);

  return NextResponse.json({
    results: data.results,
  });
}
