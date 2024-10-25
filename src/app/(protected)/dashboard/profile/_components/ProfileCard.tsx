import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Building2, UserIcon } from "lucide-react";

type Props = {
  profile: any;
  type: string;
};
const ProfileCard = ({ profile, type }: Props) => {
  return (
    <div className="shadow-sm bg-slate-100 rounded-sm">
      <div className="shadow-sm bg-white p-6 rounded-sm">
        <div className="flex justify-between items-start">
          <div className="bg-blue-50 rounded-full p-2 mb-2">
            {type === "INDIVIDUAL" ? (
              <UserIcon size={32} className="text-[#a767ff]" />
            ) : (
              <Building2 size={32} className="text-[#a767ff]" />
            )}
          </div>
          {/* <Status text="pending" className="bg-blue-50 text-blue-500" /> */}
        </div>
        <h2 className="text-lg font-semibold mb-1">
          {type === "INDIVIDUAL"
            ? `${profile?.firstName + " " + profile?.lastName}`
            : profile?.legalName}
        </h2>
        <span className="text-sm text-slate-400 block mb-4 truncate">
          {type === "INDIVIDUAL" ? profile?.email : profile?.dba}
        </span>
        {/* <ul>
          <li className="flex mb-3">
            <Image
              src="/icons/progress-clock.svg"
              height={18}
              width={18}
              alt=""
              quality={100}
            />
            <span className="text-sm text-slate-500 block ml-2">
              Collecting your documents
            </span>
          </li>
          <li className="flex">
            <Image
              src="/icons/pencil-ol.svg"
              height={18}
              width={18}
              alt=""
              quality={100}
            />
            <span className="text-sm text-slate-500 block ml-2">
              {formattedTimestamp(serviceRequest?.createdAt!)}
            </span>
          </li>
        </ul> */}
      </div>
      <div className="flex justify-between px-2 py-2">
        <Link
          href={`/dashboard/profile/${profile?.id}?type=${type}`}
          className="px-3 py-2 bg-transparent text-slate-400 text-sm font-semibold rounded-sm hover:bg-slate-200"
        >
          Edit
        </Link>
        <Link
          href={`/dashboard/services/`}
          className="px-3 py-2 bg-blue-100 text-blue-500 text-sm font-semibold rounded-sm hover:bg-blue-200"
        >
          View services
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
