import {
  RecurringInterval,
  Transaction,
  TransactionType,
} from "@/types/transaction";

import { Logger } from "@/lib/logger";

const logger = new Logger({
  enabled: true,
  level: "debug",
  prefix: "transaction.service",
});

let mockData: Transaction[] = [
  {
    id: "tx1",
    amount: 100,
    description: "Mock transaction 1",
    date: "2021-01-01",
    type: TransactionType.INCOME,
    category: "Salary",
    account: "Bank",
    notes: "Mock notes",
    isRecurring: false,
    recurringInterval: RecurringInterval.MONTHLY,
    recurringEndDate: "2021-12-31",
  },
  {
    id: "tx2",
    amount: 200,
    description: "Mock transaction 2",
    date: "2021-01-02",
    type: TransactionType.EXPENSE,
    category: "Food",
    account: "Cash",
    notes: "Mock notes",
    isRecurring: false,
    recurringInterval: RecurringInterval.MONTHLY,
    recurringEndDate: "2021-12-31",
  },
];

export const getTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockData), 500));
};

export const createTransaction = async (
  tx: Omit<Transaction, "id">
): Promise<Transaction> => {
  const newTx = { id: `tx${Date.now()}`, ...tx };
  mockData.push(newTx);
  return new Promise((resolve) => setTimeout(() => resolve(newTx), 300));
};

export const deleteTransaction = async (id: string) => {
  mockData = mockData.filter((tx) => tx.id !== id);
  return new Promise((resolve) => setTimeout(() => resolve(id), 300));
};

export const updateTransaction = async (id: string, tx: Transaction) => {
  logger.debug("🔄 updateTransaction", id, tx);
  mockData = mockData.map((t) => (t.id === id ? tx : t));
  logger.debug("🔄 updateTransaction", mockData);
  return new Promise((resolve) => setTimeout(() => resolve(tx), 300));
};
