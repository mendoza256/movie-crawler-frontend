"use client";

import { z } from "zod";
import Link from "next/link";
import { SignupFormSchema } from "@/lib/definitions";
import { useFormState } from "react-dom";
import { signup } from "../actions/auth";
import { SignupButton } from "@/components/ui/SignupButton";

const Signup = () => {
  const [state, action] = useFormState(signup, undefined);

  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
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
        <h1 className="mb-4 text-center text-xl">Sign Up</h1>
        <p className="mb-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <form action={action} className="space-y-8">
          <div>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs"
              id="username"
              name="username"
            />
            {state?.errors?.username && <p>{state.errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              placeholder="E-Mail"
              className="input input-bordered w-full max-w-xs"
              id="email"
              name="email"
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              id="password"
              name="password"
            />
            {state?.errors?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              className="input input-bordered w-full max-w-xs"
              id="repeatPassword"
              name="repeatPassword"
            />
            {state?.errors?.repeatPassword && (
              <p>{state.errors.repeatPassword}</p>
            )}
          </div>
          <SignupButton />
        </form>
      </div>
    </>
  );
};

export default Signup;
