import { useState, useEffect } from "react";
import { TMDBMovieType, WatchlistMovieType } from "@/app/lib/baseTypes";
import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";

export function useMovies(userId: string | undefined) {
  const [watchlistMovies, setWatchlistMovies] = useState<WatchlistMovieType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchMongoDBUser(userId)
        .then(({ user }) => setWatchlistMovies(user.watchlist))
        .catch(() => setError("Failed to fetch watchlist. Please try again."))
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

  return { watchlistMovies, isLoading, error };
}
