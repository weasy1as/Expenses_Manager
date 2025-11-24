import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/server";
import { SectionCards } from "@/components/section-cards";
import { SpendingAreaChart } from "@/components/spending-area-chart";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full h-lvh flex flex-col gap-6 p-4 justify-center items-center">
      <h1 className="text-start mb-6 font-bold text-2xl">
        Welcome back, User!
      </h1>
      <div className="w-full">
        <SectionCards />
      </div>
      <div className="w-full">
        <SpendingAreaChart />
      </div>
    </div>
  );
}
