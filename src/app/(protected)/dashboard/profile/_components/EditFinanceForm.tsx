"use client";
import CustomDialogForm from "@/components/shared/CustomDialogForm";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import { FinanceFormData, financeSchema } from "@/schemas/individual-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { addFinanceAction, editFinanceAction } from "../_actions/edit-finance";

type Props = {
  finance?: Finance;
  isNew: boolean;
  profileId: string;
};

const EditFinanceForm = ({ finance, profileId, isNew }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<FinanceFormData>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      incomeType: finance?.incomeType,
      amount: finance?.amount,
      taxFillingStatus: finance?.taxFillingStatus,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FinanceFormData) => {
    try {
      setLoading(true);

      // console.log(data.amount);

      if (data.amount) {
        data.amount = Number(data.amount);
      }

      let result: any;

      if (isNew) {
        result = await addFinanceAction(data, profileId);
      } else {
        result = await editFinanceAction(data, finance?.id!);
      }

      if (result.status === 201) {
        toast({
          title: "Congratutations !!!",
          description:
            "Your financial informations has been updated successfully.",
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
      title={`${isNew ? "Add" : "Edit"} financial information`}
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      open={open}
      setOpen={setOpen}
    >
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.SELECT}
        selectOptions={[
          "Salary",
          "Investment",
          "Business Income",
          "Retirement",
        ]}
        control={form.control}
        name="incomeType"
        label="Income Source"
        placeholder="Salary, investiment, ..."
      />
      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="taxFillingStatus"
        label="Tax Filling Status"
        placeholder="Married Filling Jointly"
      />

      <CustomFormField
        horizontal={true}
        fieldType={FormFieldTypes.INPUT}
        control={form.control}
        name="amount"
        label="Estimated Annual Income"
        placeholder="10000"
      />
    </CustomDialogForm>
  );
};

export default EditFinanceForm;
