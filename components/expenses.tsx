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

const invoices = [
  {
    date: "20-11-2025",
    amount: -5,
    name: "REMA1000 ODENSE",
    description: "REMA1000 ODENSE",
    balance: "17,09",
    currency: "DKK",
    reconciled: false,
  },
  {
    date: "20-11-2025",
    amount: -329.81,
    name: "REMA1000 ODENSE",
    description: "REMA1000 ODENSE",
    balance: "22,09",
    currency: "DKK",
    reconciled: false,
  },

  {
    date: "20-11-2025",
    amount: -5,
    name: "REMA1000 ODENSE",
    description: "REMA1000 ODENSE",
    balance: "17,09",
    currency: "DKK",
    reconciled: false,
  },
  {
    date: "20-11-2025",
    amount: -5,
    name: "REMA1000 ODENSE",
    description: "REMA1000 ODENSE",
    balance: "17,09",
    currency: "DKK",
    reconciled: false,
  },
  {
    date: "20-11-2025",
    amount: -5,
    name: "REMA1000 ODENSE",
    description: "REMA1000 ODENSE",
    balance: "17,09",
    currency: "DKK",
    reconciled: false,
  },
];

const Expenses = () => {
  return (
    <Card className="w-full overflow-x-auto">
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
            {invoices.map((t, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-muted/10" : "bg-background"}
              >
                <TableCell>{t.date}</TableCell>
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
