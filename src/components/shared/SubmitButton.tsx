import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoadingImage from "./LoadingImage";

interface ButtonProps {
  isLoading: boolean;
  className: string;
  type?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  onClick?: () => {};
}

const SubmitButton = ({
  isLoading,
  className,
  type = "submit",
  children,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full rounded-sm"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <LoadingImage />
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
