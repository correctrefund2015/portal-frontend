import React from "react";
import AuthSlider from "./AuthSlider";
import Image from "next/image";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-scroll cr-bg-image">
      <div className="pt-12">
        <div className="md:flex block bg-white w-100 md:w-[872px] mx-auto rounded-sm p-3">
          <div className="flex flex-col bg-slate-100 p-7 rounded-sm md:w-[377px] justify-between">
            <div className="wrapper">
              <Image
                src="/logos/logo-colored.svg"
                width={122}
                height={40}
                alt="Correct Refund Logo"
                quality={100}
              />
              <h1 className="font-bold text-2xl tracking-tight mt-24 text-slate-800 mb-2">
                Simplify your journey with expert guidance.
              </h1>

              <p className="font-thin text-slate-400 text-[13px] mb-24">
                Let us help you navigate your journey with the tools and
                insights you need for effortless success.
              </p>
            </div>

            <AuthSlider />
          </div>
          {/* <div className="cr-left flex-1 p-8 flex items-center justify-center"> */}
          {children}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
