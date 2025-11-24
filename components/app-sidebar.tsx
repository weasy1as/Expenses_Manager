import {
  FileUp,
  Home,
  ChartNoAxesColumn,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Upload Expenses",
    url: "/dashboard/upload",
    icon: FileUp,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data) {
    redirect("/auth/login");
  }
  console.log(data.claims);
  return (
    <Sidebar className="bg-blue-500 text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 pt-4 pb-6 text-md uppercase tracking-wide">
            Overview
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium tracking-wide text-white hover:bg-white/10 active:bg-white/20 transition-colors duration-200"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.claims} />
      </SidebarFooter>
    </Sidebar>
  );
}
