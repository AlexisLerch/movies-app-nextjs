import { Suspense } from "react";
import FeaturedClient from "../../../components/FeaturedClient";

export default function FeaturedPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Cargando...</div>}>
        <FeaturedClient />
      </Suspense>
    </div>
  );
}
