import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const movie = await prisma.movie.create({
    data: {
      title: body.title,
      overview: body.overview,
      posterUrl: body.posterUrl,
      releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
    },
  });

  return NextResponse.json(movie);
}

export async function GET() {
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(movies);
}
