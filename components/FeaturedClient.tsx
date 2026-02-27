"use client"; // obligatorio para client components

import { useSearchParams } from "next/navigation";

export default function FeaturedClient() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter"); // ejemplo de query param

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Featured Movies</h1>
      {filter && <p>Filtro aplicado: {filter}</p>}
      {/* Aquí va tu listado o UI dependiendo del query param */}
    </div>
  );
}
