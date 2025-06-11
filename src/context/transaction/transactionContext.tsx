"use client";

import { createContext, useReducer, useContext } from "react";
import {
  transactionReducer,
  initialUIState,
  TransactionUIAction,
  TransactionUIState,
} from "@/context/transaction/transactionReducer";

const TransactionContext = createContext<{
  state: TransactionUIState;
  dispatch: React.Dispatch<TransactionUIAction>;
} | null>(null);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(transactionReducer, initialUIState);
  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("useTransactionContext must be used inside Provider");
  return context;
};
