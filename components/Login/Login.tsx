"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Credenciales incorrectas");
    } else {
      router.push("/iniciopage");
    }
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 w-120 h-80 p-8 rounded-2xl shadow-2xl border border-zinc-800"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Iniciar Sesión
        </h1>

        <div className="flex flex-col gap-4">
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center mt-6">
          ¿No tenés cuenta?{" "}
          <Link href="/register" className="text-white hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
