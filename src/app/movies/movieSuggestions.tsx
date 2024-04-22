"use client";

import { TMDBMovieType, WatchlistMovieType } from "@/lib/baseTypes";
import { shortenMovieOverview } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface MovieSuggestionsProps {
  movieSuggestions: TMDBMovieType[];
  loading: boolean;
  watchlist: WatchlistMovieType[];
}

const MovieSuggestions = ({
  movieSuggestions,
  loading,
  watchlist,
}: MovieSuggestionsProps) => {
  const [posting, setPosting] = useState(false);
  const skeletonAmount = 10;
  const filteredSuggestions = movieSuggestions?.filter(
    (movie) => movie.poster_path !== null && movie.release_date !== ""
  );

  async function addToWatchlist(
    e: React.MouseEvent<HTMLButtonElement>,
    movie: TMDBMovieType
  ) {
    setPosting(true);
    e.preventDefault();
    try {
      await fetch("/api/user/watchlist", {
        method: "POST",
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

  async function removeFromWatchlist(
    e: React.MouseEvent<HTMLButtonElement>,
    movie: TMDBMovieType
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
      {!loading &&
        filteredSuggestions &&
        filteredSuggestions.map((movie) => {
          const isWatchlisted = watchlist.some(
            (watchlistMovie) => watchlistMovie.id === movie.id
          );
          return (
            <div
              key={movie.id}
              className="card shadow-xl image-full before:content-none hover:before:content-[''] transition-all duration-300 ease-in-out"
            >
              <figure>
                <Image
                  width={500}
                  height={750}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </figure>
              <div className="card-body shrink lg:opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out">
                <h3 className="card-title">
                  {movie.title} ({movie.release_date.split("-")[0]})
                </h3>
                <p>{shortenMovieOverview(movie.overview, 250)}</p>
                <div className="card-actions justify-end">
                  {isWatchlisted ? (
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
                  ) : (
                    <button
                      onClick={(e) => addToWatchlist(e, movie)}
                      className="btn btn-primary min-w-12"
                    >
                      {posting ? (
                        <span className="loading loading-spinner loading-lg"></span>
                      ) : (
                        "Add to Watchlist"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      {loading &&
        Array.from({ length: skeletonAmount }).map((_, index) => (
          <div key={index} className="skeleton w-full h-[423px]"></div>
        ))}
    </>
  );
};

export default MovieSuggestions;
