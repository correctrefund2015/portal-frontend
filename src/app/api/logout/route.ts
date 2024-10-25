import { deleteSession } from "@/lib/cookies";
import { logout } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    logout();
    // deleteSession();
    return Response.json({ message: "ok" });
  } catch (error) {
    console.log(error);

    return Response.json({ message: error });
  }
}
