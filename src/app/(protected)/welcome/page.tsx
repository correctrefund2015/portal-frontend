"use client";
import { CheckIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const VerificationPage = () => {
  const router = useRouter();
  return (
    <div className="bg-scroll cr-bg-image">
      <div className="pt-12">
        <div className="md:flex block bg-white w-100 md:w-[872px] mx-auto rounded-sm p-3">
          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
            <div className="wrapper">
              <Image
                src="/logos/logo-colored.svg"
                width={122}
                height={40}
                alt="Correct Refund Logo"
                quality={100}
              />
            </div>
            <div className="pt-24 col-span-2 grid place-items-center">
              {/* Check icon */}
              <div className="bg-green-500 h-16 w-16 rounded-full p-2 grid place-items-center">
                <CheckIcon className="text-white size-10" />
              </div>

              <section className="mt-8 mb-16 text-center ">
                <h1 className="text-[20px] font-semibold tracking-tight">
                  Verification successful!
                </h1>
                <p className="text-slate-400 text-sm">
                  Your email has been successfully verified.
                </p>

                <p className="text-md mt-12">
                  Congratulations! Your account has been successfully verified.
                  You&apos;re now ready to proceed with selecting the service
                  that best fits your needs.
                </p>

                <Button
                  className="btn-onboarding mt-12"
                  onClick={() => router.replace("/onboarding")}
                >
                  Start service selection
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
