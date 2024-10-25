"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Pencil, Plus } from "lucide-react";
import { Form } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import SubmitButton from "./SubmitButton";

interface CustomDialogFormProps {
  triggerText?: string;
  loading?: boolean;
  title: string;
  children: ReactNode;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomDialogForm: React.FC<CustomDialogFormProps> = ({
  form,
  onSubmit,
  loading,
  title,
  children,
  open,
  setOpen,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await form.trigger();
    const data = form.getValues();
    // console.log("submit ==", data);
    onSubmit(data);
    // setOpen(false); // Close the dialog after successful submission
  };

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        {title.includes("Add") ? (
          <Plus className="size-4 text-slate-600 cursor-pointer" />
        ) : (
          <Pencil className="size-4 text-slate-600 cursor-pointer" />
        )}
      </DialogTrigger>
      <DialogContent className="px-0 flex flex-col max-h-[80vh] pb-0">
        <DialogHeader>
          <DialogTitle className="px-4 pb-4">{title}</DialogTitle>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-grow overflow-hidden"
          >
            <div className="md:max-w-md px-3 pt-3 pb-6 flex-grow overflow-y-auto">
              {children}
            </div>
            <Separator />
            <DialogFooter className="p-3">
              <div className="flex items-center justify-end ">
                <SubmitButton
                  type="submit"
                  className="mt-4 shad-primary-btn rounded-sm"
                  isLoading={loading!}
                >
                  Submit
                </SubmitButton>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogForm;
