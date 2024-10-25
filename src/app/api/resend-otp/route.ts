import { resendOTP } from "@/lib/auth-api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email } = await req.json();

    const resp = await resendOTP(email);
    return Response.json({
      message: "ok",
      data: { account: resp.user, client: resp.client },
    });
  } catch (error: any) {
    console.log(error);

    return Response.json({ message: error });
  }
}
