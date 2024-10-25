import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import React from "react";
import ProfileDetails from "../_components/ProfileDetails";
import { formattedDateShort } from "@/utils/helpers";
import { BusinessProfile } from "@prisma/client";
import EditBusinessProfileForm from "../_components/EditBusinessProfileForm";

type Props = {
  profile: BusinessProfile;
};
const BusinessDetailsCard = ({ profile }: Props) => {
  return (
    <Card className="">
      <div className="flex justify-end pt-4 pr-4">
        <Pencil className="size-4 text-slate-600" />
      </div>
      <div className="px-4 pb-4 -mt-2">
        <div className="user-wrapper flex">
          <div className="rounded-full">
            {/* <Image
                    src={"https://i.pravatar.cc/40?img=1"}
                    height={40}
                    width={40}
                    alt="Plus Icon"
                    quality={100}
                    className="rounded-full"
                  /> */}
          </div>
          <div className="client-info">
            <h6 className="text-sm font-semibold">{profile.legalName}</h6>
            <span className="text-xs font-medium text-slate-400">
              {profile?.email}
            </span>
          </div>
        </div>
      </div>
      <Separator />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            YOUR DETAILS
          </span>
          <EditBusinessProfileForm profile={profile} />
        </div>
        <ProfileDetails title="DBA" subtitle={profile?.dba!} />
        <ProfileDetails
          title="Structure"
          subtitle={profile?.structure?.replaceAll("_", " ")! || ""}
        />
      </div>
    </Card>
  );
};

export default BusinessDetailsCard;
