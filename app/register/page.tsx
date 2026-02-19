"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Registro exitoso → redirigir a login
      router.push("/login");
    } catch (error) {
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-zinc-800 p-8 rounded-2xl shadow-xl mx-auto mt-20">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        📝 Register
      </h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 transition text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="text-red-400 text-center mt-4">{message}</p>}

      <div className="mt-6 text-center">
        <p className="text-white mb-2">Already have an account?</p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
