"use server";

import { createServiceQuery } from "@/lib/queries/service.query";
import { getUser } from "@/lib/session";
import { parsedJSON } from "@/utils/helpers/methods";

export const addNewServiceAction = async (
  name: string,
  individualProfileId?: string,
  businessProfileId?: string
) => {
  try {
    const user = await getUser();

    const resp = await createServiceQuery(
      name,
      user?.client.id!,
      individualProfileId,
      businessProfileId
    );

    return { status: 201, data: resp };
  } catch (error: any) {
    console.log("new service error", error);

    return parsedJSON({ status: 404, data: error });
  }
};
