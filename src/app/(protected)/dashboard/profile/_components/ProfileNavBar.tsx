"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileNavbar = ({ menuItem, align }: { menuItem: any; align?: any }) => {
  const pathname = usePathname();

  return (
    <div
      className=" bg-white border-b-[1px] border-b-slate-200 px-8
            "
    >
      <div
        className={cn("flex gap-2 sm:gap-8", {
          "justify-center": align && align === "center",
        })}
      >
        {menuItem.map((item: any) => {
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("py-4 tab-link ", {
                active: pathname === item.route,
              })}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileNavbar;
