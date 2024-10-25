import Status from "@/components/shared/Status";
import { servicesDetails } from "@/constants/services";
import Image from "next/image";
import Link from "next/link";
import { formattedTimestamp } from "@/utils/helpers";
import SelectNewService from "./SelectNewService";
import { getUser } from "@/lib/session";
import { getClientProfilesFromDb } from "@/lib/queries/client.query";

type Props = {
  name: string;
  type: string;
  clientType?: string;
  serviceRequest?: any;
};

const ServiceCard = async ({
  type,
  name,
  clientType,
  serviceRequest,
}: Props) => {
  const user = await getUser();

  const client = await getClientProfilesFromDb(user?.client.id!);

  const serviceDetail = servicesDetails.find((s) => s.name === name);
  if (type === "companyService") {
    return (
      <div className="company-service-card">
        <div className="flex items-center gap-2">
          <Image
            src={serviceDetail?.icon!}
            height={48}
            width={48}
            alt=""
            quality={100}
          />
          <h2 className="text-lg font-semibold text-slate-800">{name}</h2>
        </div>
        <span className="block text-slate-400 mb-3 truncate">
          {clientType === "BUSINESS"
            ? serviceDetail?.business
            : serviceDetail?.individual}
        </span>
        <SelectNewService service={serviceDetail!} client={client!} />
      </div>
    );
  }
  if (type === "myService") {
    return (
      <div className="shadow-sm bg-slate-100 rounded-sm">
        <div className="shadow-sm bg-white p-6 rounded-sm">
          <div className="flex justify-between items-start">
            <div className="bg-blue-50 rounded-full p-2 mb-2">
              <Image
                src={serviceDetail?.icon!}
                height={32}
                width={32}
                alt=""
                quality={100}
              />
            </div>
            <Status text="pending" className="bg-blue-50 text-blue-500" />
          </div>
          <h2 className="text-lg font-semibold mb-1">{name}</h2>
          <span className="text-sm text-slate-400 block mb-4 truncate">
            {clientType === "BUSINESS"
              ? serviceDetail?.business
              : serviceDetail?.individual}
          </span>
          <ul>
            <li className="flex mb-3">
              <Image
                src="/icons/progress-clock.svg"
                height={18}
                width={18}
                alt=""
                quality={100}
              />
              <span className="text-sm text-slate-500 block ml-2">
                Collecting your documents
              </span>
            </li>
            <li className="flex">
              <Image
                src="/icons/pencil-ol.svg"
                height={18}
                width={18}
                alt=""
                quality={100}
              />
              <span className="text-sm text-slate-500 block ml-2">
                {formattedTimestamp(serviceRequest?.createdAt!)}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex justify-between px-2 py-2">
          <Link
            href="#"
            className="px-3 py-2 bg-transparent text-slate-400 text-sm font-semibold rounded-sm hover:bg-slate-200"
          >
            Cancel Service
          </Link>
          <Link
            href={`/dashboard/services/${serviceRequest?.id}/documents`}
            className="px-3 py-2 bg-blue-100 text-blue-500 text-sm font-semibold rounded-sm hover:bg-blue-200"
          >
            Manage Docs
          </Link>
        </div>
      </div>
    );
  }
};

export default ServiceCard;
