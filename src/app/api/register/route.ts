import { signIn, signUp } from "@/lib/auth-api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password, firstName, lastName, phone } = await req.json();

    const { user } = await signUp(email, password, firstName, lastName, phone);

    cookies().set("password", password);
    if (user) {
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const options: any = {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
      };
      cookies().set("user", JSON.stringify(user), options);
      return Response.json({
        message: "ok",
      });
    }
  } catch (error: any) {
    return Response.json({ message: error });
  }
}
