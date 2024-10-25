"use server";
import { z } from "zod";
import { registerRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RegisterSchema } from "@/schemas/auth";
import { setGlobalCookie } from "@/lib/global-cookies";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, firstName, lastName, phone } = validatedFields.data;

  let route = "/sign-up";

  try {
    const response = await registerRequest(
      email,
      password,
      firstName,
      lastName,
      phone
    );

    console.log("register====>", { response });
    // save email in cookies for OTP
    setGlobalCookie("signupEmail", email);
    setGlobalCookie("onboarding-status", "pending");

    route = "/verify";
  } catch (error: any) {
    console.log("error===>", error);
    console.log("error msg===>", error.message);
    route = "/sign-up";
    return { error: error.message };
  } finally {
    redirect(route);
  }
};
