import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { tmdbId, slot } = await req.json();

    if (!tmdbId || !slot) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const featured = await prisma.featuredMovie.upsert({
      where: {
        userId_slot: {
          userId: dbUser.id,
          slot,
        },
      },
      update: {
        tmdbId,
      },
      create: {
        userId: dbUser.id,
        tmdbId,
        slot,
      },
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
