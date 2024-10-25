"use client";
import CustomDialogForm from "@/components/shared/CustomDialogForm";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import {
  DependentFormData,
  dependentSchema,
} from "@/schemas/individual-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  addDependentAction,
  editDependentAction,
} from "../_actions/edit-dependent";
import { parsedJSON } from "@/utils/helpers/methods";

type Props = {
  dependent?: Dependent;
  isNew: boolean;
  profileId: string;
};

const EditDependentForm = ({ dependent, profileId, isNew }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<DependentFormData>({
    resolver: zodResolver(dependentSchema),
    defaultValues: {
      firstName: dependent?.firstName,
      lastName: dependent?.lastName,
      phone: dependent?.phone,
      ssn: dependent?.ssn,
      dob: dependent?.dob,
      relationship: dependent?.relationship,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: DependentFormData) => {
    try {
      setLoading(true);

      const serialized = {
        ...data,
        dob: data.dob?.toISOString(),
      };

      const parsed = parsedJSON(serialized);

      let result: any;

      if (isNew) {
        result = await addDependentAction(parsed, profileId);
      } else {
        result = await editDependentAction(parsed, dependent?.id!);
      }

      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description: "Your dependent has been updated successfully.",
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
      title={`${isNew ? "Add" : "Edit"} dependent`}
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
        selectOptions={["CHILD", "STEP CHILD"]}
        control={form.control}
        name="relationship"
        label="Relationship"
        placeholder="Child, Step child..."
      />
    </CustomDialogForm>
  );
};

export default EditDependentForm;
