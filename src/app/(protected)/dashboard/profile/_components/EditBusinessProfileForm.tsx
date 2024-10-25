"use client";
import CustomDialogForm from "@/components/shared/CustomDialogForm";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import { DependentFormData } from "@/schemas/individual-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { parsedJSON } from "@/utils/helpers/methods";
import {
  BusinessProfileFormData,
  businessProfileSchema,
} from "@/schemas/business-client";
import { editBusinessProfileAction } from "../_actions/edit-business-profile";
import { BusinessProfile } from "@prisma/client";

type Props = {
  profile: BusinessProfile;
};

const EditBusinessProfileForm = ({ profile }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      legalName: profile.legalName!,
      dba: profile.dba!,
      structure: profile?.structure?.replaceAll("_", " ") || "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: DependentFormData) => {
    try {
      setLoading(true);

      // const serialized = {
      //   ...data,
      //   dob: data.dob?.toISOString(),
      // };

      const parsed = parsedJSON(data);

      const result = await editBusinessProfileAction(parsed, profile?.id!);

      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description: "Your profile has been updated successfully.",
        });

        router.refresh();
        setLoading(false);

        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <CustomDialogForm
      title={`Edit business profile`}
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      open={open}
      setOpen={setOpen}
    >
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
      {/* <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="ein"
        label="EIN"
        placeholder="12-3456789"
      /> */}
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
    </CustomDialogForm>
  );
};

export default EditBusinessProfileForm;
