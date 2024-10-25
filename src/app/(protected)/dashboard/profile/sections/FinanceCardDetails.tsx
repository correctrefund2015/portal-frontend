import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ProfileDetails from "../_components/ProfileDetails";
import { formattedDateShort, formatUsdAmount } from "@/utils/helpers";
import EditFinanceForm from "../_components/EditFinanceForm";

type Props = {
  profile: IndividualProfile;
  profileType: string;
};
const FinanceDetailsCard = ({ profile, profileType }: Props) => {
  return (
    <Card className="">
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500">
            FINANCIAL INFORMATION
          </span>
          <EditFinanceForm isNew={true} profileId={profile.id} />
        </div>
      </div>
      <Separator />
      {profile.finances && (
        <div className="p-0 divide-y">
          {profile.finances?.map((finance, idx) => (
            <div key={idx} className="p-4">
              <div className="size-8 rounded-full border border-blue-700 bg-blue-200 p-2 text-center flex items-center justify-center">
                <span className="text-blue-700">{idx + 1}</span>
              </div>

              <div className="flex items-center justify-between">
                <ProfileDetails
                  title="Income Source"
                  subtitle={finance?.incomeType}
                />
                <EditFinanceForm
                  finance={finance}
                  isNew={false}
                  profileId={profile.id}
                />
              </div>
              <ProfileDetails
                title="Tax Filling Status"
                subtitle={finance?.taxFillingStatus!}
              />
              <ProfileDetails
                title="Estimated Annual Income"
                subtitle={formatUsdAmount(finance?.amount)}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default FinanceDetailsCard;
