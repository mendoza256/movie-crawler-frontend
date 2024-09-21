import { TMDBMovieType } from "@/app/lib/baseTypes";
import { useEffect, useState } from "react";

async function fetchTrendingMovies() {
  const res = await fetch(`/api/tmdb/trending`);
  if (!res.ok) {
    throw new Error(`Failed to look up movie: ${res.status}`);
  }
  const { success, data } = await res.json();
  if (success) {
    return data.results;
  }
}

export function useTrendingTmdbMovies() {
  const [trendingMovies, setTrendingMovies] = useState<TMDBMovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchTrendingMovies()
      .then((movies) => setTrendingMovies(movies))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { trendingMovies, isLoading, error };
}
