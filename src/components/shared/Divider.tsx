import { cn } from "@/lib/utils";

const Divider = ({ style = "" }: DividerProps) => {
  return (
    <span
      className={cn("divider block w-[1px] mx-4 bg-slate-600 h-[32px]", style)}
    ></span>
  );
};

export default Divider;
0;
