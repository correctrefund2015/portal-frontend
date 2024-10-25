"use client";

import LoadingImage from "@/components/shared/LoadingImage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (!user.isVerified) {
          router.push("/verify");
        } else if (!user.onboarding) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [user, isLoading, router]);

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col items-end justify-center">
  //       <LoadingImage size={120} />
  //     </div>
  //   );
  // }

  return !user ? <>{children}</> : null;
};
