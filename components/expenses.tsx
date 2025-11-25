"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Expense {
  id: string;
  booking_date: string; // YYYY-MM-DD string
  amount: number;
  name: string;
  description: string;
  balance: number;
  currency: string;
  reconciled: boolean;
}

interface ExpensesProps {
  expenses: Expense[];
}

const Expenses = ({ expenses }: ExpensesProps) => {
  return (
    <Card className="w-full overflow-y-scroll max-h-[700px]">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table className="w-full">
          <TableCaption className="text-left px-4 py-2 text-muted-foreground">
            Dine seneste transaktioner.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Bogføringsdato</TableHead>
              <TableHead>Beløb</TableHead>
              <TableHead>Navn</TableHead>
              <TableHead>Beskrivelse</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Valuta</TableHead>
              <TableHead>Afstemt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((t, index) => (
              <TableRow
                key={t.id}
                className={index % 2 === 0 ? "bg-muted/10" : "bg-background"}
              >
                <TableCell>{t.booking_date}</TableCell>
                <TableCell
                  className={
                    t.amount < 0 ? "text-destructive" : "text-green-600"
                  }
                >
                  {t.amount} DKK
                </TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.balance}</TableCell>
                <TableCell>{t.currency}</TableCell>
                <TableCell>
                  <Badge variant={t.reconciled ? "default" : "outline"}>
                    {t.reconciled ? "Ja" : "Nej"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default Expenses;
