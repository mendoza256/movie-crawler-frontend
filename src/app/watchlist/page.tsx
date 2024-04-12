"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { FormField, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { cn } from "@/lib/utils";
import MovieSuggestionItems from "./movieSuggestionItems";
import { TMDBMovieType } from "@/lib/baseTypes";

const formSchema = z.object({
  movieTitle: z.string().min(4).max(50),
});

const Watchlist = () => {
  const { userId } = useAuth();
  const [watchlist, setWatchlist] = useState<string[]>([] as string[]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [movieSuggestions, setMovieSuggestions] = useState(
    [] as TMDBMovieType[]
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieTitle: "",
    },
  });

  const fetchWatchlist = async (userId: string) => {
    setLoading(true);
    try {
      const { user } = await fetchMongoDBUser(userId);
      setWatchlist(user.watchlist);
    } catch (error) {
      setError("Failed to fetch watchlist. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      const messageTimer = setTimeout(() => {
        setMessage("");
      }, 3500);
      return () => {
        clearTimeout(timer);
        clearTimeout(messageTimer);
      };
    }
  }, [message]);

  useEffect(() => {
    if (userId) {
      fetchWatchlist(userId);
    }
  }, [userId]);

  // async function onSubmit(input: z.infer<typeof formSchema>) {
  //   setLoadingQuery(true);
  //   const response = await fetch("/api/user/watchlist", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(input),
  //   });

  //   if (typeof userId !== "string") {
  //     throw new Error("User ID is not a string");
  //   }

  //   if (!response.ok) {
  //     throw new Error(`Failed to add movie to watchlist: ${response.status}`);
  //   }

  //   const { success } = await response.json();

  //   if (success) {
  //     setMessage("Movie added to watchlist.");
  //     setLoadingQuery(false);
  //     form.reset();
  //     fetchWatchlist(userId);
  //   } else {
  //     setError("Failed to add movie to watchlist. Please try again.");
  //     setLoadingQuery(false);
  //   }
  // }

  async function onSubmit(input: z.infer<typeof formSchema>) {
    setLoadingQuery(true);
    try {
      const response = await fetch(`/api/tmdb?query=${input.movieTitle}`, {
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
        setLoadingQuery(false);
      }
    } catch (error) {
      setError("Failed to add movie to watchlist. Please try again.");
      setLoadingQuery(false);
    }
  }

  return (
    <section className="mt-10">
      <div className="container flex gap-8">
        <div className="prose grow basis-3/12">
          <h2 className="mb-4">Watchlist</h2>
          <div className="form">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex gap-4 items-end"
              >
                <FormField
                  control={form.control}
                  name="movieTitle"
                  render={({ field }) => (
                    <div className="form-control">
                      <label className="label">Movie Name</label>
                      <input
                        className="input w-full"
                        type="text"
                        placeholder="Title"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <button type="submit" className="btn mt-auto">
                  {loadingQuery ? (
                    <span className="loading loading-ring loading-lg"></span>
                  ) : (
                    "Search"
                  )}
                </button>
                {error && <FormMessage>{error}</FormMessage>}
              </form>

              <div
                role="alert"
                className={cn(
                  "my-4 alert alert-success transition-opacity duration-500",
                  {
                    "opacity-100": showMessage,
                    "opacity-0": !showMessage,
                  }
                )}
              >
                <span>{message}</span>
              </div>
            </FormProvider>
          </div>
        </div>
        <div className="basis-9/12 lg:col-span-2 grid gap-8 lg:grid-cols-3 auto-rows-auto">
          <MovieSuggestionItems
            movieSuggestions={movieSuggestions}
            loading={loadingQuery}
          />
        </div>
      </div>
      {/* <WatchlistItems watchlist={watchlist} loading={loading} /> */}
    </section>
  );
};

export default Watchlist;
