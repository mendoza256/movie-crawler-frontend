"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "../actions/auth";
import { SignupButton } from "@/components/ui/SignupButton";

const Signup = () => {
  const [state, action] = useFormState(signup, undefined);

  return (
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
  );
};

export default Signup;
