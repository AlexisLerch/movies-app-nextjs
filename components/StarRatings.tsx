"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface StarRatingProps {
  movieId: number;
}

export default function StarRatings({ movieId }: StarRatingProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Traer rating guardado al cargar
  useEffect(() => {
    if (!session?.user?.id) return;

    fetch(`/api/ratings?movieId=${movieId}`)
      .then((res) => res.json())
      .then((data) => setRating(data.score || 0))
      .catch((err) => console.error("Error fetching rating:", err));
  }, [movieId, session?.user?.id]);

  const handleClick = async (starIndex: number, isHalf: boolean) => {
    if (!session?.user?.id) return;

    const newRating = isHalf ? starIndex + 0.5 : starIndex + 1;
    setRating(newRating);

    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId, score: newRating }),
      });
    } catch (err) {
      console.error("Error saving rating:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        // Determinar estado de estrella
        const fill = hover ? hover : rating;
        let className = "text-white"; // base blanco
        if (fill >= i + 1)
          className = "text-yellow-400"; // llena completa
        else if (fill >= i + 0.5) className = "text-yellow-400/50"; // media estrella

        return (
          <div key={i} className="relative cursor-pointer text-4xl md:text-5xl">
            {/* Media estrella clicable */}
            <div
              className="absolute left-0 top-0 w-1/2 h-full z-10"
              onClick={() => handleClick(i, true)}
              onMouseEnter={() => setHover(i + 0.5)}
              onMouseLeave={() => setHover(0)}
            />
            {/* Estrella completa clicable */}
            <div
              className="absolute right-0 top-0 w-1/2 h-full z-10"
              onClick={() => handleClick(i, false)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
            />
            {/* Estrella visible */}
            <span className={className}>★</span>
          </div>
        );
      })}
      <span className="ml-3 text-lg font-semibold text-white">
        {rating} / 5
      </span>
    </div>
  );
}
