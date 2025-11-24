import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function SectionCards() {
  return (
    <div className="flex gap-3 w-full">
      {/* Total Spent This Month */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Total Spent (This Month)</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-red-600">
            -1,245 DKK
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              <IconTrendingDown className="mr-1" />
              +5.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-red-600">
            Spending increased <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Compared to last month</div>
        </CardFooter>
      </Card>

      {/* Number of Transactions */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Transactions</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-green-600">
            42
          </CardTitle>
          <CardAction>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <IconTrendingUp className="mr-1" />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-green-600">
            More activity <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">vs. previous month</div>
        </CardFooter>
      </Card>

      {/* Biggest Expense */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Biggest Expense</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-red-600">
            -329.81 DKK
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              <IconTrendingDown className="mr-1" />
              High
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground">REMA1000 ODENSE</div>
          <div className="text-muted-foreground">20-11-2025</div>
        </CardFooter>
      </Card>

      {/* Most Frequent Merchant */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Most Frequent Merchant</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-blue-600">
            REMA1000
          </CardTitle>
          <CardAction>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <IconTrendingUp className="mr-1" />
              18 visits
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium text-blue-600">
            Grocery spending trending up <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Based on past 30 days</div>
        </CardFooter>
      </Card>
    </div>
  );
}
