"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import WatchlistItems from "./watchlistItems";
import { useAuth } from "@clerk/nextjs";
import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { cn } from "@/lib/utils";

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

  async function onSubmit(input: z.infer<typeof formSchema>) {
    setLoadingQuery(true);
    const response = await fetch("/api/user/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (typeof userId !== "string") {
      throw new Error("User ID is not a string");
    }

    if (!response.ok) {
      throw new Error(`Failed to add movie to watchlist: ${response.status}`);
    }

    const { success } = await response.json();

    if (success) {
      setMessage("Movie added to watchlist.");
      setLoadingQuery(false);
      form.reset();
      fetchWatchlist(userId);
    } else {
      setError("Failed to add movie to watchlist. Please try again.");
      setLoadingQuery(false);
    }
  }

  return (
    <section className="mt-10">
      <div className="container grid lg:grid-cols-2 gap-8">
        <div className="prose col-span-2">
          <h2 className="mb-4">Watchlist</h2>
        </div>
        <div className="form">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex gap-4"
            >
              <FormField
                control={form.control}
                name="movieTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movie Name</FormLabel>
                    <FormControl>
                      <Input
                        className="min-w-80 w-96"
                        type="text"
                        placeholder="Akira"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FormMessage>{error}</FormMessage>}
              <button type="submit" className="btn">
                Button
              </button>
            </form>

            {loadingQuery && (
              <span className="loading loading-ring loading-lg"></span>
            )}

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
        <WatchlistItems watchlist={watchlist} loading={loading} />
      </div>
    </section>
  );
};

export default Watchlist;
