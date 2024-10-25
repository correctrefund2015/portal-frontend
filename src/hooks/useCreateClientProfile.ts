import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { completeOnboarding } from "../app/(protected)/onboarding/_action";

export const useCreateClientProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const createClientProfile = async (
    clientType: number,
    serviceName: string
  ) => {
    if (!clientType || !serviceName) return;

    try {
      setLoading(true);
      const res = await completeOnboarding(clientType, serviceName);

      console.log("complete onboarding", res);
      if (res.message === "success") {
        router.replace("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };
  return {
    createClientProfile,
    loading,
  };
};
