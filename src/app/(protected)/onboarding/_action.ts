"use server";

import { apiCall, ApiResponse } from "@/lib/api";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const completeOnboarding = async (
  clientProfile: number,
  serviceName: string
) => {
  const user = await currentUser();

  // console.log("user =>", user);

  if (!user) {
    return { message: "No Logged In User" };
  }

  try {
    // console.log(user.id);

    const res = await clerkClient().users.updateUserMetadata(user.id, {
      publicMetadata: {
        onboardingComplete: true,
        clientType: clientProfile === 0 ? "BUSINESS" : "INDIVIDUAL",
      },
    });

    // create client profile
    let resp: ApiResponse<any>;

    if (clientProfile === 0) {
      // console.log(" business client", clientProfile);

      // business client
      resp = await apiCall("post", `${process.env.HOST}/api/clients/business`, {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.primaryEmailAddress?.emailAddress,
        legalName: "",
        dba: "",
        address: "",
        phone: user.unsafeMetadata.phoneNumber,
        serviceName,
      });
    } else {
      // console.log("individual  client", user.unsafeMetadata);
      // console.log("individual  client", user.unsafeMetadata.phoneNumber);

      resp = await apiCall(
        "post",
        `${process.env.HOST}/api/clients/individual`,
        {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.unsafeMetadata.phoneNumber,
          serviceName,
        }
      );
    }

    // console.log({ res });

    if (resp.data) {
      //
      const clientId: string = resp.data.client.id;
      const clientProfileId: string = resp.data.clientProfile.id;
      // console.log("create service request");

      await apiCall("post", `${process.env.HOST}/api/service-request`, {
        clientId,
        clientProfileId,
        name: serviceName,
      });
    }

    redirect("/dashboard");

    // save service

    // return {
    //   message: "success",
    // };
  } catch (err: any) {
    console.log({ err });
    redirect("/onboarding");

    return {
      error: err.message ?? "There was an error updating the user metadata.",
    };
  }
};
