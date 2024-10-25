import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Plus } from "lucide-react";
import React from "react";
import ProfileDetails from "../_components/ProfileDetails";
import { formattedDateShort } from "@/utils/helpers";
import EditSpouseForm from "../_components/EditSpouseForm";

type Props = {
  profile: IndividualProfile;
  profileType: string;
};
const SpouseDetailsCard = ({ profile, profileType }: Props) => {
  return (
    <Card className="">
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            SPOUSE INFORMATION
          </span>
          {profile.spouse?.length == 0 && (
            <EditSpouseForm isNew={true} profileId={profile.id} />
          )}
        </div>
      </div>
      <Separator />
      {profile.spouse && (
        <div className="p-4">
          {profile.spouse?.map((spouse, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between">
                <ProfileDetails
                  title="Full name"
                  subtitle={spouse?.firstName! + " " + spouse.lastName}
                />
                <EditSpouseForm
                  spouse={spouse}
                  isNew={false}
                  profileId={profile.id}
                />
              </div>

              <ProfileDetails title="SSN/TIN" subtitle={spouse?.ssn!} />
              <ProfileDetails
                title="Date of Birth"
                subtitle={formattedDateShort(spouse?.dob?.toISOString()!)}
              />
              <ProfileDetails
                title="Contact Information"
                subtitle={spouse?.email!}
                description={spouse.phone}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SpouseDetailsCard;
