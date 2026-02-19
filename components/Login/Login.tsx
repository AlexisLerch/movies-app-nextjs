"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Cookie ya está guardada automáticamente
      router.push("/inicio");
    } catch (err) {
      console.error(err);
      setMessage("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        🎬 Movie App Login
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p className="text-red-400 text-center mt-4">{message}</p>}

      {/* Botón de Register */}
      <div className="mt-6 text-center">
        <p className="text-white mb-2">¿No tienes cuenta?</p>
        <button
          onClick={() => router.push("/register")}
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
