import Link from "next/link";
import React from "react";
import { getServiceRequestListQuery } from "@/lib/queries/service.query";
import { getServiceRequestPerClient } from "@/lib/data/service-request.api";
import { getUser } from "@/lib/session";
import MyServicesGrid from "../_components/MyServicesGrid";

const ServicePage = async () => {
  const user = await getUser();

  const clientId = user?.client?.id!;
  const services = await getServiceRequestListQuery(clientId);

  // console.log({ services });

  return (
    <div className="mx-8 my-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-medium text-slate-800 text-2xl">My Services</h1>
          <span className="text-sm text-slate-500">
            We are working on this for you
          </span>
        </div>
        <Link
          href="/dashboard/services/"
          className="bg-blue-500 text-white rounded-sm text-sm px-4 py-2 border border-white hover:bg-blue-600 hover:cursor-pointer transition-all "
        >
          Select Service
        </Link>
      </div>

      <MyServicesGrid services={services} />
    </div>
  );
};

export default ServicePage;
