import Image from "next/image";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE!;

type Props = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
};

export default function MovieCard({ title, poster_path, vote_average, release_date }: Props) {
  const year = release_date?.slice(0, 4) ?? "";
  const imgSrc = poster_path ? `${IMG_BASE}/w185${poster_path}` : null;

  return (
    <article className="rounded-lg overflow-hidden shadow hover:shadow-md transition">
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={title}
          width={185}
          height={278}
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="aspect-[2/3] w-full bg-gray-200 grid place-items-center text-gray-500 text-xs">
          Sin póster
        </div>
      )}
      <div className="p-2">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm mt-1 text-gray-500">
          {year ? `${year} · ` : ""}⭐ {vote_average.toFixed(1)}
        </p>
      </div>
    </article>
  );
}
