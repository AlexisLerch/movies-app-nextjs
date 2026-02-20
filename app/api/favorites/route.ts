import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  return NextResponse.json({ favorites });
}
