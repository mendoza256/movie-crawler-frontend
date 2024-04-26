"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { WatchlistMovieType } from "@/app/lib/baseTypes";
import Watchlist from "./watchlist";

const WatchlistPage = () => {
  const { userId } = useAuth();
  const [watchlistMovies, setWatchlistMovies] = useState(
    [] as WatchlistMovieType[]
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchWatchlistMovies = async (userId: string) => {
    setIsLoading(true);
    try {
      const { user } = await fetchMongoDBUser(userId);
      setWatchlistMovies(user.watchlist);
    } catch (error) {
      setErrorMessage("Failed to fetch watchlist. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchWatchlistMovies(userId);
    }
  }, [userId]);

  return (
    <section className="mt-10">
      <div className="container flex gap-8 flex-col">
        <h2 className="mb-4">Watchlist</h2>
        <div className="grid gap-8 lg:grid-cols-4 auto-rows-auto">
          {watchlistMovies && (
            <Watchlist watchlist={watchlistMovies} loading={isLoading} />
          )}
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default WatchlistPage;
