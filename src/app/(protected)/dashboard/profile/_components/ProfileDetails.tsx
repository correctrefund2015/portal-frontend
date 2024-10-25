import React from "react";

type Props = {
  title: string;
  subtitle: string;
  description?: string;
};
const ProfileDetails = ({ title, description, subtitle }: Props) => {
  return (
    <div className="my-3">
      <h2 className="text-xs text-slate-500 font-semibold">{title}</h2>
      <p className="text-slate-700 text-sm">{subtitle}</p>
      {description && <p className="text-slate-700 text-sm">{description}</p>}
    </div>
  );
};

export default ProfileDetails;
