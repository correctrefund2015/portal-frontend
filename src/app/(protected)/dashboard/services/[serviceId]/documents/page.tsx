import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns, UserServiceDocs } from "@/components/shared/table/columns";
import DocUploadForm from "../../_components/DocumentUploadForm";
import DocUploadStatus from "@/components/shared/DocUploadStatus";
import { DataTable } from "@/components/shared/table/DataTable";
import { getServiceRequestById } from "@/lib/data/service-request.api";

type Props = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getData(): Promise<UserServiceDocs[]> {
  return [
    {
      fileIcon: "/icons/files/doc.svg",
      dateAdded: "Novemember 15, 2023",
      names: "Fake file name.docx",
      status: "approved",
      actions: "",
    },
  ];
}

const DocumentListPage = async ({ params }: Props) => {
  const data = await getData();
  const serviceRequest = await getServiceRequestById(params?.serviceId);

  // console.log({ serviceRequest });

  return (
    <div className="flex gap-6 items-start px-7 py-4">
      <div className="w-1/4">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href=""
            className="flex items-center justify-center h-6 w-6 border border-slate-300 rounded-full hover:bg-slate-200"
          >
            <Image
              src="/icons/chevron-left.svg"
              height={12}
              width={12}
              alt=""
            />
          </Link>
          <h2 className="font-semibold text-xl text-slate-800 ">
            {serviceRequest.name}
          </h2>
        </div>
        <div>
          <DocUploadForm serviceRequestId={serviceRequest.id} />
          <DocUploadStatus />
        </div>
      </div>
      <div className="w-3/4">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-xl text-slate-800">Documents</h2>
          <div>
            <Tabs defaultValue="yourDocs">
              <TabsList>
                <TabsTrigger value="yourDocs">Your Documents</TabsTrigger>
                <TabsTrigger value="DocsFromOffice">
                  Documents from Office
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default DocumentListPage;
