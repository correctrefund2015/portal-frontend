"use server";

import { editFinance, addFinance } from "@/lib/data/client.api";
import { addFinanceQuery, editFinanceQuery } from "@/lib/queries/finance.query";
import { FinanceFormData } from "@/schemas/individual-client";
import { parsedJSON } from "@/utils/helpers/methods";

export const addFinanceAction = async (
  data: FinanceFormData,
  profileId: string
) => {
  try {
    const resp = await addFinanceQuery(profileId, data);

    return { status: 201, data: resp.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
export const editFinanceAction = async (data: FinanceFormData, id: string) => {
  try {
    const resp = await editFinanceQuery(id, data);

    return { status: 201, data: resp?.data };
  } catch (error) {
    console.log(error);

    return parsedJSON({ status: 404, data: error });
  }
};
