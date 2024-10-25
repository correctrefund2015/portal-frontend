import AccountLogoutButton from "./AccountLogoutButton";
import AddClientProfileForm from "./AddClientProfileForm";
import { getClientProfilesRequest } from "@/lib/data/client.api";
import { getUser } from "@/lib/cookies";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const AccountDropdown = async ({
  client,
}: {
  // clientProfiles: IClientProfile[];
  client: any;
}) => {
  // const { client } = getUser();

  // console.log({ clientProfiles });

  return (
    <div className="w-64 bg-white">
      {/* Section 2 - Other Accounts */}
      {client ? (
        <div className="border-t border-t-slate-200 bg-slate-50 divide-y divide-slate-200">
          {client.individualProfile && (
            <Link
              key={client.individualProfile.id}
              href={`/dashboard/profile/${client.individualProfile?.id}?type=INDIVIDUAL`}
            >
              <div className="flex items-center p-3 hover:bg-slate-100 cursor-pointer">
                <div className="rounded-full size-9 bg-orange-500 text-white text-center grid place-items-center">
                  {1}
                </div>
                <div className="ml-2 flex-grow">
                  <p className="text-sm font-medium text-slate-800">
                    {`${client.individualProfile.firstName} ${client.individualProfile.lastName}`}
                  </p>
                  <p className="text-xs text-slate-500">{"Personal"}</p>
                </div>
              </div>
            </Link>
          )}
          {client.businessProfiles.map(
            (profile: BusinessProfile, idx: number) => (
              <Link
                key={profile.id}
                href={`/dashboard/profile/${profile?.id}?type=BUSINESS`}
              >
                <div className="flex items-center p-3 hover:bg-slate-100 cursor-pointer">
                  <div className="rounded-full size-9 bg-orange-500 text-white text-center grid place-items-center">
                    {client.individualProfile ? idx + 2 : idx + 1}
                  </div>
                  <div className="ml-2 flex-grow">
                    <p className="text-sm font-medium text-slate-800">
                      {profile.legalName}
                    </p>
                    <p className="text-xs text-slate-500">{"Business"}</p>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}

      {/* Section 3 - Add Account and Logout */}
      <div className="flex gap-2 px-3 pt-4 border-t border-t-slate-200">
        <AddClientProfileForm clientId={client.id!} />
        <AccountLogoutButton />
      </div>
    </div>
  );
};

export default AccountDropdown;
