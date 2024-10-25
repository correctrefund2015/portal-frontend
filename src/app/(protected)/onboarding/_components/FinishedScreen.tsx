"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FinishScreen = ({
  answers,
  questions,
}: {
  answers: any[];
  questions: any[];
}) => {
  console.log(answers);

  const proceed = async () => {
    const clientType = questions[0].options[answers[0]];
    const service = questions[1].options[answers[1]];
    const natureOfTax = questions[2].options[answers[2]];

    console.log(clientType, service, natureOfTax);
  };

  return (
    <div className="finishedScreen mt-10 md:mt-24 px-6 md:px-0">
      <div className=" bg-white md:w-[500px] mx-auto p-3 md:p-10 rounded-sm text-center">
        <Image
          src="/icons/finished-icon.svg"
          height={54}
          width={55}
          alt="clipboard"
          className="inline-block mb-1 md:mb-6"
        />
        <h2 className="cr-gradient text-lg md:text-2xl font-semibold mb-2 md:mb-6">
          Comprehensive Tax Preparation
        </h2>
        <p className="font-medium text-sm md:text-base text-slate-500 mb-6">
          Our Comprehensive Tax Preparation service is designed to handle all
          aspects of your tax filing, ensuring accuracy and maximizing your
          potential refund. Whether you are filing as an individual or for your
          business, our experts will guide you through the process, address any
          complex issues, and help you navigate the tax code efficiently.
        </p>
        <Button className="w-full btn-onboarding active" onClick={proceed}>
          Proceed with Tax Preparation
        </Button>
      </div>
    </div>
  );
};

export default FinishScreen;
