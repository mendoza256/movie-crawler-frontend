"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { cn } from "@/lib/utils";
import MovieSuggestions from "./movieSuggestions";
import { TMDBMovieType, WatchlistMovieType } from "@/lib/baseTypes";

const formSchema = z.object({
  movieTitle: z.string().min(4).max(50),
});

const Movies = () => {
  const { userId } = useAuth();
  const [watchlistMovies, setWatchlistMovies] = useState(
    [] as WatchlistMovieType[]
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [shouldShowMessage, setShouldShowMessage] = useState(false);
  const [movieSuggestions, setMovieSuggestions] = useState(
    [] as TMDBMovieType[]
  );
  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieTitle: "",
    },
  });
  const [hasSearched, setHasSearched] = useState(false);

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

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    setIsLoadingQuery(true);
    setHasSearched(true);
    try {
      const response = await fetch(`/api/tmdb?query=${formData.movieTitle}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to look up movie: ${response.status}`);
      }

      const { success, data } = await response.json();

      if (success) {
        setMovieSuggestions(data.results);
      }
    } catch (error) {
      setErrorMessage("Failed to add movie to watchlist. Please try again.");
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
        <div className="prose grow basis-3/12">
          <h2 className="mb-4">Movies</h2>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-8 flex gap-4 items-end"
          >
            <div>
              <label htmlFor="name">Search trackable movies here</label>
              <input
                type="text"
                placeholder="Movie title"
                className="input input-bordered w-full max-w-xs"
                id="movieTitle"
                name="movieTitle"
              />
              {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}
            </div>
            <button type="submit" className="btn mt-auto">
              {isLoadingQuery ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Search"
              )}
            </button>
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
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
        <div className="basis-9/12 lg:col-span-2 grid gap-8 lg:grid-cols-3 auto-rows-auto">
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
