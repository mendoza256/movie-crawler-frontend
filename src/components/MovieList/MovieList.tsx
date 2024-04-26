import MovieSuggestions from "@/app/movies/movieSuggestions";
import {
  DbMovieType,
  TMDBMovieType,
  WatchlistMovieType,
} from "@/app/lib/baseTypes";

async function fetchMovies() {
  try {
    const res = await fetch(`http:localhost:3000/api/movies`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch movies. Please try again.");
    console.error(error);
  }
}

const MovieList = async () => {
  const movies = await fetchMovies();
  const filteredMovieData = movies?.data?.map((movie: DbMovieType) => {
    return {
      ...movie.tmdbData,
    };
  });

  return (
    <div className="basis-9/12 lg:col-span-2 grid gap-8 lg:grid-cols-4 auto-rows-auto">
      {movies && (
        <MovieSuggestions
          movieSuggestions={filteredMovieData}
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
