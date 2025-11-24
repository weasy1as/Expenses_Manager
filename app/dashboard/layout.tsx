import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-200/60 min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6">{children}</main>
      </SidebarProvider>
    </div>
  );
}
