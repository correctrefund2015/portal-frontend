"use server";

import { editBusinessProfileQuery } from "@/lib/queries/client.query";
import { BusinessProfileFormData } from "@/schemas/business-client";
import { parsedJSON } from "@/utils/helpers/methods";

export const editBusinessProfileAction = async (
  data: BusinessProfileFormData,
  profileId: string
) => {
  try {
    const resp = await editBusinessProfileQuery(profileId, data);

    return { status: 201, data: resp };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
