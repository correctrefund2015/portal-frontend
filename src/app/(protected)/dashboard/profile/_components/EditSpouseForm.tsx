"use client";
import CustomDialogForm from "@/components/shared/CustomDialogForm";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import { SpouseFormData, spouseSchema } from "@/schemas/individual-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { addSpouseAction, editSpouseAction } from "../_actions/edit-spouse";
import { parsedJSON } from "@/utils/helpers/methods";

type Props = {
  spouse?: Spouse;
  isNew: boolean;
  profileId: string;
};

const EditSpouseForm = ({ spouse, profileId, isNew }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SpouseFormData>({
    resolver: zodResolver(spouseSchema),
    defaultValues: {
      firstName: spouse?.firstName,
      lastName: spouse?.lastName,
      phone: spouse?.phone,
      ssn: spouse?.ssn,
      dob: spouse?.dob,
      email: spouse?.email,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SpouseFormData) => {
    try {
      setLoading(true);

      const serialized = {
        ...data,
        dob: data.dob?.toISOString(),
      };

      const parsed = parsedJSON(serialized);

      let result: any;

      if (isNew) {
        result = await addSpouseAction(parsed, profileId);
      } else {
        result = await editSpouseAction(parsed, spouse?.id!);
      }

      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description: "Your spouse information has been updated successfully.",
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
      title={`${isNew ? "Add" : "Edit"} spouse`}
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
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="jane@smith.com"
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
    </CustomDialogForm>
  );
};

export default EditSpouseForm;
