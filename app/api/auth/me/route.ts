// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  console.log("COOKIES HEADER:", req.headers.get("cookie"));
  try {
    // 🔥 Leer cookie desde el request
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Buscar token dentro del string de cookies
    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.log("ME ERROR:", err);
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}
