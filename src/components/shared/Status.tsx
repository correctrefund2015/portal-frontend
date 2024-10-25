import { cn } from "@/lib/utils";
import React from "react";

const Status = ({ text, className }: { text: string; className: string }) => {
  return (
    <span
      className={cn(
        "capitalize text-xs font-medium px-2 py-1 rounded-full",
        className
      )}
    >
      {text}
    </span>
  );
};

export default Status;
