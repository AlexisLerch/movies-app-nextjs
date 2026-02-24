"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!session;

  const links = isAuthenticated
    ? [
        { href: "/iniciopage", label: "Inicio🏠" },
        { href: "/buscar", label: "Buscar🔍" },
        { href: "/perfil", label: "Perfil👤" },
      ]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
        { href: "/buscar", label: "Buscar🔍" },
      ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] text-[var(--navbar-text)]">
      {/* Contenedor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-[var(--navbar-hover)] ${
                  pathname === link.href
                    ? "text-[var(--color-accent)] font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--navbar-border)] bg-[var(--navbar-bg)] px-4 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block transition-colors hover:text-[var(--navbar-hover)] ${
                pathname === link.href
                  ? "text-[var(--color-accent)] font-semibold"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
