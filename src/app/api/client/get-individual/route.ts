import { getUser } from "@/lib/cookies";
import { getClientProfilesRequest } from "@/lib/data/client.api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { user } = getUser();

  try {
    const resp = await getClientProfilesRequest(user?.client?.id!);

    return Response.json({
      message: "ok",
      data: resp,
    });
  } catch (error: any) {
    return Response.json({ message: error });
  }
}
