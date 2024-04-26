import { cookies } from "next/headers";
import dbConnect from "./mongoose";
import Session from "@/models/Session";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  dbConnect();
  const session = await Session.create({
    userId: id,
    expiresAt,
  });

  // 3. Store the session in cookies for optimistic auth checks
  cookies().set("session", JSON.stringify(session), {
    expires: expiresAt,
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}
