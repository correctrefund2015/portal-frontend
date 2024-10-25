"use client";

import LoadingImage from "@/components/shared/LoadingImage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/sign-in");
      } else if (!user.isVerified) {
        router.push("/verify");
      } else if (!user.onboarding) {
        router.push("/onboarding");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingImage size={200} />
      </div>
    );
  }

  return user && user.isVerified && user.onboarding ? <>{children}</> : null;
};
