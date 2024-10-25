import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/cookies";
import ProfileCardHeader from "../_components/ProfileCardHeader";
import ProfileDetails from "../_components/ProfileDetails";
import { getClientProfile } from "@/lib/data/client.api";
import EditProfileForm from "../_components/EditProfileForm";
import { formattedDateShort } from "@/utils/helpers";
import ProfileDetailsCard from "../sections/ProfileDetailsCard";
import DependentDetailsCard from "../sections/DependentDetailsCard";
import FinanceDetailsCard from "../sections/FinanceCardDetails";
import SpouseDetailsCard from "../sections/SpouseDetailsCard";
import EmploymentDetailsCard from "../sections/EmploymentDetailsCard";
import {
  getBusinessProfilesById,
  getIndividualProfileById,
} from "@/lib/queries/client.query";
import { BusinessProfile } from "@prisma/client";
import BusinessDetailsCard from "../sections/BusinessDetailsCard";

type Props = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
const ProfilePage = async ({ params, searchParams }: Props) => {
  const profileId = params?.profileId;
  const profileType = searchParams?.type as string;

  let profile: any = null;
  // let businessProfiles: BusinessProfile[] = [];

  if (profileType === "BUSINESS") {
    profile = await getBusinessProfilesById(profileId);
    console.log("profile ===>", profile);
  } else {
    profile = await getIndividualProfileById(profileId);
  }

  return (
    <div className="mx-8 my-6 w-full">
      {profileType === "BUSINESS" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profile && <BusinessDetailsCard profile={profile} />}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div>
            {profile && (
              <ProfileDetailsCard profile={profile} profileType={profileType} />
            )}
          </div>

          {profile && (
            <>
              <div>
                <EmploymentDetailsCard
                  profile={profile}
                  profileType={profileType}
                />
              </div>

              <div className="space-y-4">
                <FinanceDetailsCard
                  profile={profile}
                  profileType={profileType}
                />
                <SpouseDetailsCard
                  profile={profile}
                  profileType={profileType}
                />
              </div>

              <div>
                <DependentDetailsCard
                  profile={profile}
                  profileType={profileType}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
