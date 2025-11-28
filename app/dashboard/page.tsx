import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/server";
import { SectionCards } from "@/components/section-cards";
import { SpendingAreaChart } from "@/components/spending-area-chart";
import {
  getDashboardStats,
  getExpenses,
  getExpensesByCategory,
} from "@/lib/actions";
import { ChartPieLPieabelList } from "@/components/PieChart";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const expenses = await getExpenses(user.id);
  const cardData = await getDashboardStats(user.id);
  const categoryData = await getExpensesByCategory(user.id); // Server Action returning [{ category, total }]

  // Define chartConfig dynamically based on categories
  const chartConfig = Object.fromEntries(
    categoryData.map((c, idx) => [
      c.category,
      { label: c.category, color: `var(--chart-${(idx % 8) + 1})` },
    ])
  );

  return (
    <div className="w-full h-lvh flex flex-col gap-6 p-4 justify-center items-center">
      <h1 className="text-start mb-6 font-bold text-2xl">
        Welcome back, User!
      </h1>

      <div className="w-full">{cardData && <SectionCards {...cardData} />}</div>

      {/* Charts side by side */}
      <div className="w-full">
        {" "}
        <SpendingAreaChart expenses={expenses} />
      </div>
      <div className="w-full">
        {" "}
        <ChartPieLPieabelList
          data={categoryData}
          chartConfig={chartConfig}
          title="Spending by Category"
          description="This month"
        />
      </div>
    </div>
  );
}
