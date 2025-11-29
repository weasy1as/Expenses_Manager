"use server";

import { createClient } from "@/lib/server";
import * as XLSX from "xlsx";

export async function categorizeExpenseWithOpenAI(row: any) {
  const text = `
Name: ${row.Navn || ""}
Description: ${row.Beskrivelse || ""}
Amount: ${row.Beløb || 0}
`;

  const prompt = `
You are a financial assistant. Given the following expense details, assign it to one of these categories: Grocery, Transport, Entertainment, Bills/Utilities, Subscriptions, Income, Transfer,savings, Others.
Return only the category name.

Expense:
${text}
`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    }),
  });

  const data = await openaiRes.json();

  const rawCategory = data?.choices?.[0]?.message?.content || "";
  const category =
    rawCategory
      .replace(/^Category:\s*/i, "") // Remove "Category:" if present
      .trim() || // Remove extra whitespace
    "Others";

  return category;
}

export async function uploadExpenses(file: File, userId: string) {
  if (!file) throw new Error("No file provided");
  if (!userId) throw new Error("User not authenticated");

  // Read file
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  // Convert DD-MM-YYYY → JS Date
  const parseDate = (raw: any) => {
    if (!raw) return null;

    // Case 1: Excel gives a JS Date object
    if (raw instanceof Date) return raw;

    // Case 2: Excel numeric date code (e.g. 45678)
    if (typeof raw === "number") {
      return XLSX.SSF.parse_date_code(raw)
        ? new Date(
            XLSX.SSF.parse_date_code(raw).y,
            XLSX.SSF.parse_date_code(raw).m - 1,
            XLSX.SSF.parse_date_code(raw).d
          )
        : null;
    }

    // Case 3: String date in DD-MM-YYYY
    if (typeof raw === "string") {
      const parts = raw.split("-");
      if (parts.length === 3) {
        const [d, m, y] = parts;
        return new Date(`${y}-${m}-${d}`);
      }
    }

    return null;
  };

  const expenses = await Promise.all(
    rows.map(async (row) => ({
      user_id: userId,
      booking_date: parseDate(row["Bogføringsdato"]),
      amount: row["Beløb"] || 0,
      sender: row["Afsender"] || "",
      receiver: row["Modtager"] || "",
      name: row["Navn"] || "",
      description: row["Beskrivelse"] || "",
      balance: row["Saldo"] || 0,
      currency: row["Valuta"] || "DKK",
      reconciled: row["Afstemt"]?.toString().toLowerCase() === "ja",
      category: await categorizeExpenseWithOpenAI(row),
    }))
  );

  // Filter out invalid rows (missing date)
  const valid = expenses.filter((e) => e.booking_date !== null);

  if (valid.length === 0) {
    throw new Error("No valid expense rows found (missing booking dates)");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("expenses").insert(valid);

  if (error) throw error;

  return data;
}

export async function getExpenses(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("booking_date", { ascending: true });

  if (error) {
    console.error("Error loading expenses:", error);
    return [];
  }

  return data;
}

export async function getDashboardStats(userId: string) {
  if (!userId) throw new Error("User not authenticated");

  const supabase = await createClient();

  // Fetch expenses for the user
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  // Compute stats
  const totalSpentThisMonth = expenses
    .filter((e) => {
      const date = new Date(e.booking_date);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const numberOfTransactions = expenses.length;

  const biggestExpenseRaw = expenses.reduce(
    (max, e) => (e.amount < max.amount ? e : max),
    { amount: 0 }
  );

  const biggestExpense = {
    ...biggestExpenseRaw,
    amount: Math.abs(biggestExpenseRaw.amount), // convert to positive
  };

  const merchantCounts: Record<string, number> = {};
  expenses.forEach((e) => {
    merchantCounts[e.name] = (merchantCounts[e.name] || 0) + 1;
  });
  const mostFrequentMerchant = Object.entries(merchantCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return {
    totalSpentThisMonth,
    numberOfTransactions,
    biggestExpense,
    mostFrequentMerchant: mostFrequentMerchant ? mostFrequentMerchant[0] : "",
  };
}

export async function getExpensesByCategory(userId: string) {
  if (!userId) throw new Error("User not authenticated");

  const supabase = await createClient();

  // Fetch user's expenses
  const { data, error } = await supabase
    .from("expenses")
    .select("category, amount")
    .eq("user_id", userId);

  if (error) throw error;

  // Aggregate totals per category
  const categoryTotals: Record<string, number> = {};
  data.forEach((row) => {
    const cat = row.category || "Others";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + row.amount;
  });

  // Convert to array for easier rendering
  const result = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total,
  }));

  console.log(result);

  return result;
}
