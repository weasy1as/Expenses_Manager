import { createClient } from "@/lib/server";
import { getExpensesByCategory } from "@/lib/actions";
import { ChartPieLabelList } from "@/components/PieChart";
import { ChartBarMixed } from "@/components/ChartBarMixed";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Please login</div>;

  const categoryData = await getExpensesByCategory(user.id);

  const expenses = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id);

  // Generate dynamic colors for charts
  const chartConfig = Object.fromEntries(
    categoryData.map((c, idx) => [
      c.category,
      { label: c.category, color: `var(--chart-${(idx % 8) + 1})` },
    ])
  );

  // Prepare transaction count data per category
  const categoryCounts = categoryData.map((c) => {
    const count =
      expenses.data?.filter((e) => e.category === c.category).length || 0;
    return {
      category: c.category,
      count,
    };
  });

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Expenses by Category</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1">
          <ChartPieLabelList
            data={categoryData}
            chartConfig={chartConfig}
            title="Spending by Category"
            description="This month"
          />
        </div>

        {/* Transaction Count Bar Chart */}
        <div className="flex-1">
          <ChartBarMixed
            data={categoryCounts}
            chartConfig={chartConfig}
            title="Transaction Count by Category"
            description="Number of transactions per category"
          />
        </div>
      </div>
    </div>
  );
}
