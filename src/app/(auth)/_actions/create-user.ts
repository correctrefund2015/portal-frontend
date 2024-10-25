"use server";
import { apiCall } from "@/lib/api";
import { registerRequest } from "@/lib/auth";
import { RegisterSchema } from "@/schemas/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createUserAction = async (
  clerkId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string
) => {
  const user = await currentUser();
  console.log("user=====>", user);

  const resp = await apiCall("post", `${process.env.HOST}/api/auth/register`, {
    clerkId,
    email,
    firstName,
    lastName,
    phone,
  });
  // const res = await fetch("http://localhost:4000/api/auth/register", {
  //   method: "post",
  //   headers: {
  //     Cookie: cookies().toString(),
  //   },
  //   body: JSON.stringify({
  //     clerkId: user?.id,
  //     email: user?.emailAddresses,
  //     firstName: user?.firstName,
  //     lastName: user?.lastName,
  //     phone: user?.unsafeMetadata.phone,
  //   }),
  // });
  // return res.json();
  return resp.data;
};

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // 2. register request
  const { firstName, lastName, phone, email, password } = validatedFields.data;
  const resp = await registerRequest(
    email,
    password,
    firstName,
    lastName,
    phone
  );

  if (resp.user) {
    redirect("/verify");
  } else {
    return { error: "Failed" };
  }
};
