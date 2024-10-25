"use server";

import { editEmployment, addEmployment } from "@/lib/data/client.api";
import {
  addEmploymentQuery,
  editEmploymentQuery,
} from "@/lib/queries/employment.query";
import { EmploymentFormData } from "@/schemas/individual-client";
import { parsedJSON } from "@/utils/helpers/methods";

export const addEmploymentAction = async (
  data: EmploymentFormData,
  profileId: string
) => {
  try {
    const resp = await addEmploymentQuery(profileId, data);

    return { status: 201, data: resp?.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
export const editEmploymentAction = async (
  data: EmploymentFormData,
  id: string
) => {
  try {
    const resp = await editEmploymentQuery(id, data);

    return { status: 201, data: resp?.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
