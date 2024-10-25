import { useToast } from "@/components/ui/use-toast";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const onHandleSubmit = async (values: any) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const authenticated = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (authenticated.status === "complete") {
        await setActive({ session: authenticated.createdSessionId });
        toast({
          title: "Success",
          description: "Welcome back!",
        });

        router.push("/dashboard");
      }
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
