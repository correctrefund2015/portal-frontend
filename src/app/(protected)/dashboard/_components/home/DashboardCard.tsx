import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import CardItemList from "./CardItemList";
import { cardItemList } from "@/constants";

const DashboardCard = ({
  type,
  heading,
  description,
  buttonText,
  buttonLink,
  itemList,
  imgURL,
  className,
}: DashboardCardProps) => {
  if (type === "welcome") {
    return (
      <Card className="w-full rounded-sm">
        <CardContent className={cn("min-h-[132px] relative ", className)}>
          <Image
            src={imgURL!}
            height={144}
            width={114}
            alt="chevron right"
            quality={100}
            className="absolute -top-7"
          />
          <div className="wrapper ml-32">
            <h4 className="text-base font-semibold text-slate-800 ">
              {heading}
              <Image
                src="/images/hello.png"
                height={20}
                width={20}
                alt="chevron right"
                quality={100}
                className="inline-block"
              />
            </h4>
            <p className="text-xs font-medium text-slate-500">{description}</p>
            <Link
              href="/"
              className="mt-12 flex items-center text-xs font-medium text-blue-500"
            >
              {buttonText}
              <Image
                src="/icons/chevronRight.svg"
                height={16}
                width={16}
                alt="chevron right"
                quality={100}
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (type === "basic") {
    return (
      <Card className="w-full rounded-sm">
        <CardContent
          className={cn("min-h-[132px] rounded-sm bg-no-repeat", className)}
          style={{
            backgroundImage: `url(${imgURL})`,
            backgroundPosition: "96% 10%",
          }}
        >
          <div className="wrapper max-w-[220px]">
            <h4 className="text-base font-semibold text-slate-800 ">
              {heading}
            </h4>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {description}
            </p>
            <Link
              href="/"
              className="mt-7 flex items-center text-xs font-medium text-blue-500"
            >
              {buttonText}
              <Image
                src="/icons/chevronRight.svg"
                height={16}
                width={16}
                alt="chevron right"
                quality={100}
              />
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (type === "cardwithlist") {
    return (
      <Card className="w-full rounded-sm">
        <CardHeader className="border-b-[1px] border-slate-200 px-6 py-3">
          <CardTitle className="flex justify-between">
            <p className="text-sm text-slate-700">{heading}</p>
            <Link className="text-sm text-blue-500" href={buttonLink}>
              {buttonText}
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-0">
          {cardItemList.map((item, i) => (
            <CardItemList
              key={i}
              title={item.title}
              description={item.description}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </CardContent>
      </Card>
    );
  }
};

export default DashboardCard;
