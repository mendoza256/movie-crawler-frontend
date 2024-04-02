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
  title: z.string().min(4).max(50),
});

const Watchlist = () => {
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  console.log("movies", movies);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const contentType = "application/json";
      const res = fetch("/api/watchlist", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
    } catch (error) {
      setError("Failed to add Movie to Watchlist. Please try again.");
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
              name="title"
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
