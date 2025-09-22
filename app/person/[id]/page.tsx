import Image from "next/image";
import { getPersonDetail, getPersonMovies } from "@/lib/tmdb";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE!;

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await getPersonDetail(id);
  const movies = await getPersonMovies(id);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {person.profile_path && (
          <Image
            src={`${IMG_BASE}/w300${person.profile_path}`}
            alt={person.name}
            width={300}
            height={450}
            className="rounded-lg shadow"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
          {person.biography && (
            <p className="text-textMain leading-relaxed">{person.biography}</p>
          )}
        </div>
      </div>

      {/* Películas como director */}
      {movies.crew.some((m) => m.job === "Director") && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Películas dirigidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {movies.crew
              .filter((m) => m.job === "Director")
              .map((m) => (
                <div key={m.id} className="text-center">
                  {m.poster_path && (
                    <Image
                      src={`${IMG_BASE}/w185${m.poster_path}`}
                      alt={m.title}
                      width={185}
                      height={278}
                      className="rounded-lg shadow"
                    />
                  )}
                  <p className="mt-2 text-sm">{m.title}</p>
                </div>
              ))}
          </div>
        </>
      )}

      {/* Películas como actor */}
      {movies.cast.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Películas como actor</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.cast.map((m) => (
              <div key={m.id} className="text-center">
                {m.poster_path && (
                  <Image
                    src={`${IMG_BASE}/w185${m.poster_path}`}
                    alt={m.title}
                    width={185}
                    height={278}
                    className="rounded-lg shadow"
                  />
                )}
                <p className="mt-2 text-sm">{m.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
