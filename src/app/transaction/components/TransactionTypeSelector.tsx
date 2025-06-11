import { UseFormRegister } from "react-hook-form";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TransactionTypeSelectorProps {
  register: UseFormRegister<any>;
  transactionType: string;
  isReadOnly?: boolean;
  selectedTransaction?: any;
}

const TransactionTypeSelector = ({
  register,
  transactionType,
  isReadOnly,
  selectedTransaction,
}: TransactionTypeSelectorProps) => {
  if (isReadOnly && selectedTransaction) {
    return (
      <div className="mb-6">
        <div
          className={`p-4 rounded-lg border ${
            selectedTransaction.type === "income"
              ? "bg-green-900 border-green-600"
              : "bg-red-900 border-red-600"
          }`}
        >
          <div className="flex items-center space-x-3">
            {selectedTransaction.type === "income" ? (
              <TrendingUp className="w-6 h-6 text-green-300" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-300" />
            )}
            <div>
              <p
                className={`font-semibold text-lg ${
                  selectedTransaction.type === "income"
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                ${selectedTransaction.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 capitalize">
                {selectedTransaction.type}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-3 mb-6">
      <label className="flex-1">
        <input
          type="radio"
          value="expense"
          {...register("type", { required: "Type is required" })}
          className="sr-only"
        />
        <div
          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
            transactionType === "expense"
              ? "border-red-500 bg-red-900 text-red-300"
              : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingDown className="w-5 h-5" />
            <span className="font-medium">Expense</span>
          </div>
        </div>
      </label>
      <label className="flex-1">
        <input
          type="radio"
          value="income"
          {...register("type", { required: "Type is required" })}
          className="sr-only"
        />
        <div
          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
            transactionType === "income"
              ? "border-green-500 bg-green-900 text-green-300"
              : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Income</span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TransactionTypeSelector;
