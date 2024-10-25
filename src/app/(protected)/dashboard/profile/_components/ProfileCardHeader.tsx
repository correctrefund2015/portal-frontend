import { Pencil } from "lucide-react";
import React from "react";

type Props = {
  title: string;
};
const ProfileCardHeader = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-slate-500">{title}</span>
      <Pencil className="size-4 text-slate-600" />
    </div>
  );
};

export default ProfileCardHeader;
