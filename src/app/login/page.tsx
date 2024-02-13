"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFormContext } from "react-hook-form";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(5).max(32),
});

import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const route = "http://localhost:3001/auth/login";

    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
          });
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  return (
    <div className="container max-w-80 mt-10">
      <h1 className="mb-4 text-center text-xl">Login Page</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  Set your username and password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
