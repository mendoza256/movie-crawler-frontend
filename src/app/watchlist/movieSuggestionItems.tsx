import { TMDBMovieType } from "@/lib/baseTypes";
import Image from "next/image";

interface MovieSuggestionItemsProps {
  movieSuggestions: TMDBMovieType[];
  loading: boolean;
}

const MovieSuggestionItems = ({
  movieSuggestions,
  loading,
}: MovieSuggestionItemsProps) => {
  const filteredSuggestions = movieSuggestions.filter(
    (movie) => movie.poster_path !== null && movie.release_date !== ""
  );

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
                {movie.title} <span>({movie.release_date.split("-")[0]})</span>
              </h3>
              <p>{shortenMovieOverview(movie.overview, 250)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Add to Watchlist</button>
              </div>
            </div>
          </div>
        ))}
      {loading && <div className="loading loading-lg"></div>}
    </>
  );
};

export default MovieSuggestionItems;
