import { getUser } from "@/lib/cookies";
import { getServiceStatsPerClient } from "@/lib/data/service-request.api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const { client } = getUser();

    // const resp = await getServiceStatsPerClient(client.id);

    return Response.json({
      message: "ok",
      data: { list: "resp" },
    });
  } catch (error: any) {
    return Response.json({ message: error });
  }
}
