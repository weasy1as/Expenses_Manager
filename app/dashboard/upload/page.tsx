// app/dashboard/upload/page.tsx
import React from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { createClient } from "@/lib/server";

export default async function UploadExpensesPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col w-full min-h-screen p-6 md:p-10 bg-muted/50">
      <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
        Upload New Expenses
      </h1>

      <p className="mb-2 text-muted-foreground max-w-2xl text-center md:text-left">
        Easily add multiple expenses at once by uploading an Excel file. Make
        sure your file includes the following columns:
      </p>

      <ul className="list-disc list-inside mb-4 text-muted-foreground max-w-2xl text-center md:text-left">
        <li>Bogføringsdato (Booking date)</li>
        <li>Beløb (Amount)</li>
        <li>Navn (Merchant / Name)</li>
        <li>Beskrivelse (Description)</li>
        <li>Saldo (Balance)</li>
        <li>Valuta (Currency)</li>
        <li>Afstemt (Reconciled: yes/no)</li>
      </ul>

      <p className="mb-6 text-muted-foreground max-w-2xl text-center md:text-left">
        After uploading, you will be able to preview the imported expenses
        before saving them to your account.
      </p>

      <div className="w-full max-w-lg mx-auto">
        <AddExpenseForm userId={data?.user?.id} />
      </div>
    </div>
  );
}
