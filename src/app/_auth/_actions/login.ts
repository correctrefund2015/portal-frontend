"use server";
import { loginRequest } from "@/lib/auth";
import { createSession } from "@/lib/cookies";
import { LoginSchema } from "@/schemas/auth";
// import { signIn } from "@/auth";
// import { getUserProfile } from "@/lib/data/user";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${process.env.HOST}/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    console.log({ data });

    if (response.ok) {
      window.location.href = data.redirectTo;
    } else {
      // Handle error
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
