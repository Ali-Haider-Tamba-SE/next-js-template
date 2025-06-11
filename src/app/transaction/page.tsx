"use client";

import TransactionCard from "@/app/transaction/components/TransactionCard";
import { useTransactions } from "@/hook/transaction/useTransaction";

const TransactionPage = () => {
  const { data, isLoading } = useTransactions();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-4 p-4">
      {data?.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionPage;
