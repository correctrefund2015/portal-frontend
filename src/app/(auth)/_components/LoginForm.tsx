"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import Link from "next/link";

import OrSeparator from "./OrSeparator";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import GoogleSignIn from "./GoogleSignIn";
import { toast } from "@/components/ui/use-toast";
import { SignIn, useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useSignInForm } from "@/hooks/useSignIn";
import { Button } from "@/components/ui/button";
import { createUserAction } from "../_actions/create-user";
import { loginAction } from "@/app/_auth/_actions/login";
import { useAuth } from "@/contexts/AuthContext";
import { AuthRoute } from "./AuthRoute";

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long"),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { persistUser, signOut } = useAuth();
  // const { isLoaded, signIn } = useSignIn();
  // const { user, setActive } = useClerk();
  // const { isSignedIn } = useUser();
  // const { loading, onHandleSubmit } = useSignInForm();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const { email, password } = data;

      const resp = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
      });

      const json = await resp.json();
      // console.log(json.data.account);

      if (json.message === "ok") {
        // if (json.data.client === null) {
        //   localStorage.setItem("user", JSON.stringify(json.data.account));
        //   router.replace("/onboarding");
        // } else {
        //   // persistUser(json.data.account, json.data.client);
        // }
        router.replace("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Unable to login, please check your credentials and retry.",
        });
      }
    });
  };

  return (
    // <AuthRoute>
    <div className="cr-left flex-1 p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-1 flex flex-col"
        >
          <section className="mb-8">
            <h1 className="text-[20px] font-semibold tracking-tight">Login</h1>
            <p className="text-slate-400 text-sm">Login to your account now.</p>
          </section>

          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@email.com"
          />
          <CustomFormField
            fieldType={FormFieldTypes.INPUT}
            control={form.control}
            name="password"
            label="Password"
          />

          <div className="mt-3 text-slate-400 text-xs text-center">
            <Link
              href="/reset-password"
              className="text-slate-600 hover:underline-offset-2 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="button-wrapper">
            {/* <Button type="button" onClick={() => createUserAction()}>
              Testing
            </Button> */}
            <SubmitButton
              className="mt-4 shad-primary-btn w-full rounded-sm"
              isLoading={isPending}
            >
              Login
            </SubmitButton>
          </div>
        </form>

        <div className="mt-3 text-slate-400 text-xs text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline-offset-2 hover:underline"
          >
            Register now
          </Link>
        </div>
        <OrSeparator />
        <GoogleSignIn />
      </Form>
    </div>
    // </AuthRoute>
  );
};

export default LoginPage;
