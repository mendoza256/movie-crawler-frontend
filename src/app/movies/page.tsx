"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { cn } from "@/app/lib/utils";
import MovieSuggestions from "./movieSuggestions";
import { TMDBMovieType } from "@/app/lib/baseTypes";
import { useMovies } from "@/hooks/useMovies";

const formSchema = z.object({
  movieTitle: z.string().min(4).max(50),
});

type FormData = z.infer<typeof formSchema>;

const Movies = () => {
  // TODO - add movies to watchlist
  const userId = undefined;
  const { watchlistMovies, isLoading, error } = useMovies(userId);

  const [isLoadingQuery, setIsLoadingQuery] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [shouldShowMessage, setShouldShowMessage] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [movieSuggestions, setMovieSuggestions] = useState(
    [] as TMDBMovieType[]
  );
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
    setIsLoadingQuery(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/tmdb?query=${formData.movieTitle}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { success, data } = await response.json();
      if (success) {
        setMovieSuggestions(data.results);
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (error) {
      setErrorMessage(
        `Failed to search movies: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoadingQuery(false);
    }
  }

  async function getTrendingMovies() {
    setIsLoadingQuery(true);
    try {
      const res = await fetch(`/api/tmdb/trending`);

      if (!res.ok) {
        throw new Error(`Failed to look up movie: ${res.status}`);
      }

      const { success, data } = await res.json();

      if (success) {
        setMovieSuggestions(data.results);
      }
    } catch (error) {
      setErrorMessage("Failed to add movie to watchlist. Please try again.");
    } finally {
      setIsLoadingQuery(false);
    }
  }

  useEffect(() => {
    if (!hasSearched) {
      getTrendingMovies();
    }
  }, [hasSearched]);

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
              {isLoadingQuery ? (
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
          <MovieSuggestions
            movieSuggestions={movieSuggestions}
            loading={isLoadingQuery}
            watchlist={watchlistMovies}
          />
        </div>
      </div>
    </section>
  );
};

export default Movies;
