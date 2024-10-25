"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const GoogleSignIn = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href);
    const token = urlParams.get("token");

    if (token) {
      // save jwt to next cookies
      console.log({ token });

      window.location.href = "http://localhost:3000";
    }
  }, []);

  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:4000/api/auth/google/login";
    // if (!isLoaded) return;
  };
  return (
    <Button
      className="mt-4 border bg-white border-slate-200 text-slate-800 w-full rounded-sm hover:bg-slate-200"
      onClick={handleGoogleSignIn}
      disabled={false}
    >
      <Image
        src="/images/google_symbol.svg"
        height={24}
        width={24}
        quality={100}
        alt="Google"
        className="mr-2"
      />
      {"Sign in"}
    </Button>
  );
};

export default GoogleSignIn;

