import React from "react";
import ServiceCard from "./ServiceCard";

import { ServiceRequest } from "@prisma/client";

type Props = {
  services: ServiceRequest[];
};
const MyServicesGrid = async ({ services }: Props) => {
  return (
    <div className="">
      <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {services.map((service) => (
          <div key={service.id}>
            <ServiceCard
              name={service.name}
              serviceRequest={service}
              type="myService"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServicesGrid;
