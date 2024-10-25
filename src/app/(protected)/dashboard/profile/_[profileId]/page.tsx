import React from "react";

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
                <EmploymentDetailsCard profile={profile} profileType={profileType} />
              </div>

              <div className="space-y-4">
                {/* Pass profileType to FinanceDetailsCard */}
                <FinanceDetailsCard profile={profile} profileType={profileType} />
                <SpouseDetailsCard profile={profile} profileType={profileType} />
              </div>

              <div>
                <DependentDetailsCard  profile={profile} profileType={profileType}  />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
