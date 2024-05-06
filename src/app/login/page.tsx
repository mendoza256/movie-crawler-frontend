"use client";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useFormState } from "react-dom";

const Login = () => {
  const [state, action] = useFormState(login, undefined);

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
        <form action={action} className="space-y-8">
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
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
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
            {state?.errors?.password && (
              <p className="text-red-500">{state.errors.password}</p>
            )}
          </div>
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
