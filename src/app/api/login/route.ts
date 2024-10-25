import { signIn } from "@/lib/auth-api";
import { setTokens } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();

    const resp = await signIn(email, password);

    // console.log({ resp });

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const options: any = {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    };

    // cookies().set("token", resp.accessToken, options);
    // cookies().set("refreshToken", resp.refreshToken, options);

    setTokens(resp.accessToken, resp.refreshToken);

    if (resp.client !== null && resp.user) {
      console.log("======== client is mot null");

      cookies().set("user", JSON.stringify(resp.user), options);
      cookies().set("client", JSON.stringify(resp.client), options);
    }
    return Response.json({
      message: "ok",
      data: { account: resp.user, client: resp.client },
    });
  } catch (error: any) {
    console.log(error);

    return Response.json({ message: error });
  }
}
