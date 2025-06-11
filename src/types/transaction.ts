export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: "income" | "expense";
  category: string;
  account: string;
  notes: string;
  isRecurring: boolean;
  recurringInterval: "daily" | "weekly" | "monthly" | "yearly";
  recurringEndDate: string;
}
