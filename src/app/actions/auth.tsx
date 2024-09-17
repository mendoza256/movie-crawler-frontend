"use server";

import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/app/lib/definitions";
import dbConnect from "@/app/lib/mongoose";
import { createSession, decrypt, deleteSession } from "@/app/lib/session";
import User from "@/models/User";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });

  if (!validatedFields.success) {
    console.log(
      "Validation failed",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (formData.get("password") !== formData.get("repeatPassword")) {
    return {
      errors: {
        repeatPassword: ["Passwords do not match"],
      },
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // TODO use something else then Math.random for the id?
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    watchlist: [],
    id: Math.random().toString(36).substr(2, 9),
  });

  // If the form is valid, create a new user
  await dbConnect();
  const user = await User.create(newUser);

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  createSession(user.id);
  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  dbConnect();
  const user = await User.findOne({ email });

  if (!user) {
    return {
      errors: {
        email: ["User not found"],
      },
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      errors: {
        password: ["Password is incorrect"],
      },
    };
  }

  createSession(user.id);
  redirect("/");
}

export async function getUser() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) {
    return null;
  }
  const sessionString = await JSON.stringify(session);
  const userId = decrypt(sessionString);

  try {
    const user = await User.findById(userId);
    return user;
  } catch {
    return null;
  }
}
