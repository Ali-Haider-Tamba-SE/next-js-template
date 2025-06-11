"use client";

import TransactionCard from "@/app/transaction/components/TransactionCard";
import TransactionHeader from "@/app/transaction/components/TransactionHeader";
import TransactionEmptyState from "@/app/transaction/components/TransactionEmptyState";
import { useTransactions } from "@/hook/transaction/useTransaction";
import { useTransactionContext } from "@/context/transaction/transactionContext";
import { TransactionAction } from "@/types/transaction";
import { FileText } from "lucide-react";

const TransactionPage = () => {
  const { data, isLoading } = useTransactions();
  const { dispatch } = useTransactionContext();

  const handleAddTransaction = () => {
    dispatch({ type: TransactionAction.OPEN_ADD_MODAL });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <TransactionHeader onAddTransaction={handleAddTransaction} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Transactions List */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-400" />
              Recent Transactions ({data?.length || 0})
            </h2>
          </div>

          {!data?.length ? (
            <TransactionEmptyState onAddTransaction={handleAddTransaction} />
          ) : (
            <div className="divide-y divide-gray-700">
              {data.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
