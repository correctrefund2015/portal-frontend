"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientProfile, profileSchema } from "@/schemas/client-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import { createClientProfile } from "./_actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const AddClientProfileForm = ({
  clientId,
  variant,
}: {
  clientId: string;
  variant?: "Blue" | "Gray";
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<ClientProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      type: "BUSINESS",
      ssn: "",
      dob: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      legalName: "",
      name: "",
      dba: "",
      ein: "",
      structure: "",
    },
  });

  const router = useRouter();

  const profileType = form.watch("type");

  const onSubmit = async (data: ClientProfile) => {
    try {
      setLoading(true);
      // Convert the date to ISO-8601 format before sending to the backend
      if (data.dob) {
        const date = new Date(data.dob);
        data.dob = date.toISOString();
        // data.structure = data.structure?.replaceAll(" ", "_");
      }

      // console.log(data, clientId);

      const result: any = await createClientProfile(data, clientId);
      // console.log(result);

      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description: "Your new profile has been added successfully.",
        });

        router.refresh();
        setOpen(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // Handle form submission here
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger>
        <Button
          variant="ghost"
          className={cn(
            variant === "Blue"
              ? "bg-blue-500 text-white rounded-sm text-sm px-4 py-2 border border-white hover:bg-blue-600 hover:cursor-pointer transition-all"
              : "w-full rounded-sm mb-2 h-8 text-xs text-slate-500 border border-slate-500 hover:bg-slate-50"
          )}
        >
          + Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader>
          <DialogTitle className="px-4 pb-4">
            Add a business profile
          </DialogTitle>
          <Separator />
          <div className="px-3 pt-3 max-h-[60vh] ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-[400px] overflow-y-auto p-3"
              >
                <div className="space-y-4 flex flex-col items-end md:max-w-sm">
                  <CustomFormField
                    horizontal={true}
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="legalName"
                    label="Legal Business Name"
                    placeholder="Your Business name"
                  />
                  <CustomFormField
                    horizontal={true}
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="dba"
                    label="DBA"
                    placeholder="Doing Business As"
                  />
                  <CustomFormField
                    horizontal={true}
                    fieldType={FormFieldTypes.INPUT}
                    control={form.control}
                    name="ein"
                    label="EIN"
                    placeholder="12-3456789"
                  />
                  <CustomFormField
                    horizontal={true}
                    fieldType={FormFieldTypes.SELECT}
                    control={form.control}
                    selectOptions={[
                      "CORPORATION",
                      "MULTIPLE LLC",
                      "NON PROFIT",
                      "PARTNERSHIP",
                      "SINGLE LLC",
                      "SOLE PROPRIETORSHIP",
                    ]}
                    name="structure"
                    label="Business Structure"
                    placeholder="LLC, Corporation, etc."
                  />
                </div>

                <Separator className="mt-6" />
                <div className="flex items-center justify-end ">
                  <SubmitButton
                    className="mt-4 shad-primary-btn rounded-sm"
                    isLoading={loading}
                  >
                    Submit
                  </SubmitButton>
                </div>

                {/* <div className="space-y-2 col-span-2">
                  <Label>Profile Type</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue("type", value as "INDIVIDUAL" | "BUSINESS")
                    }
                    defaultValue="BUSINESS"
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BUSINESS" id="BUSINESS" />
                      <Label htmlFor="BUSINESS">BUSINESS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="INDIVIDUAL" id="INDIVIDUAL" />
                      <Label htmlFor="INDIVIDUAL">INDIVIDUAL</Label>
                    </div>
                  </RadioGroup>
                </div> */}

                {/* <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                />
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                />
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="example@email.com"
                />
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone"
                  placeholder="(123) 456-7890"
                />
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="123 Main St, City, State, ZIP"
                /> */}

                {/* {profileType === "INDIVIDUAL" && (
                  <>
                    <CustomFormField
                      fieldType={FormFieldTypes.INPUT}
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="123-45-6789"
                    />
                    <CustomFormField
                      fieldType={FormFieldTypes.INPUT}
                      control={form.control}
                      name="dob"
                      label="Date of Birth"
                      placeholder="MM/DD/YYYY"
                    />
                  </>
                )} */}
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientProfileForm;
