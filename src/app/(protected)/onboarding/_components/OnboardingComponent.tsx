"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import OnboardingNav from "./OnboardingNav";
import StartScreen from "./StartScreen";
import OnboardingFooter from "./OnboardingFooter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingImage from "@/components/shared/LoadingImage";
import { useAuth } from "@/contexts/AuthContext";
import { servicesDetails } from "@/constants/services";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define the question structure
type Question = {
  id: string;
  text: string;
  options: string[];
};

// Define the profile structure
type Profile = {
  name: string;
  questions: Question[];
};

// Sample profiles and questions
const profiles: Profile[] = [
  {
    name: "Business",
    questions: [
      {
        id: "b1",
        text: "What type of service are you looking for?",
        options: [
          "Bookkeeping",
          "Tax Preparation",
          "Strategic Planning",
          "Audit Support",
          "CPA Advisory",
          "Compliance",
        ],
      },
      // {
      //   id: "b2",
      //   text: "What is the nature of your tax or financial situation?",
      //   options: [
      //     "Small Business Tax Filing",
      //     "Complex Business Taxes",
      //     "Investment Management",
      //     "Other",
      //   ],
      // },
    ],
  },
  {
    name: "Individual",
    questions: [
      {
        id: "i1",
        text: "What type of service are you looking for?",
        options: [
          "Tax Preparation",
          "Strategic Planning",
          "Audit Support",
          "CPA Advisory",
          "Compliance",
        ],
      },
      // {
      //   id: "i2",
      //   text: "What is the nature of your tax or financial situation?",
      //   options: [
      //     "Small Business Tax Filing",
      //     "Complex Business Taxes",
      //     "Investment Management",
      //     "Other",
      //   ],
      // },
    ],
  },
];

