import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import ProfileDetails from "../_components/ProfileDetails";
import { formattedDateShort } from "@/utils/helpers";
import EditDependentForm from "../_components/EditDependentForm";

type Props = {
  profile: IndividualProfile;
  profileType: string;
};
const DependentDetailsCard = ({ profile, profileType }: Props) => {
  return (
    <Card className="">
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            DEPENDENT INFORMATION
          </span>
          <EditDependentForm isNew={true} profileId={profile.id} />
        </div>
      </div>
      <Separator />
      {profile.dependents && (
        <div className="divide-y">
          {profile.dependents?.map((dependent, idx) => (
            <div key={idx} className="p-4">
              <div className="size-8 rounded-full border border-blue-700 bg-blue-200 p-2 text-center flex items-center justify-center">
                <span className="text-blue-700">{idx + 1}</span>
              </div>

              <div className="flex items-center justify-between">
                <ProfileDetails
                  title="Full name"
                  subtitle={dependent?.firstName! + " " + dependent.lastName}
                />
                <EditDependentForm
                  dependent={dependent}
                  isNew={false}
                  profileId={profile.id}
                />
              </div>
              <ProfileDetails
                title="Relationship"
                subtitle={dependent?.relationship!}
              />
              <ProfileDetails title="SSN/TIN" subtitle={dependent?.ssn!} />
              <ProfileDetails
                title="Date of Birth"
                subtitle={formattedDateShort(dependent?.dob?.toISOString()!)}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DependentDetailsCard;
