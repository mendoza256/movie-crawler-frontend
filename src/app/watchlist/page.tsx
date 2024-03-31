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
  userId: z.string().min(2).max(50),
  newWatchlistEntry: z.string().min(4).max(50),
});

const Watchlist = () => {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      newWatchlistEntry: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
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
