"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio🏠" },
    { href: "/buscar", label: "Buscar🔍" },
    { href: "/perfil", label: "Perfil👤" },
  ];

  return (
    <nav className="flex items-center justify-between p-1 px-100 bg-[var(--navbar-bg)] text-[var(--navbar-text)] border-b border-[var(--navbar-border)]">
      <Logo />
      <div className="flex gap-6">
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
      </div>
    </nav>
  );
}
