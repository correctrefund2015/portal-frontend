import { ServiceDetail, servicesDetails } from "@/constants/services";
import React from "react";
import Link from "next/link";
import ServiceCard from "./_components/ServiceCard";

const ExploreServicesPage = () => {
  return (
    <div className="mx-8 my-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-medium text-slate-800 text-2xl">
            Explore our serivces
          </h1>
          <span className="text-sm text-slate-500">
            Select the Right Service to Meet Your Needs
          </span>
        </div>
        <Link
          href="#"
          className="cr-gradient-bg cr-box-shadow text-white rounded-full px-3 py-1 border border-white hover:shadow-none hover:cursor-pointer transition-all "
        >
          Ask AI to Help
        </Link>
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {servicesDetails.map((service: ServiceDetail, idx: number) => (
          <ServiceCard
            clientType="BUSINESS"
            name={service.name}
            key={idx}
            type="companyService"
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreServicesPage;
