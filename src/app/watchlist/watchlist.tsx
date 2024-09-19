"use client";

import { DbMovieType, WatchlistMovieType } from "@/app/lib/baseTypes";
import { shortenMovieOverview } from "@/app/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WatchlistProps {
  watchlistMovies: DbMovieType[];
}

const Watchlist = ({ watchlistMovies }: WatchlistProps) => {
  const [posting, setPosting] = useState(false);

  async function removeFromWatchlist(
    e: React.MouseEvent<HTMLButtonElement>,
    movie: WatchlistMovieType
  ) {
    setPosting(true);
    e.preventDefault();
    try {
      await fetch("/api/user/watchlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie }),
        cache: "no-cache",
      });
      setPosting(false);
    } catch (error) {
      console.error(error);
      setPosting(false);
    }
  }

  return (
    <>
      {watchlistMovies.length >= 1 &&
        watchlistMovies.map((movie) => (
          <div
            key={movie.id}
            className="card shadow-xl image-full before:content-none hover:before:content-[''] transition-all duration-300 ease-in-out"
          >
            <figure>
              <Image
                width={500}
                height={750}
                src={`https://image.tmdb.org/t/p/w500${movie.tmdbData?.poster_path}`}
                alt={movie.title}
              />
            </figure>
            <div className="card-body shrink lg:opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out">
              <h3 className="card-title">
                {movie.title} ({movie.tmdbData?.release_date?.split("-")[0]})
              </h3>
              <p>{shortenMovieOverview(movie.tmdbData?.overview || "", 250)}</p>
              {movie && (
                <div className="card-actions justify-end">
                  <button
                    onClick={(e) => removeFromWatchlist(e, movie)}
                    className="btn btn-primary min-w-12"
                  >
                    {posting ? (
                      <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                      "Remove from Watchlist"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default Watchlist;
