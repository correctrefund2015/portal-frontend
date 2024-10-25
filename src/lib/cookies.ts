import "server-only";
// "use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserAccount } from "@/contexts/AuthContext";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

const cookiesConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  expires: expires,
  domain: process.env.HOST!,
  sameSite: "lax",
  path: "/",
};

export type SessionPayload = {
  userId: string;
  role: string;
  token: string;
  // onboarding: boolean;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(
  userId: string,
  token: string,
  role: string
  // onboarding: boolean
) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  const session = await encrypt({ userId, token, role, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    domain: process.env.HOST!,
    sameSite: "lax",
    path: "/",
  });

  // console.log({ session });

  // redirect("/dashboard");
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/sign-in");
  }

  return { isAuth: true, userId: session.userId };
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
  cookies().delete("token");
  cookies().delete("user");
  cookies().delete("client");
  // redirect("/sign-in");
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  return session;
}

export const getUser = () => {
  const userCookie = cookies().get("user")?.value;
  const clientCookie = cookies().get("client")?.value;
  const parsed = JSON.parse(userCookie!);
  const client = JSON.parse(clientCookie!);
  return { user: parsed as UserAccount, client: client as IClientProfile };
};

async function verifyToken(token: string) {
  console.log("verifying token======>");

  // Implement token verification logic here
  // This could involve sending a request to your backend to verify the token
  // and return the user data
  // For example:
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );

  if (!response.ok) {
    throw new Error("Token verification failed");
  }

  return response.json();
}
