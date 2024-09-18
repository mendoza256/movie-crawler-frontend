import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SessionProps } from "@/models/Session";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(encodedKey);
}

export async function decrypt(sessionToken: string | undefined = "") {
  if (!sessionToken) {
    console.log("No sessionToken provided");
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      sessionToken,
      new TextEncoder().encode(secretKey)
    );
    return payload as unknown as SessionProps;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ userId, expiresAt });

  // TODO: Save session to database

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}

// async function saveSessionToDatabase(
//   userId: string,
//   sessionToken: string,
//   expiresAt: Date
// ) {
//   await dbConnect();
//   await Session.create({
//     userId,
//     sessionToken,
//     expiresAt,
//     createdAt: new Date(),
//   });
// }
