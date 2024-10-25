import { cookies } from "next/headers";

export function setGlobalCookie(name: string, value: string) {
  cookies().set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

export function getGlobalCookie(name: string) {
  return cookies().get(name);
}

export function removeGlobalCookie(name: string) {
  cookies().delete(name);
}
