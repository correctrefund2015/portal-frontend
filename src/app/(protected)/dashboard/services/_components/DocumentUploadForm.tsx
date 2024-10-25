"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { useState } from "react";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import CustomFormField, {
  FormFieldTypes,
} from "@/components/shared/CustomFormField";
import FileUploader from "@/components/shared/FileUploader";
import SubmitButton from "@/components/shared/SubmitButton";

const formSchema = z.object({});

type Props = {
  serviceRequestId: string;
};
const DocUploadForm = ({ serviceRequestId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-white p-4 rounded-sm shadow-sm border">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-1"
        >
          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="year"
            label="Year"
            placeholder="Select a year"
          >
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldTypes.SELECT}
            control={form.control}
            name="uploadNewDocuments"
            label="Upload New Documents"
            placeholder="Select a document"
          >
            <SelectItem value="FakeDocumentName">FakeDocumentName</SelectItem>
            <SelectItem value="FakeDocumetnName2">FakeDocumetnName2</SelectItem>
            <SelectItem value="FakeDocumentName3">FakeDocumentName3</SelectItem>
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldTypes.SKELETON}
            control={form.control}
            name="files"
            label="Upload File Here"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          <div className="button-wrapper">
            <SubmitButton
              className="mt-4 shad-primary-btn w-full rounded-sm"
              isLoading={isLoading}
            >
              <Image
                src="/icons/cloud_upload.svg"
                height={24}
                width={24}
                alt=""
                className="mr-2"
              />
              Upload Document
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DocUploadForm;
