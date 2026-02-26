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
    <>
      <nav className="w-full border-b border-(--navbar-border) bg-(--navbar-bg) text-(--navbar-text) relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-(--navbar-hover) ${
                    pathname === link.href ? "text-accent font-semibold" : ""
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
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-(--navbar-bg) border-l border-(--navbar-border) shadow-2xl transform transition-transform duration-300 md:hidden z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6 mt-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`transition-colors hover:text-(--navbar-hover) ${
                pathname === link.href ? "text-accent font-semibold" : ""
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
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
}
