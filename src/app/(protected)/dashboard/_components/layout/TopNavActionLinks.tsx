import Image from "next/image";
import { topBarLinks } from "@/constants";
import { Button } from "@/components/ui/button";

const TopNavActionLinks = () => {
  return (
    <div className="flex gap-4">
      {topBarLinks.map((item, index) => (
        <Button key={index} className="p-0 bg-transparent">
          <Image
            src={item.imgURL}
            height={24}
            width={24}
            alt={item.imgURL}
            quality={100}
          />
        </Button>
      ))}
    </div>
  );
};

export default TopNavActionLinks;
