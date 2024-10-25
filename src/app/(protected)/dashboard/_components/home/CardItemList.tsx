import Image from "next/image";
import Link from "next/link";

const CardItemList = ({
    title,
    description,
    link,
    icon,
}: CardItemListProps) => {
    return (
        <Link
            href={link}
            className="flex hover:bg-slate-100 -mx-[24px] px-6 py-3 border-b-[1px] border-slate-200"
        >
            <Image
                src={icon}
                height={20}
                width={20}
                alt={"file type"}
                quality={100}
            />
            <div className="flex flex-col ml-4">
                <h6 className="text-sm font-medium leading-4 mb-[5px] text-slate-700">
                    {title}
                </h6>
                <span className="text-xs leading-3 font-medium text-slate-400">
                    {description}
                </span>
            </div>
        </Link>
    );
};

export default CardItemList;
