"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const AccountLogoutButton = () => {
  const router = useRouter();
  const logout = async () => {
    const resp = await fetch("/api/logout", {
      method: "GET",
    });

    const json = await resp.json();

    if (json.message === "ok") {
      router.replace("/sign-in");
    }
  };
  return (
    <Button
      variant="ghost"
      className="w-full rounded-sm h-8 text-xs text-slate-500 border border-slate-500 hover:bg-slate-50"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
};

export default AccountLogoutButton;
