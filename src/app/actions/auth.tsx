"use server";

import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/app/lib/definitions";
import dbConnect from "@/app/lib/mongoose";
import { createSession, deleteSession } from "@/app/lib/session";
import User from "@/models/User";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  });

  console.log("Validated fields", validatedFields);

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

  console.log("Creating user", username, email, hashedPassword);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    watchlist: [],
    id: Math.floor(Math.random() * 100000000),
  });

  // If the form is valid, create a new user
  await dbConnect();
  const user = await User.create(newUser);

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  console.log("User created successfully", user.id ? user.id : "ERROR: no id");

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
