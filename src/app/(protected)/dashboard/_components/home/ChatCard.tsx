import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ChatCard = ({
  heading,
  buttonText,
  buttonLink,
  chatList,
}: ChatCardProps) => {
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
        {chatList.map((item, i) => (
          <div key={i}></div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChatCard;
