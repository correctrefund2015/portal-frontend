"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ links, otherLinks }: { links: any; otherLinks: any }) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <nav className="flex flex-col">
        {links.map((item: any, index: number) => {
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
        <Link href={otherLinks.helpAndSupport.route} className="sidebar-link">
          <span className="img-wrap">
            <Image
              src={otherLinks.helpAndSupport.imgURL}
              height={24}
              width={24}
              alt={otherLinks.helpAndSupport.label}
              quality={100}
            />
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
