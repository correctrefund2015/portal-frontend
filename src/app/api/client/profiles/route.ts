import { getUser } from "@/lib/session";
import { getClientProfilesRequest } from "@/lib/data/client.api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUser();

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
