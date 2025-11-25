import Expenses from "@/components/expenses";
import { getExpenses } from "@/lib/actions";
import { createClient } from "@/lib/server";
import React from "react";

const ExpensesPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const expenses = user ? await getExpenses(user.id) : [];
  return (
    <div className="w-full h-screen flex justify-center items-center p-6">
      <Expenses expenses={expenses} />
    </div>
  );
};

export default ExpensesPage;
