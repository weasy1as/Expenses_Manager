import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <Table className="">
      <TableCaption>Dine seneste transaktioner.</TableCaption>
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
          <TableRow key={index}>
            <TableCell>{t.date}</TableCell>
            <TableCell>{t.amount}</TableCell>
            <TableCell>{t.name}</TableCell>
            <TableCell>{t.description}</TableCell>
            <TableCell>{t.balance}</TableCell>
            <TableCell>{t.currency}</TableCell>
            <TableCell>{t.reconciled ? "Ja" : "Nej"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Expenses;
