import { verifyOTP } from "@/lib/auth-api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, otp } = await req.json();

    const resp = await verifyOTP(email, otp);

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const options: any = {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    };

    // cookies().set("accessToken", resp.accessToken, options);
    // cookies().set("refreshToken", resp.refreshToken, options);

    return Response.json({
      message: "ok",
    });
  } catch (error: any) {
    return Response.json({ message: error });
  }
}
