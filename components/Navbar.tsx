"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si hay token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const links = [
    { href: "/home", label: "Inicio🏠" },
    { href: "/buscar", label: "Buscar🔍" },
    { href: isLoggedIn ? "/perfil" : "/login", label: "Perfil👤" }, // dinámico
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between p-3 px-10 bg-[var(--navbar-bg)] text-[var(--navbar-text)] border-b border-[var(--navbar-border)]">
      <Logo />
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-[var(--color-accent)] font-bold"
                : ""
            } hover:text-[var(--navbar-hover)] transition-colors`}
          >
            {link.label}
          </Link>
        ))}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
