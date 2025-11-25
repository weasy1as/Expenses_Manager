"use client";

import { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { IconTrendingDown } from "@tabler/icons-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Converts DD-MM-YYYY to JS Date
const parseDate = (raw: string | Date | null) => {
  if (!raw) return null;
  if (raw instanceof Date) return raw;

  // If it's a YYYY-MM-DD string, split and create a Date object
  if (typeof raw === "string") {
    const parts = raw.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }

    // fallback
    return new Date(raw);
  }

  return null;
};

export function SpendingAreaChart({ expenses }) {
  const [range, setRange] = useState("30d");

  const filteredData = useMemo(() => {
    const now = new Date();
    const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;

    return expenses
      .filter((item) => {
        const date = parseDate(item.booking_date);
        if (!date) return false;
        const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= days;
      })
      .map((item) => ({
        date: parseDate(item.booking_date)?.toISOString(), // <--- here
        amount: Math.abs(item.amount),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [range, expenses]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
        <CardDescription>Your spending activity over time</CardDescription>

        <CardAction>
          {/* Desktop Toggle */}
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={setRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">90 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Select */}
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          className="h-[250px] w-full"
          config={{
            amount: {
              label: "Amount",
              color: "hsl(var(--primary))",
            },
          }}
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeOpacity={0.1} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              type="monotone"
              dataKey="amount"
              fill="url(#fillExpense)"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
