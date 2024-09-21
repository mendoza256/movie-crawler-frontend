"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import MovieSuggestions from "./movieSuggestions";
import { useMovies } from "@/hooks/useMovies";
import { useTrendingTmdbMovies } from "@/hooks/useTmdbMovies";
import { useTmdbSearch } from "@/hooks/useTmdbSearch";

const formSchema = z.object({
  movieTitle: z.string().min(4).max(50),
});

type FormData = z.infer<typeof formSchema>;

const Movies = () => {
  // TODO - add movies to watchlist
  const userId = undefined;
  const { watchlistMovies, isLoading, error } = useMovies(userId);
  const {
    trendingMovies,
    isLoading: isLoadingTrending,
    error: trendingError,
  } = useTrendingTmdbMovies();

  const { searchResults, isSearchLoading, searchError, setKeyword } =
    useTmdbSearch();

  const [successMessage, setSuccessMessage] = useState("");
  const [shouldShowMessage, setShouldShowMessage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showTrending, setShowTrending] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieTitle: "",
    },
  });

  useEffect(() => {
    if (userId) {
      fetchWatchlistMovies(userId);
    }
  }, [userId]);

  async function onSubmit(formData: FormData) {
    setIsSearching(true);
    setShowTrending(false);
    setKeyword(formData.movieTitle);
    setIsSearching(false);
  }

  return (
    <section className="mt-10">
      <div className="container flex gap-8">
        <div className="grow basis-3/12">
          <h2 className="text-2xl font-bold mb-4">Movies</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 flex gap-4 items-end"
          >
            <div>
              <label htmlFor="name">Search trackable movies here</label>
              <input
                {...register("movieTitle")}
                type="text"
                placeholder="Movie title"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.movieTitle && (
                <p className="text-red-500">{errors.movieTitle.message}</p>
              )}
            </div>
            <button type="submit" className="btn mt-auto">
              {isSearching ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Search"
              )}
            </button>
          </form>

          <div
            role="alert"
            className={cn(
              "my-4 alert alert-success transition-opacity duration-500",
              {
                "opacity-100": shouldShowMessage,
                "opacity-0": !shouldShowMessage,
              }
            )}
          >
            <span>{successMessage}</span>
          </div>
        </div>
        <div className="basis-9/12 lg:col-span-2 grid gap-8 lg:grid-cols-4 auto-rows-auto">
          {showTrending ? (
            <MovieSuggestions
              movieSuggestions={trendingMovies}
              loading={isSearching}
              isLoadingTrending={isLoadingTrending}
              watchlist={watchlistMovies}
            />
          ) : (
            <MovieSuggestions
              movieSuggestions={searchResults}
              loading={isSearchLoading}
              isLoadingTrending={isLoadingTrending}
              watchlist={watchlistMovies}
            />
          )}
          {searchError && <p>{searchError}</p>}
          {trendingError && <p>{trendingError}</p>}
          {error && <p>{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Movies;
