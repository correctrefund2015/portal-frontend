"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import OrSeparator from "./OrSeparator";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import GoogleSignIn from "./GoogleSignIn";
import { RegisterSchema } from "@/schemas/auth";
import { AuthRoute } from "./AuthRoute";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      console.log('hi');
      const { firstName, lastName, phone, email, password } = data;
      startTransition(async () => {
        const resp = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const json = await resp.json();
        // console.log({ json });

        if (json.message === "ok") {
          localStorage.setItem("email", data.email);

          router.push("/verify");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong. Please try again later.",
          });
        }
      });
    } catch (err) {
      console.error("register failed", err);
      // setError(error);
    }
  };

  return (
    <AuthRoute>
      <div className="cr-left flex-1 p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 flex-1"
          >
            <section className="mb-8">
              <h1 className="text-[20px] font-semibold tracking-tight">
                Get Started
              </h1>
              <p className="text-slate-400 text-sm">Create your account now.</p>
            </section>

            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="firstName"
              label="First name"
              placeholder="Jane"
            />
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              control={form.control}
              name="lastName"
              label="Last name"
              placeholder="Doe"
            />
            <CustomFormField
              fieldType={FormFieldTypes.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Mobile Number"
              placeholder="(555) 123-4567"
            />
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
            <div className="button-wrapper">
              <SubmitButton
                className="mt-4 shad-primary-btn w-full rounded-sm"
                isLoading={isPending}
              >
                Get Started
              </SubmitButton>
            </div>
          </form>
          <div className="mt-3 text-slate-400 text-xs text-center">
            Creating an account with Correct Refund means you accept our &nbsp;
            <Link
              className="text-blue-600 hover:underline-offset-2 hover:underline
"
              href="/"
            >
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link
              href="/"
              className="text-blue-600 hover:underline-offset-2 hover:underline"
            >
              Conditions
            </Link>
          </div>

          <div className="mt-3 text-slate-400 text-xs text-center">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:underline-offset-2 hover:underline"
            >
              Login
            </Link>
          </div>
          <OrSeparator />
          <GoogleSignIn />
        </Form>
      </div>
    </AuthRoute>
  );
};

export default RegisterForm;
