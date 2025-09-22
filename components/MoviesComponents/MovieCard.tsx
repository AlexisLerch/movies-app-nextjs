import Image from "next/image";
import Link from "next/link";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE!;

type Props = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
};

export default function MovieCard({ id, title, poster_path, vote_average, release_date }: Props) {
  const year = release_date?.slice(0, 4) ?? "";
  const imgSrc = poster_path ? `${IMG_BASE}/w185${poster_path}` : null;

  return (
    <Link href={`/movies/${id}`} className="block group">
      <article
        className="rounded-lg overflow-hidden shadow transition-transform duration-300 cursor-pointer
                   group-hover:-translate-y-1 group-hover:shadow-lg
                   bg-bgCard text-textMain"
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            width={185}
            height={278}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-[2/3] w-full bg-borderMain grid place-items-center text-textMuted text-xs">
            Sin póster
          </div>
        )}
        <div className="p-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-sm mt-1 text-textMuted">
            {year ? `${year} · ` : ""}⭐ {vote_average.toFixed(1)}
          </p>
        </div>
      </article>
    </Link>
  );
}
