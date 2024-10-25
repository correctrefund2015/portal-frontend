"use server";

import { getUser } from "@/lib/session";
import { editClientProfile } from "@/lib/data/client.api";
import { ProfileFormData } from "@/schemas/individual-client";
import { editIndividualProfileQuery } from "@/lib/queries/client.query";
import { parsedJSON } from "@/utils/helpers/methods";

export const editIndividualProfileAction = async (
  data: ProfileFormData,
  profileId: string,
  type: string
) => {
  try {
    const user = await getUser();
    console.log("creating", profileId);

    const resp = await editIndividualProfileQuery(user?.id!, profileId, data);

    return { status: 201, data: resp };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
