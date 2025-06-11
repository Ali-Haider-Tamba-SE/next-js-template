"use client";

import { Plus, FileText } from "lucide-react";

interface TransactionEmptyStateProps {
  onAddTransaction: () => void;
}

const TransactionEmptyState = ({
  onAddTransaction,
}: TransactionEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">
        No transactions found
      </h3>
      <p className="text-gray-400 mb-6">
        Get started by adding your first transaction
      </p>
      <button
        onClick={onAddTransaction}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
      >
        <Plus className="w-5 h-5" />
        <span>Add Your First Transaction</span>
      </button>
    </div>
  );
};

export default TransactionEmptyState;
