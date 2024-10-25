import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ProfileDetails from "../_components/ProfileDetails";
import { formattedDateShort } from "@/utils/helpers";
import EditEmploymentForm from "../_components/EditEmploymentForm";

type Props = {
  // profile: IndividualProfile;
  profile: IndividualProfile;
  profileType: string;
};
const EmploymentDetailsCard = ({ profile, profileType }: Props) => {
  return (
    <Card className="">
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            EMPLOYMENT DETAILS
          </span>
          <EditEmploymentForm isNew={true} profileId={profile.id} />
        </div>
      </div>
      <Separator />
      {profile.employment && (
        <div className="p-0 divide-y">
          {profile.employment?.map((employment, idx) => (
            <div key={idx} className="p-4">
              <div className="size-8 rounded-full border border-blue-700 bg-blue-200 p-2 text-center flex items-center justify-center">
                <span className="text-blue-700">{idx + 1}</span>
              </div>
              <div className="flex items-center justify-between">
                <ProfileDetails
                  title="Employer"
                  subtitle={employment.employer}
                />
                <EditEmploymentForm
                  employment={employment}
                  isNew={false}
                  profileId={profile.id}
                />
              </div>

              <ProfileDetails
                title="Job Title"
                subtitle={employment?.jobTitle!}
              />
              <ProfileDetails
                title="Employment Type"
                subtitle={employment?.type!}
              />
              <ProfileDetails title="Address" subtitle={employment?.address!} />
              <ProfileDetails
                title="Contact Information"
                subtitle={employment?.email!}
                description={employment.phone}
              />
              <ProfileDetails
                title="Start Date"
                subtitle={formattedDateShort(
                  employment?.startDate.toISOString()!
                )}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default EmploymentDetailsCard;
