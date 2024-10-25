import Image from "next/image";
import { Input } from "../ui/input";

const Search = ({ searchString }: SearchProps) => {
  return (
    <div className="top-nav-search-wrapper">
      <Image
        src="/icons/search-top-nav.svg"
        height={16}
        width={16}
        alt="Plus Icon"
        quality={100}
      />
      <Input className="top-nav-search w-full md:w-80" placeholder="Search.." />
    </div>
  );
};

export default Search;
