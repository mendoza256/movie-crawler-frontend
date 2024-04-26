"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userSchema } from "@/app/lib/definitions";
import Link from "next/link";

const formSchema = z.object(userSchema).refine(
  (values) => {
    return values.password === values.repeatPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);

const Login = () => {
  const [error, setError] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(process.env.BACKEND_BASE_URL + "/auth/register", {
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
          window.location.href = "/login";
        }
        if (res.status === 400) {
          res.json().then((data) => {
            setError(data.message);
          });
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  return (
    <>
      <div className="container max-w-96 mt-10">
        <h1 className="mb-4 text-center text-xl">Log in</h1>
        <p className="mb-4">
          Not registered?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </p>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="pb-2" htmlFor="email">
                E-Mail
              </label>
              <input
                type="email"
                placeholder="E-Mail"
                className="input input-bordered w-full max-w-xs"
                id="email"
                name="email"
              />
            </div>
            <div>
              <label className="pb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                id="password"
                name="password"
              />
            </div>
            <button className="btn" type="submit">
              Sign Up
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Login;
