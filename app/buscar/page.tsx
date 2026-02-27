import LiveSearch from "@/components/Buscar/LiveSearch";

export default function BuscarPage() {
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-10 bg-color-background text-color-foreground min-h-screen">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Buscar Películas</h1>

        <div className="w-full max-w-6xl">
          <LiveSearch />
        </div>
      </section>
    </main>
  );
}
