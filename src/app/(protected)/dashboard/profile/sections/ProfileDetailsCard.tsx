import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import React from "react";
import EditProfileForm from "../_components/EditProfileForm";
import ProfileDetails from "../_components/ProfileDetails";
import { formattedDateShort } from "@/utils/helpers";

type Props = {
  profile: any;
  profileType: string;
};
const ProfileDetailsCard = ({ profile, profileType }: Props) => {
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
            <h6 className="text-sm font-semibold">{`${profile?.firstName} ${profile?.lastName}`}</h6>
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
          <EditProfileForm profile={profile} type={profileType} />
        </div>
        <ProfileDetails title="Phone" subtitle={profile?.phone} />
        <ProfileDetails title="Email" subtitle={profile?.email} />
        <ProfileDetails title="Address" subtitle={profile?.address} />
        <ProfileDetails title="SSN/TIN" subtitle={profile?.ssn} />
        <ProfileDetails
          title="Date of Birth"
          subtitle={formattedDateShort(profile?.dob)}
        />
        <ProfileDetails
          title="Filling Status"
          subtitle={profile?.maritalStatus}
        />
        <ProfileDetails
          title="Client Since"
          subtitle={formattedDateShort(profile?.createdAt)}
        />
      </div>
    </Card>
  );
};

export default ProfileDetailsCard;
