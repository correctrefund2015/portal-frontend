"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const OnboardingNav = () => {
  const { signOut } = useAuth();
  return (
    <nav className="flex justify-between mx-8 pt-8">
      <Link href="/">
        <Image
          src="/logos/logo-white.svg"
          height={40}
          width={122}
          alt="Correct Refund"
          quality={100}
        />
      </Link>
      <Button
        className="bg-white text-slate-800 hover:bg-slate-200 hover:text-slate-900"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </nav>
  );
};

export default OnboardingNav;
