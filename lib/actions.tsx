"use server";

import { createClient } from "@/lib/server";
import * as XLSX from "xlsx";

export async function uploadExpenses(file: File, userId: string | undefined) {
  if (!file) throw new Error("No file provided");
  if (!userId) throw new Error("User not authenticated");

  // Read file
  const fileData = await file.arrayBuffer();

  // Parse Excel
  const workbook = XLSX.read(fileData, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  // Map to DB schema, ignoring 'Afsender' and 'Modtager'
  const expenses = jsonData.map((row) => {
    // Convert string numbers with comma to float
    const parseNumber = (val: string | number) => {
      if (typeof val === "number") return val;
      if (typeof val === "string") return parseFloat(val.replace(",", "."));
      return 0;
    };

    return {
      user_id: userId,
      booking_date: row["Bogføringsdato"]
        ? new Date(row["Bogføringsdato"])
        : null,
      amount: row["Beløb"] ? parseNumber(row["Beløb"]) : 0,
      name: row["Navn"] || "",
      description: row["Beskrivelse"] || "",
      balance: row["Saldo"] ? parseNumber(row["Saldo"]) : 0,
      currency: row["Valuta"] || "DKK",
      reconciled:
        row["Afstemt"]?.toString().toLowerCase() === "ja" ? true : false,
    };
  });

  // Filter invalid rows
  const validExpenses = expenses.filter(
    (e) => e.booking_date && !isNaN(e.amount)
  );

  if (validExpenses.length === 0) {
    throw new Error("No valid rows found in the Excel file");
  }

  // Insert into Supabase
  const supabase = await createClient();
  const { data, error } = await supabase.from("expenses").insert(validExpenses);

  if (error) throw error;

  return data;
}
