import { Progress } from "@/components/ui/progress";
import React from "react";

const OnboardingProgress = ({ index, numQuestions }: any) => {
  return (
    <div className="progress mt-8">
      <Progress value={Number((100 / numQuestions) * index)} className="h-2" />
    </div>
  );
};

export default OnboardingProgress;
