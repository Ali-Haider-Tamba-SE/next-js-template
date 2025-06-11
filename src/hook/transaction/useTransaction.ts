"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTransactions,
  createTransaction,
} from "@/service/transaction/transaction.service";
import { Transaction } from "@/types/transaction";

export const useTransactions = () => {
  return useQuery<Transaction[], Error>("transactions", getTransactions);
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });
};
