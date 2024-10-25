"use client";
import CustomDialogForm from "@/components/shared/CustomDialogForm";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import { ProfileFormData, profileSchema } from "@/schemas/individual-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { editIndividualProfileAction } from "../_actions/edit-profile";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { parsedJSON } from "@/utils/helpers/methods";

type Props = {
  profile: IndividualProfile;
  type: string;
};

const EditProfileForm = ({ profile, type }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      ssn: profile?.ssn,
      dob: profile.dob,
      address: profile.address,
      maritalStatus: profile.maritalStatus,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const serialized = {
        ...data,
        dob: data.dob?.toISOString(),
      };

      const parsed = parsedJSON(serialized);

      const result = await editIndividualProfileAction(
        parsed,
        profile.id,
        type
      );
      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description: "Your  profile has been updated successfully.",
        });

        router.refresh();
        setOpen(false);
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDialogForm
      title="Edit profile"
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
        name="firstName"
        label="First name"
        placeholder="Jane"
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="lastName"
        label="Last name"
        placeholder="Doe"
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Mobile Number"
        placeholder="(555) 123-4567"
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="address"
        label="Address"
        placeholder="123 Main street, MA"
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="ssn"
        label="Social Security Number"
        placeholder="xxx-xx-xxx"
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.DATE_PICKER}
        control={form.control}
        name="dob"
        label="Date of birth"
        placeholder="MM/DD/YYYY"
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.SELECT}
        selectOptions={["SINGLE", "MARRIED", "WIDOW"]}
        control={form.control}
        name="maritalStatus"
        label="Filling Status"
        placeholder="Single, married, ..."
      />
    </CustomDialogForm>
  );
};

export default EditProfileForm;
