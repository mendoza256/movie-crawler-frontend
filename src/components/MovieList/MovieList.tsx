import MovieSuggestions from "@/app/movies/movieSuggestions";
import { MovieType, TMDBMovieType, WatchlistMovieType } from "@/lib/baseTypes";

async function fetchMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US&page=1`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch movies. Please try again.");
  }
}

const MovieList = async () => {
  const movies = await fetchMovies();

  return (
    <div className="basis-9/12 lg:col-span-2 grid gap-8 lg:grid-cols-4 auto-rows-auto">
      {movies && (
        <MovieSuggestions
          movieSuggestions={movies.results}
          loading={false}
          watchlist={[
            {
              title: "",
              date_added: "",
              id: 0,
              tmdbData: {} as TMDBMovieType,
            } as WatchlistMovieType,
          ]}
        />
      )}
    </div>
  );
};

export default MovieList;
