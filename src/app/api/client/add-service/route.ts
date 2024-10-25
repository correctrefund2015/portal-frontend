import { getUser } from "@/lib/cookies";
import { createServiceQuery } from "@/lib/queries/service.query";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { user } = getUser();

  const { name } = await req.json();

  try {
    // const resp = await createServiceQuery(
    //   name,
    //   user?.client?.id!,
    //   user?.client?.clientProfiles[0].clientId!
    // );
    // return Response.json({
    //   message: "ok",
    //   data: resp,
    // });
  } catch (error: any) {
    return Response.json({ message: error });
  }
}
