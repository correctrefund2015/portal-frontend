import { adminSidebarLinks, otherLinks, sidebarLinks } from "@/constants";
import Sidebar from "./_components/layout/Sidebar";
import Topbar from "./_components/layout/Topbar";
import { ProtectedRoute } from "@/app/(auth)/_components/ProtectedRoute";

type ClientDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function ClientDashboardLayout({
  children,
}: ClientDashboardLayoutProps) {
  return (
    // <ProtectedRoute>
    <div className="h-screen w-full">
      <Topbar pageTitle="Dashboard" searchString="" />
      <div className="flex dashboard-wrapper bg-slate-50">
        <Sidebar links={sidebarLinks} otherLinks={otherLinks} />
        {children}
      </div>
    </div>
    // </ProtectedRoute>
  );
}
