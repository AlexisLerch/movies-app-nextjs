import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Rutas protegidas
const protectedRoutes = ["/home", "/perfil", "/favorites"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Si la ruta no es protegida, dejar pasar
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

// Rutas que aplica el middleware
export const config = {
  matcher: ["/home/:path*", "/perfil/:path*", "/favorites/:path*"],
};
