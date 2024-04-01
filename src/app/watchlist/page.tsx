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
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  newWatchlistEntry: z.string().min(4).max(50),
});

const Watchlist = () => {
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newWatchlistEntry: "",
    },
  });

  console.log("movies", movies);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting");
    const movieName = values.newWatchlistEntry;
    if (!movieName) {
      setError("Please enter a movie name");
      return;
    }

    try {
      fetch(`http://localhost:3000/api/watchlist?query=${movieName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.TMDB_API_KEY,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
        });
    } catch (err) {
      setError("An error occurred: " + err);
      console.error("Error:", err);
    }
  }

  return (
    <section>
      <div className="container mt-10">
        <h1 className="mb-4 text-3xl font-bold uppercase">Watchlist</h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex gap-4"
          >
            <FormField
              control={form.control}
              name="newWatchlistEntry"
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
            <Button type="submit">Search</Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Watchlist;
