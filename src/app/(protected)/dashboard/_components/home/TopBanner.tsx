"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  const { signOut } = useAuth();

  return (
    <div className="top-banner lg:flex justify-between items-center cr-gradient-bg w-full text-white py-3 px-8 block">
      <div className="left flex items-center mb-8 lg:mb-0">
        <Image
          src="/images/ai-image.png"
          height={36}
          width={37}
          alt="ai image"
          quality={100}
        />
        <div className="flex flex-col justify-center ml-3">
          <h2 className="text-lg font-semibold leading-5">
            Get started with our AI assistant
          </h2>
          <span className="text-sm font-medium leading-3 mt-[2px] text-slate-100">
            Let our AI help you find the perfect service tailored to your needs.
          </span>
        </div>
      </div>
      <div className="right mb-8 lg:mb-0">
        <Link className="btn-secondary mr-3" href="/">
          Ask AI to Help
        </Link>
        <Link className="btn-outlined" href="/client/services">
          Browse Services Manually
        </Link>
        {/* <Button onClick={() => signOut()}>Logout</Button> */}
      </div>
    </div>
  );
};

export default TopBanner;
