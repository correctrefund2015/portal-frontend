import Image from "next/image";
import React from "react";

const DocUploadStatus = () => {
  return (
    <div className="py-4 px-4 bg-slate-100 rounded-sm shadow-sm border mt-4">
      <span className="uppercase text-slate-500 mb-4 text-sm font-medium block">
        Document Types
      </span>
      <ul>
        <li className="flex gap-2 mb-2">
          <Image src="/icons/CheckCircle.svg" height={20} width={20} alt="" />
          <p className="text-sm text-slate-600 font-medium">
            IRS Documents has been uploaded.
          </p>
        </li>
        <li className="flex gap-2 mb-2">
          <Image src="/icons/CheckCircle.svg" height={20} width={20} alt="" />
          <p className="text-sm text-slate-600 font-medium">
            IRS Documents has been uploaded.
          </p>
        </li>
        <li className="flex gap-2">
          <Image src="/icons/CheckCircle.svg" height={20} width={20} alt="" />
          <p className="text-sm text-slate-600 font-medium">
            IRS Documents has been uploaded.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default DocUploadStatus;
