"use client";

import { useFormStatus, useFormState } from "react-dom";

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} className="btn" type="submit">
      {pending ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        "Sign up"
      )}
    </button>
  );
}
