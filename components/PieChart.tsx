"use client";

import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label list";

interface CategoryChartData {
  category: string;
  total: number;
  fill?: string;
}

interface PieLabelListProps {
  data: CategoryChartData[];
  chartConfig: ChartConfig;
  title?: string;
  description?: string;
}

export function ChartPieLabelList({
  data,
  chartConfig,
  title = "Pie Chart",
  description = "",
}: PieLabelListProps) {
  const chartData = data.map((d) => ({ ...d, totalAbs: Math.abs(d.total) }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" hideLabel />}
            />
            <Pie data={chartData} dataKey="totalAbs" nameKey="category">
              {chartData.map((entry) => (
                <Cell
                  key={entry.category}
                  fill={chartConfig[entry.category]?.color || "#8884d8"}
                />
              ))}
              <LabelList dataKey="category" />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total per category
        </div>
      </CardFooter>
    </Card>
  );
}