const OnboardingComponent: React.FC = () => {
  const [step, setStep] = useState(-1); // -1 for start view, 0 for profile selection, 1+ for questions
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const currentProfile =
    selectedProfile !== null ? profiles[selectedProfile] : null;
  const totalSteps = currentProfile ? currentProfile.questions.length + 2 : 2; // +2 for start and profile selection
  const progress = ((step + 1) / totalSteps) * 100;
  const [businessName, setBusinessName] = useState("");
  const { persistUser } = useAuth();

  const router = useRouter();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleProfileSelect = (index: number) => {
    setSelectedProfile(index);
    setAnswers({});
    // handleNext();
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
    handleNext();
  };

  const startOnboarding = async () => {
    // check
    handleNext();
  };

  const renderStartView = () => (
    <StartScreen dispatch={startOnboarding} />
    // <div className="text-center">
    //   <h2 className="text-2xl font-bold mb-4">
    //     Welcome to Our Onboarding Process
    //   </h2>
    //   <p className="mb-4">
    //     We're excited to get to know you better. Let's get started!
    //   </p>
    //   <Button onClick={handleNext}>Start</Button>
    // </div>
  );

  const renderProfileSelection = () => (
    <div className="question-wrapper flex flex-col mt-24 justify-center md:w-[700px] mx-auto text-center">
      <h1 className="text-xl md:text-2xl font-medium text-white mb-10">
        Are you a business or individual client?
      </h1>
      {/* <RadioGroup
        onValueChange={(value) => handleProfileSelect(parseInt(value))}
      > */}
      <div className="options flex flex-col items-center mt-4 px-6">
        {profiles.map((profile, index) => (
          <div key={index}>
            <Button
              onClick={() => {
                handleProfileSelect(index);
              }}
              className={`btn-onboarding flex mb-2 md:w-[340px]  w-full ${
                selectedProfile === index ? "active" : ""
              }`}
              key={index}
            >
              {profile.name}
            </Button>
            {index === 0 && (
              <div
                className={cn("", selectedProfile !== 0 ? "hidden" : "mb-4")}
              >
                <Input
                  placeholder={"Business name"}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="shad-input border-0 mt-2 md:w-[340px]"
                  type={"text"}
                />
              </div>
            )}
          </div>
          // <div key={profile.name} className="flex items-center space-x-2">
          //   <RadioGroupItem value={index.toString()} id={`profile-${index}`} />
          //   <Label htmlFor={`profile-${index}`}>{profile.name}</Label>
          // </div>
        ))}
      </div>

      {/* </RadioGroup> */}
    </div>
  );

  const renderQuestion = () => {
    if (!currentProfile) return null;
    const questionIndex = step - 1;
    const question = currentProfile.questions[questionIndex];
    const selectedAnswer = answers[question.id];

    return (
      <div className="question-wrapper flex flex-col mt-24 justify-center md:w-[700px] mx-auto text-center">
        <h1 className="text-xl md:text-2xl font-medium text-white mb-10">
          {question.text}
        </h1>
        <div className="options flex flex-col items-center mt-4 px-6">
          {question.options.map((option, index): any => (
            <Button
              onClick={() => {
                handleAnswerSelect(question.id, option);
              }}
              className={`btn-onboarding flex mb-2 md:w-[340px]  w-full ${
                selectedAnswer === option ? "active" : ""
              }`}
              key={index}
            >
              {option}
            </Button>
          ))}
        </div>
        {/* <RadioGroup
          onValueChange={(value) => handleAnswerSelect(question.id, value)}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup> */}
      </div>
    );
  };

  const renderFinish = () => {
    const selectedService = selectedProfile === 0 ? answers.b1 : answers.i1;

    const selectedServiceDetails = servicesDetails.find(
      (item) => item.name === selectedService
    );

    const proceed = async () => {
      try {
        setLoading(true);

        const type = selectedProfile === 0 ? "BUSINESS" : "INDIVIDUAL";

        const resp = await fetch("/api/create-client", {
          method: "POST",
          body: JSON.stringify({
            type: type,
            serviceName: selectedService,
            businessName,
          }),
        });

        const json = await resp.json();
        console.log(json);

        if (json.message === "ok") {
          // persistUser(json.data.account, json.da
          router.replace("/dashboard");
          router.refresh();
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Unable to proceed. Please try again later",
          });
        }
      } catch (error) {
        console.log("error onboarding", error);
        setLoading(false);
      }
      // if (res.error) {
      //   return;
      // }
      // if (res.message === "success") {
      // }
    };

    // if (!user || user.onboarding) {
    //   router.push("/dashboard");
    //   return null;
    // }

    return (
      <div className="finishedScreen mt-10 md:mt-24 px-6 md:px-0">
        <div className=" bg-white md:w-[45vw] mx-auto p-3 md:p-10 rounded-sm text-center">
          <Image
            src="/icons/finished-icon.svg"
            height={54}
            width={55}
            alt="clipboard"
            className="inline-block mb-1 md:mb-6"
          />
          <h2 className="cr-gradient text-lg md:text-2xl font-semibold mb-2 md:mb-6">
            {selectedServiceDetails?.name}
          </h2>
          <p className="font-medium text-sm md:text-base text-slate-500 mb-6">
            {selectedProfile === 0
              ? selectedServiceDetails?.business
              : selectedServiceDetails?.individual}
          </p>
          <Button
            className="w-full btn-onboarding active"
            onClick={() => proceed()}
          >
            {loading ? (
              <LoadingImage />
            ) : (
              <span>Proceed with {selectedService}</span>
            )}
          </Button>
        </div>
      </div>
      // <div className="text-center">
      //   <h2 className="text-2xl font-bold mb-4">
      //     Thank You for Completing the Onboarding!
      //   </h2>
      //   <p className="mb-4">Here are your responses:</p>
      //   <ul className="list-disc list-inside">
      //     {Object.entries(answers).map(([questionId, answer]) => (
      //       <li key={questionId}>
      //         {
      //           profiles
      //             .flatMap((p) => p.questions)
      //             .find((q) => q.id === questionId)?.text
      //         }
      //         : {answer}
      //       </li>
      //     ))}
      //   </ul>
      // </div>
    );
  };

  return (
    <div className="h-screen">
      <OnboardingNav />

      {step === -1 && renderStartView()}
      {step === 0 && renderProfileSelection()}
      {step > 0 &&
        step <= (currentProfile?.questions.length ?? 0) &&
        renderQuestion()}
      {step > (currentProfile?.questions.length ?? 0) && renderFinish()}

      {/* Footer */}
      <OnboardingFooter>
        <div className="progress mt-8">
          <Progress
            value={progress}
            className={`h-2 mb-4 ${step === -1 ? "hidden" : ""}`}
          />
        </div>
        {/* <OnboardingProgress index={index} numQuestions={numQuestions} /> */}
        <div className="flex justify-between mt-8">
          <div>
            {step > -1 && (
              <Button
                className="btn-primary"
                onClick={handlePrevious}
                disabled={step === -1}
              >
                Previous
              </Button>
            )}
          </div>
          <div>
            {step <= (currentProfile?.questions.length ?? 0) && step !== -1 && (
              <Button
                className="btn-primary"
                onClick={handleNext}
                disabled={step === 0 && selectedProfile === null}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </OnboardingFooter>
      {/* <div className="flex justify-between mt-4">
        {step > -1 && (
          <Button onClick={handlePrevious} disabled={step === -1}>
            Previous
          </Button>
        )}
        {step <= (currentProfile?.questions.length ?? 0) && step !== -1 && (
          <Button
            onClick={handleNext}
            disabled={step === 0 && selectedProfile === null}
          >
            Next
          </Button>
        )}
      </div> */}
    </div>
  );
};

export default OnboardingComponent;
