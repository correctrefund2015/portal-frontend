"use client";

import { Button } from "@/components/ui/button";
import { ServiceDetail } from "@/constants/services";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "@/components/shared/SubmitButton";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { addNewServiceAction } from "../_actions/newService";
import { toast } from "@/components/ui/use-toast";

type Props = {
  service: ServiceDetail;
  client: any;
};
const SelectNewService = ({ service, client }: Props) => {
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (client.individualProfile !== null) {
      setSelectedProfile(client.individualProfile.id);
      setSelectedType("INDIVIDUAL");
    } else {
      setSelectedProfile(client.businessProfiles[0].id);
      setSelectedType("BUSINESS");
    }
  }, [client, setSelectedProfile, setSelectedType]);

  const toggleSelectProfile = (id: string, type: string) => {
    setSelectedProfile(id);
    setSelectedType(type);
  };

  const selectNewServive = async () => {
    try {
      setLoading(true);
      const individualProfileId =
        selectedType === "INDIVIDUAL" ? selectedProfile : null;
      const businessProfileId =
        selectedType === "BUSINESS" ? selectedProfile : null;
      const resp = await addNewServiceAction(
        service.name,
        individualProfileId!,
        businessProfileId!
      );

      if (resp?.status === 201) {
        toast({
          title: "Congratulations !!!",
          description: `Your request for ${service.name} has been succesfully added.`,
        });
        setOpen(false);
        router.push("/dashboard/services/client");
      } else {
        toast({
          variant: "destructive",
          title: "Request denied",
          description: "Unable to create this service at the moment.",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="inline-block btn-service-card hover:no-underline"
        >
          Choose Service
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 flex flex-col max-h-[80vh] pb-0">
        <DialogHeader>
          <DialogTitle className="px-4 pb-4">
            Request for {service.name}
          </DialogTitle>
          <Separator />
        </DialogHeader>

        <div className="px-6 pb-6 flex-grow overflow-hidden">
          {/* Profile list */}
          <h2 className="text-lg font-semibold text-slate-700">
            Choose a profile
          </h2>

          <div className="flex-grow overflow-y-auto">
            <div className="border-t border-t-slate-200 bg-slate-50 divide-y divide-slate-200">
              {client?.individualProfile && (
                <div className={cn(service.name === "Bookkeeping" && "hidden")}>
                  <div
                    onClick={() =>
                      toggleSelectProfile(
                        client?.individualProfile.id,
                        "INDIVIDUAL"
                      )
                    }
                    className={cn(
                      "flex items-center p-3 hover:bg-slate-100 cursor-pointer",
                      selectedProfile === client?.individualProfile.id &&
                        "bg-slate-100"
                    )}
                  >
                    <div className="rounded-full size-9 bg-orange-500 text-white text-center grid place-items-center">
                      {selectedProfile === client?.individualProfile.id ? (
                        <Check className="size-6" />
                      ) : (
                        <span>1</span>
                      )}
                    </div>
                    <div className="ml-2 flex-grow">
                      <p className="text-sm font-medium text-slate-800">
                        {`${client?.individualProfile.firstName} ${client?.individualProfile.lastName}`}
                      </p>
                      <p className="text-xs text-slate-500">{"Personal"}</p>
                    </div>
                  </div>
                </div>
              )}
              {client?.businessProfiles.map(
                (profile: BusinessProfile, idx: number) => (
                  <div key={idx}>
                    <div
                      onClick={() =>
                        toggleSelectProfile(profile.id, "BUSINESS")
                      }
                      className={cn(
                        "flex items-center p-3 hover:bg-slate-100 cursor-pointer",
                        selectedProfile === profile.id && "bg-slate-100"
                      )}
                    >
                      <div className="rounded-full size-9 bg-orange-500 text-white text-center grid place-items-center">
                        {selectedProfile === profile.id ? (
                          <Check className="size-6" />
                        ) : (
                          <>{client?.individualProfile ? idx + 2 : idx + 1}</>
                        )}
                      </div>
                      <div className="ml-2 flex-grow">
                        <p className="text-sm font-medium text-slate-800">
                          {profile.legalName}
                        </p>
                        <p className="text-xs text-slate-500">{"Business"}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* Service description */}
            <p className="mt-4">
              {selectedType === "BUSINESS"
                ? service.business
                : service.individual}
            </p>
          </div>
        </div>

        <Separator />
        <DialogFooter className="p-3">
          <div className="flex items-center justify-end ">
            <SubmitButton
              className="mt-4 shad-primary-btn rounded-sm"
              isLoading={loading}
              onClick={() => selectNewServive()}
            >
              Continue
            </SubmitButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectNewService;
