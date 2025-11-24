"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { uploadExpenses } from "@/lib/actions";

interface Expense {
  date: string;
  amount: number;
  name: string;
  description: string;
  balance: string;
  currency: string;
  reconciled: boolean;
}

export function AddExpenseForm({ userId }: { userId: string | undefined }) {
  const [file, setFile] = useState<File | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    // Optional: parse for preview
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) return;
      // parse sheet for preview
      import("xlsx").then((XLSX) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        });

        const parsedExpenses: Expense[] = jsonData.map((row: any) => ({
          date: row["Bogføringsdato"] || "",
          amount: parseFloat(row["Beløb"]) || 0,
          name: row["Navn"] || "",
          description: row["Beskrivelse"] || "",
          balance: row["Saldo"] || "",
          currency: row["Valuta"] || "DKK",
          reconciled: row["Afstemt"] === "Ja",
        }));

        setExpenses(parsedExpenses);
      });
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setMessage("");

    try {
      // Call server action directly
      const data = await uploadExpenses(file, userId);

      setExpenses([]);
      setFile(null);
      router.refresh(); // optional: refresh dashboard data
    } catch (error: any) {
      setMessage(error?.message || "Error uploading expenses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Add New Expenses</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-2 rounded-md"
        />
        <Button onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>

        {message && (
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        )}

        {expenses.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Preview</h3>
            <ul className="list-disc pl-5 max-h-60 overflow-y-auto">
              {expenses.map((exp, index) => (
                <li key={index}>
                  {exp.date} - {exp.name} - {exp.amount} {exp.currency}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
