"use client";
import CustomDialogForm from "@/components/shared/CustomDialogForm";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import {
  EmploymentFormData,
  employmentSchema,
} from "@/schemas/individual-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  addEmploymentAction,
  editEmploymentAction,
} from "../_actions/edit-job";
import { parsedJSON } from "@/utils/helpers/methods";

type Props = {
  employment?: Employment;
  isNew: boolean;
  profileId: string;
};

const EditEmploymentForm = ({ employment, profileId, isNew }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<EmploymentFormData>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      jobTitle: employment?.jobTitle,
      employer: employment?.employer,
      address: employment?.address,
      type: employment?.type,
      email: employment?.email,
      phone: employment?.phone,
      startDate: employment?.startDate,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: EmploymentFormData) => {
    try {
      setLoading(true);

      const serialized = {
        ...data,
        startDate: data.startDate?.toISOString(),
      };

      const parsed = parsedJSON(serialized);
      let result: any;

      if (isNew) {
        result = await addEmploymentAction(parsed, profileId);
      } else {
        result = await editEmploymentAction(parsed, employment?.id!);
      }

      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description:
            "Your employment information has been updated successfully.",
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
      title={`${isNew ? "Add" : "Edit"} employment`}
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
        name="employer"
        label="Employer Name"
        placeholder="X corp"
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="jobTitle"
        label="Job Title"
        placeholder="Engineer"
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.SELECT}
        selectOptions={["FULL-TIME", "PART-TIME"]}
        control={form.control}
        name="type"
        label="Employment Type"
        placeholder="Full time, Part time,..."
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="address"
        label="Address"
        placeholder="Employer's address"
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="email"
        label="Employer's Email"
        placeholder="jane@smith.com"
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Employer's Mobile Number"
        placeholder="(555) 123-4567"
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.DATE_PICKER}
        control={form.control}
        name="startDate"
        label="Start Date"
        placeholder="MM/DD/YYYY"
      />
    </CustomDialogForm>
  );
};

export default EditEmploymentForm;
