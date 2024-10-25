import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={cn("status-badge", {
        "bg-green-100": status === "approved",
        "bg-blue-100": status === "pending",
        "bg-red-100": status === "rejected",
        "bg-yellow-100": status === "in review",
      })}
    >
      <p
        className={cn("capitalize", {
          "text-green-500": status === "approved",
          "text-blue-500": status === "pending",
          "text-red-500": status === "rejected",
          "text-yellow-500": status === "in review",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
