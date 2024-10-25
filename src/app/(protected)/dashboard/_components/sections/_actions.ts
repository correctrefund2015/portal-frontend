"use server";

import { apiCall } from "@/lib/api";
import { createClientProfileRequest } from "@/lib/data/client.api";
import { createBusinessProfileQuery } from "@/lib/queries/client.query";
import { ClientProfile } from "@/schemas/client-profile";

export const createClientProfile = async (
  profile: ClientProfile,
  clientId: string
) => {
  try {
    console.log("creating=================>", profile);

    const resp = await createBusinessProfileQuery(clientId, profile);

    return { status: 201, data: resp.data };
  } catch (error) {
    console.log(error);

    return error;
  }
};
