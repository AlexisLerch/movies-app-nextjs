import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tmdbId, slot } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const featured = await prisma.featuredMovie.upsert({
    where: {
      userId_slot: {
        userId: user.id,
        slot,
      },
    },
    update: {
      tmdbId,
    },
    create: {
      userId: user.id,
      tmdbId,
      slot,
    },
  });

  return NextResponse.json(featured);
}
