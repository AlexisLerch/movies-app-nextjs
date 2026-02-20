"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      const login = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (!login?.error) router.push("/iniciopage");
    } else {
      setError(data.error || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 w-120 p-8 rounded-2xl shadow-2xl border border-zinc-800"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Crear Cuenta
        </h1>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Nombre"
            required
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            required
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center mt-6">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-white hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
