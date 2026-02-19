// app/api/auth/login/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Buscar usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    // Generar token
    const token = generateToken(user.id);

    // ✅ Devuelve cookie correctamente
    return NextResponse.json(
      { message: "Login successful" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure=${process.env.NODE_ENV === "production"}`,
        },
      },
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Login error" }, { status: 500 });
  }
}
