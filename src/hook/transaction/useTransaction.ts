"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/service/transaction/transaction.service";
import { Transaction } from "@/types/transaction";

import { Logger } from "@/lib/logger";

const logger = new Logger({
  enabled: true,
  level: "debug",
  prefix: "useTransaction",
});

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

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteTransaction(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions");
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (tx: Transaction) => {
      logger.debug("🔄 useUpdateTransaction", tx);
      return updateTransaction(tx.id, tx);
    },
    {
      onSuccess: () => {
        logger.debug("🔄 useUpdateTransaction onSuccess");
        queryClient.invalidateQueries("transactions");
      },
    }
  );
};
