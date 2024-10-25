"use server";
import { OtpSchema } from "@/schemas/auth";
import { verifyOtpRequest } from "@/lib/auth";
import { createSession } from "@/lib/cookies";
import { getGlobalCookie } from "@/lib/global-cookies";
import { redirect } from "next/navigation";
import * as z from "zod";

export const verifyOtpAction = async (values: z.infer<typeof OtpSchema>) => {
  const validatedFields = OtpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { pin } = validatedFields.data;

  // get email from cookies
  const emailCookie = getGlobalCookie("signupEmail");
  const email = emailCookie ? emailCookie.value : null;

  console.log("email ======>", email);

  const { accessToken, user }: any = await verifyOtpRequest(email!, pin);

  if (!accessToken) {
    return { error: "failed" };
  }

  createSession(user.id, accessToken, user.role);

  // redirect("/welcome");

  // let route = "/verify";
  //   redirect(route);

  // try {
  //   if (email) {

  //     // return "Welcome !" ;
  //     console.log("OTP success===>", response);

  //     route = "/welcome";

  //     if (response.user) {
  //     } else {
  //       route = "/verify";
  //     }
  //   } else {
  //     route = "/verify";
  //     console.log("email not found =========>");
  //   }
  // } catch (error: any) {
  //   console.log("OTP Action::", error);
  //   route = "/verify";

  //   return { error: error.message };
  // } finally {
  //   redirect(route);
  // }
};
