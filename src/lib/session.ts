import cookies from "next/headers";
import dbConnect from "./mongoose";
import Session from "@/models/Session";
import { setCookie } from "nookies"; // Import the correct package

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  dbConnect();
  const session = await Session.create({
    userId: id,
    expiresAt,
  });

  // 3. Store the session in cookies for optimistic auth checks
  setCookie(null, "session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
