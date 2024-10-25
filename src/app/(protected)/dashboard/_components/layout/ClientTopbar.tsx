import Divider from "@/components/shared/Divider";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import TopNavActionLinks from "./TopNavActionLinks";
import UserDropdown from "./UserDropdown";

const ClientTopbar = ({ pageTitle, searchString }: Topbarprops) => {
  return (
    <nav className="topbar flex justify-between bg-slate-950 text-white px-4 py-3 items-center">
      <div className="flex items-center">
        <Link href="/" className="md:block hidden">
          <Image
            src="/logos/logo-white.svg"
            height={36}
            width={105}
            alt="CR logo"
            quality={100}
          />
        </Link>
        <Divider style="md:block hidden" />
        <h3 className="text-base font-medium sm:block hidden">{pageTitle}</h3>
      </div>
      <div className="flex items-center">
        <Search searchString={searchString} />
        <Button className="bg-blue-500 rounded-full ml-3 size-8 p-0 hover:bg-blue-700">
          <Image
            src="/icons/plus-white.svg"
            height={24}
            width={24}
            alt="Plus Icon"
            quality={100}
          />
        </Button>
        <Divider style={undefined} />
        <TopNavActionLinks />
        <Divider style={undefined} />
        <UserDropdown />
      </div>
    </nav>
  );
};

export default ClientTopbar;
