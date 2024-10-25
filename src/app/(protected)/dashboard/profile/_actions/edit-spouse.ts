"use server";

import { editSpouse, addSpouse } from "@/lib/data/client.api";
import { addSpouseQuery, editSpouseQuery } from "@/lib/queries/spouse.query";
import { SpouseFormData } from "@/schemas/individual-client";
import { parsedJSON } from "@/utils/helpers/methods";

export const addSpouseAction = async (
  data: SpouseFormData,
  profileId: string
) => {
  try {
    const resp = await addSpouseQuery(profileId, data);

    return { status: 201, data: resp.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
export const editSpouseAction = async (data: SpouseFormData, id: string) => {
  try {
    const resp = await editSpouseQuery(id, data);

    return { status: 201, data: resp.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
