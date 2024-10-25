"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchema } from "@/schemas/auth";
import SubmitButton from "@/components/shared/SubmitButton";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

export function InputOTPForm() {
  // const { user, verifyOTP } = useAuth();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const resendOtp = async () => {
    const email = localStorage.getItem("email");

    console.log(email);

    const resp = await fetch("/api/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email: email! }),
    });

    const json = await resp.json();

    if (json.message === "ok") {
      toast({
        description: "A new code has been sent to your email address",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  function onSubmit(values: z.infer<typeof OtpSchema>) {
    startTransition(async () => {
      const email = localStorage.getItem("email");

      console.log(email);

      const resp = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ email: email!, otp: values.pin }),
      });

      const json = await resp.json();
      // console.log({ json });

      if (json.message === "ok") {
        router.push("/welcome");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Unable to verify your email. Please try again.",
        });
      }
    });
  }

  // if (!user || user.isVerified) {
  //   router.push("/dashboard");
  //   // return null;
  // }

  return (
    <div className="cr-left flex-1 p-8 flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="text-center flex flex-col items-center justify-center">
            <section className="mb-8">
              <h1 className="text-[20px] font-semibold tracking-tight">
                Verify your account
              </h1>
              <p className="text-slate-400 text-sm">
                A verification code has been sent to your email address.
              </p>
            </section>
            <div className="">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>One-Time Password</FormLabel> */}
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="space-x-4 flex items-center justify-center w-full">
                          <InputOTPSlot
                            index={0}
                            className="border rounded-md"
                          />

                          <InputOTPSlot
                            index={1}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={2}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={3}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={4}
                            className="border rounded-md"
                          />
                          <InputOTPSlot
                            index={5}
                            className="border rounded-md"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      <Button
                        type="button"
                        variant={"ghost"}
                        className="text-blue-600"
                        onClick={() => resendOtp()}
                      >
                        Resend activation code
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="button-wrapper">
              <SubmitButton
                className="mt-4 shad-primary-btn w-full rounded-sm"
                isLoading={isPending}
              >
                Verify your account
              </SubmitButton>
            </div>

            <Link
              className="text-blue-600 hover:underline-offset-2 hover:underline mt-4 text-sm"
              href="/sign-in"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
