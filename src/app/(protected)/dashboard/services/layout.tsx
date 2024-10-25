import { clientServiceNavbar } from "@/constants";
import ServiceNavbar from "./_components/ServiceNavBar";

type ServiceLayoutProps = {
  children: React.ReactNode;
};

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <div className="w-full">
      <ServiceNavbar menuItem={clientServiceNavbar} />
      {children}
    </div>
  );
}
