"use server";

import { editDependent, addDependent } from "@/lib/data/client.api";
import {
  addDependentQuery,
  editDependentQuery,
} from "@/lib/queries/dependent.query";
import { DependentFormData } from "@/schemas/individual-client";
import { parsedJSON } from "@/utils/helpers/methods";

export const addDependentAction = async (
  data: DependentFormData,
  profileId: string
) => {
  try {
    const resp = await addDependentQuery(profileId, data);

    return { status: 201, data: resp.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
export const editDependentAction = async (
  data: DependentFormData,
  id: string
) => {
  try {
    const resp = await editDependentQuery(id, data);

    return { status: 201, data: resp.data };
  } catch (error) {
    console.log(error);

    return { status: 404, data: error };
  }
};
