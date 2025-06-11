"use client";

import TransactionCard from "@/app/transaction/components/TransactionCard";
import { useTransactions } from "@/hook/transaction/useTransaction";
import { useTransactionContext } from "@/context/transaction/transactionContext";
import { TransactionAction } from "@/types/transaction";
import { Plus, CreditCard, FileText } from "lucide-react";

const TransactionPage = () => {
  const { data, isLoading } = useTransactions();
  const { dispatch } = useTransactionContext();

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
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <CreditCard className="mr-3 h-8 w-8 text-blue-400" />
                Transactions
              </h1>
              <p className="text-gray-400 mt-1">
                Manage your income and expenses
              </p>
            </div>
            <button
              onClick={() =>
                dispatch({ type: TransactionAction.OPEN_ADD_MODAL })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </div>

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
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No transactions found
              </h3>
              <p className="text-gray-400 mb-6">
                Get started by adding your first transaction
              </p>
              <button
                onClick={() =>
                  dispatch({ type: TransactionAction.OPEN_ADD_MODAL })
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Transaction</span>
              </button>
            </div>
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
