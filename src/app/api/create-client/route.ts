import { createClient, signIn } from "@/lib/auth-api";
import {
  createBusinessClient,
  createIndividualClient,
} from "@/lib/queries/create-client.query";
import { createServiceQuery } from "@/lib/queries/service.query";
import { setTokens } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  let route = "/onboarding";
  try {
    const { type, serviceName, businessName } = await req.json();

    // get user from cookies
    const userCookie = cookies().get("user")?.value;
    const password = cookies().get("password")?.value;
    const user = JSON.parse(userCookie!);

    const { email, firstName, lastName, phone } = user;

    const profile =
      type === "INDIVIDUAL"
        ? {
            email,
            firstName,
            lastName,
            phone,
            serviceName,
          }
        : {
            name: firstName + " " + lastName,
            legalName: businessName,
            dba: "",
            email,
            phone,
            serviceName,
          };

    // const resp = await createClient(user, type, serviceName, businessName);

    let resp: any;
    if (type === "BUSINESS") {
      resp = await createBusinessClient(profile);
    } else {
      resp = await createIndividualClient(profile);
    }

    console.log({ resp });

    const businessProfileId = resp?.businessProfile?.id || null;
    const individualProfileId = resp?.individualProfile?.id || null;

    // save service
    await createServiceQuery(
      serviceName,
      resp.client.id,
      individualProfileId,
      businessProfileId
    );

    if (password) {
      // login to get access token
      const loginResp = await signIn(email, password!);

      // console.log({ loginResp });

      setTokens(loginResp.accessToken, loginResp.refreshRoten);

      // clear password cookie
      cookies().delete("password");
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const options: any = {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    };

    cookies().set("user", JSON.stringify(resp.user), options);
    // cookies().set("client", JSON.stringify(resp.clientProfile), options);

    route = "/dashboard";

    return Response.json({
      message: "ok",
      data: resp,
    });
  } catch (error: any) {
    route = "/onboarding";
    console.error(error);
    return Response.json({ message: error });
  }
  // finally {
  //   redirect(route);
  // }
}
