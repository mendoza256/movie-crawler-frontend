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

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return {
      errors: {
        email: ["User already exists"],
      },
    };
  }

  // check if username already exists
  const usernameUser = await User.findOne({ username });
  if (usernameUser) {
    return {
      errors: {
        username: ["Username already exists"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnect();
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log("user", user);

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    await createSession(user._id);
    redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "An error occurred while creating your account.",
    };
  }
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

  createSession(user._id);
  redirect("/");
}

export async function getUser() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  console.log("session", session?.userId);

  if (!session) {
    return null;
  }

  const userId = session.userId;

  try {
    await dbConnect();
    const userFromDb = await User.findById(userId);
    return userFromDb;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
