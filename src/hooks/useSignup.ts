import { useToast } from "@/components/ui/use-toast";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignUpForm = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const onHandleSubmit = async (data: any) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      // Start the sign-up process
      await signUp.create({
        // redirectUrl: "/auth/otp",
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          phoneNumber: data.phone,
          role: "CLIENT",
        },
        // phoneNumber: data.phone,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/verify");
    } catch (error: any) {
      setLoading(false);
      if (error.errors[0].code === "form_password_incorrect")
        toast({
          variant: "destructive",
          title: "Error",
          description: "email/password is incorrect try again",
        });
    }
  };

  return {
    onHandleSubmit,
    loading,
  };
};
