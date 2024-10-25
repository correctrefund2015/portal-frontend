import React from "react";
import OnboardingComponent from "./_components/OnboardingComponent";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const OnboardingPage = async () => {
  // if (!user || user.onboarding) {
  //   router.push("/dashboard");
  //   // return null;
  // }
  return (
    <div>
      <OnboardingComponent />
    </div>
  );
};

export default OnboardingPage;
