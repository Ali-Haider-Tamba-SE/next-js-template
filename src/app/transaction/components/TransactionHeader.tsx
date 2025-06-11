"use client";

import { Plus, CreditCard } from "lucide-react";

interface TransactionHeaderProps {
  onAddTransaction: () => void;
}

const TransactionHeader = ({ onAddTransaction }: TransactionHeaderProps) => {
  return (
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
            onClick={onAddTransaction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;
