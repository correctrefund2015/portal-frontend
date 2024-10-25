import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import React from "react";
import Image from "next/image";
import ProfileCardHeader from "./_components/ProfileCardHeader";
import ProfileDetails from "./_components/ProfileDetails";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/session";
import Link from "next/link";
import AddClientProfileForm from "../_components/sections/AddClientProfileForm";
import ProfileCard from "./_components/ProfileCard";
import { getClientProfilesFromDb } from "@/lib/queries/client.query";

const ProfilePage = async () => {
  const user = await getUser();

  const client = await getClientProfilesFromDb(user?.client.id!);

  return (
    <div className="mx-8 my-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:justify-between sm:items-center">
        <div>
          <h1 className="font-medium text-slate-800 text-2xl">My Profile</h1>
          <span className="text-sm text-slate-500">
            View and edit your information
          </span>
        </div>
        <AddClientProfileForm clientId={user?.client.id!} variant="Blue" />
      </div>

      <div className="">
        <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {client?.individualProfile !== null && (
            <ProfileCard
              profile={client?.individualProfile}
              type="INDIVIDUAL"
            />
          )}

          {/* Business profiles */}

          {client?.businessProfiles !== null && (
            <>
              {client?.businessProfiles.map((business, idx) => (
                <ProfileCard key={idx} profile={business} type="BUSINESS" />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
