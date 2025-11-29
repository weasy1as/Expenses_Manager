"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CategoryCountData {
  category: string;
  count: number;
}

interface ChartBarMixedProps {
  data: CategoryCountData[];
  chartConfig?: ChartConfig;
  title?: string;
  description?: string;
}

export function ChartBarMixed({
  data,
  chartConfig,
  title = "Transactions per Category",
  description = "Number of transactions per category",
}: ChartBarMixedProps) {
  // Generate chartConfig if not provided
  const config =
    chartConfig ||
    Object.fromEntries(
      data.map((d, idx) => [
        d.category,
        { label: d.category, color: `var(--chart-${(idx % 8) + 1})` },
      ])
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 30 }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => config[value]?.label || value}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              radius={5}
              // Apply color per bar
            >
              {data.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={config[entry.category]?.color || "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
