import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.user.id; // <-- string directo, no Number()

    const body = await req.json();
    const movieIdNum = Number(body.movieId);
    const scoreNum = Number(body.score);

    if (isNaN(movieIdNum) || isNaN(scoreNum)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const rating = await prisma.rating.upsert({
      where: { movieId_userId: { movieId: movieIdNum, userId } },
      update: { score: scoreNum },
      create: { movieId: movieIdNum, userId, score: scoreNum },
    });

    return NextResponse.json(rating);
  } catch (err: any) {
    console.error("POST /api/ratings error:", err);
    return NextResponse.json(
      { error: "Error guardando rating" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) return NextResponse.json({ score: 0 });

    const userId = session.user.id; // <-- string directo

    const movieIdNum = Number(
      new URL(req.url).searchParams.get("movieId") || 0,
    );
    if (!movieIdNum) return NextResponse.json({ score: 0 });

    const rating = await prisma.rating.findUnique({
      where: { movieId_userId: { movieId: movieIdNum, userId } },
    });

    return NextResponse.json(rating || { score: 0 });
  } catch (err) {
    console.error("GET /api/ratings error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
