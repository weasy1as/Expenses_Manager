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

interface SectionCardsProps {
  totalSpentThisMonth: number;
  numberOfTransactions: number;
  biggestExpense: { amount: number; name: string; date: string };
  mostFrequentMerchant: string;
}

export function SectionCards({
  totalSpentThisMonth,
  numberOfTransactions,
  biggestExpense,
  mostFrequentMerchant,
}: SectionCardsProps) {
  return (
    <div className="flex gap-3 w-full">
      {/* Total Spent This Month */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Total Spent (This Month)</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-red-600">
            {totalSpentThisMonth.toFixed(2)} DKK
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              <IconTrendingDown className="mr-1" />
              {/* You could calculate % change here */}
              +5.1%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Number of Transactions */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Transactions</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-green-600">
            {numberOfTransactions}
          </CardTitle>
          <CardAction>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <IconTrendingUp className="mr-1" />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Biggest Expense */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Biggest Expense</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-red-600">
            {biggestExpense.amount.toFixed(2)} DKK
          </CardTitle>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="font-medium text-foreground">
              {biggestExpense.name}
            </div>
            <div className="text-muted-foreground">{biggestExpense.date}</div>
          </CardFooter>
        </CardHeader>
      </Card>

      {/* Most Frequent Merchant */}
      <Card className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <CardHeader>
          <CardDescription>Most Frequent Merchant</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums text-blue-600">
            {mostFrequentMerchant}
          </CardTitle>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium text-blue-600">
              Grocery spending trending up <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">Based on past 30 days</div>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
