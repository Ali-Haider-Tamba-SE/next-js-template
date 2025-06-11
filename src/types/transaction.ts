export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: TransactionType;
  category: string;
  account: string;
  notes: string;
  isRecurring: boolean;
  recurringInterval: RecurringInterval;
  recurringEndDate: string;
}

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum RecurringInterval {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum TransactionAction {
  SELECT_TRANSACTION = "SELECT_TRANSACTION",
  CLEAR_SELECTION = "CLEAR_SELECTION",
  TOGGLE_MODAL = "TOGGLE_MODAL",
  OPEN_ADD_MODAL = "OPEN_ADD_MODAL",
  OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL",
  OPEN_VIEW_MODAL = "OPEN_VIEW_MODAL",
}

export enum TransactionModalMode {
  ADD = "add",
  EDIT = "edit",
  VIEW = "view",
}
