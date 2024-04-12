import { TMDBMovieType } from "@/lib/baseTypes";
import Image from "next/image";
import { useState } from "react";

interface MovieSuggestionItemsProps {
  movieSuggestions: TMDBMovieType[];
  loading: boolean;
}

const MovieSuggestionItems = ({
  movieSuggestions,
  loading,
}: MovieSuggestionItemsProps) => {
  const [posting, setPosting] = useState(false);
  const skeletonAmount = 10;
  const filteredSuggestions = movieSuggestions.filter(
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
      });
      setPosting(false);
    } catch (error) {
      console.error(error);
      setPosting(false);
    }
  }

  function shortenMovieOverview(string: string, maxLength: number) {
    if (string.length > maxLength) {
      const shortened = string.slice(0, maxLength);
      return (
        shortened.slice(
          0,
          Math.min(shortened.length, shortened.lastIndexOf(" "))
        ) + "..."
      );
    }
    return string;
  }

  return (
    <>
      {!loading &&
        filteredSuggestions.map((movie) => (
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
              </div>
            </div>
          </div>
        ))}
      {loading &&
        Array.from({ length: skeletonAmount }).map((_, index) => (
          <div key={index} className="skeleton w-full h-[423px]"></div>
        ))}
    </>
  );
};

export default MovieSuggestionItems;
