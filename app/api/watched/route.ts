import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { tmdbId } = await req.json();
  if (!tmdbId)
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  const existing = await prisma.watched.findUnique({
    where: { userId_tmdbId: { userId: session.user.id, tmdbId } },
  });

  if (existing) {
    return NextResponse.json({ message: "Ya marcado como visto" });
  }

  const watched = await prisma.watched.create({
    data: { userId: session.user.id, tmdbId },
  });

  return NextResponse.json(watched);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { tmdbId } = await req.json();
  if (!tmdbId)
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  await prisma.watched.deleteMany({
    where: { userId: session.user.id, tmdbId },
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const watched = await prisma.watched.findMany({
    where: { userId: session.user.id },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(watched);
}
