import { getUser } from "@/lib/session";
import { getServiceStatsPerClient } from "@/lib/data/service-request.api";
import Image from "next/image";
import Link from "next/link";
import { getServiceStatsPerClientQuery } from "@/lib/queries/service.query";

// const getStats = async (clientId: string) => {
//   return await getServiceStatsPerClient(clientId);
// };
const StatusCard = async () => {
  const user = await getUser();
  let stats: any[] = [{ count: 0 }, { count: 0 }, { count: 0 }];
  if (user?.client.id) {
    stats = await getServiceStatsPerClientQuery(user?.client.id!);
  }

  return (
    <div className="w-full bg-slate-200 shadow-sm border-[0.8px] rounded-sm ">
      <div className="bg-white p-6 shadow-sm rounded-sm">
        <div className="card-header mb-6">
          <h1 className="text-lg font-semibold text-slate-700">
            Service and Document Overview
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Stay updated with your service progress and manage your
            <br />
            documents efficiently.
          </p>
        </div>
        <div className="card-status flex gap-8 flex-wrap">
          <div className="flex items-center ">
            <span className="bg-blue-100 text-blue-500 h-10 w-14 rounded-sm text-xl font-semibold mr-4 text-center leading-10">
              {stats[0]?.count || 0}
            </span>
            <h4 className="text-nowrap font-semibold text-slate-700">
              Pending Services
            </h4>
          </div>
          <div className="flex items-center ">
            <span className="bg-green-100 text-green-500 h-10 w-14 rounded-sm text-xl font-semibold mr-4 text-center leading-10">
              {stats[1]?.count || 0}
            </span>
            <h4 className="text-nowrap font-semibold text-slate-700">
              Completed Services
            </h4>
          </div>
          <div className="flex items-center basis-full">
            <span className="bg-yellow-100 text-yellow-500 h-10 w-14 rounded-sm text-xl font-semibold mr-4 text-center leading-10">
              {stats[2]?.count || 0}
            </span>
            <h4 className="text-nowrap font-semibold text-slate-700">
              Ongoing Services
            </h4>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Link href="" className="shad-primary-btn ">
          <Image
            src="/icons/plus-white.svg"
            height={16}
            width={16}
            alt="plus"
            quality={100}
            className="inline-block mr-1"
          />
          Upload Documents
        </Link>
        <Link href="" className="shad-secondary-btn ml-2">
          View Documents
        </Link>
      </div>
    </div>
  );
};

export default StatusCard;
