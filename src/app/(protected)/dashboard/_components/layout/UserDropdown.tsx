import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser } from "@/lib/session";
import { getClientProfilesRequest } from "@/lib/data/client.api";
import AccountDropdown from "../sections/AccountDropdown";
import { getClientProfilesFromDb } from "@/lib/queries/client.query";

const UserDropdown = async () => {
  const user = await getUser();
  // console.log(user);
  // const clientProfiles: IClientProfile[] = await getClientProfilesRequest(
  //   user?.client.id!
  // );
  const client = await getClientProfilesFromDb(user?.client.id!);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="client-info-box flex text-left bg-transparent hover:bg-transparent px-0">
          <div className="user-wrapper flex">
            <div>
              <div className="rounded-full size-9 bg-orange-500 text-white text-center grid place-items-center">
                {Array.from(user?.firstName!)[0]}
              </div>
              {/* <Image
                src={user?.imageUrl!}
                height={40}
                width={40}
                alt="Plus Icon"
                quality={100}
                className="rounded-full"
              /> */}
            </div>
            <div className="client-info ml-2 flex flex-col md:block hidden">
              <h6 className="text-sm font-semibold">
                {user?.firstName + " " + user?.lastName}
              </h6>

              <span className="text-xs font-medium text-slate-400">
                {client?.individualProfile && client?.individualProfile
                  ? "Personal"
                  : "Business" || ""}
              </span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {<AccountDropdown client={client} />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
