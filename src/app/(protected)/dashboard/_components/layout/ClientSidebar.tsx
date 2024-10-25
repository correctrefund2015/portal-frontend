"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ClientSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <nav className="flex flex-col">
        {sidebarLinks.map((item, index) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              className={cn("sidebar-link", {
                "nav-active": isActive,
              })}
              key={index}
            >
              <span className="img-wrap">
                <Image
                  src={item.imgURL}
                  height={24}
                  width={24}
                  alt={item.label}
                  quality={100}
                />
              </span>
            </Link>
          );
        })}
      </nav>
      <nav className="help-support">
        <Link href="/help-support" className="sidebar-link">
          <span className="img-wrap">
            <Image
              src="icons/sidebar/help.svg"
              height={24}
              width={24}
              alt="help and support"
              quality={100}
            />
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default ClientSidebar;
