import { useTransactionContext } from "@/context/transaction/transactionContext";
import { Transaction, TransactionAction } from "@/types/transaction";
import TransactionModal from "@/app/transaction/components/TransactionModal";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { dispatch, state } = useTransactionContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      food: "🍽️",
      transport: "🚗",
      entertainment: "🎬",
      shopping: "🛒",
      bills: "📄",
      health: "🏥",
      education: "📚",
      salary: "💼",
      business: "🏢",
      investment: "📈",
      gift: "🎁",
      other: "📝",
    };

    return icons[category.toLowerCase()] || "📝";
  };

  return (
    <>
      {state.isModalOpen && (
        <TransactionModal
          mode={state.modalMode}
          onSave={() => {}}
          onUpdate={() => {}}
        />
      )}

      <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
        <div className="flex items-center justify-between">
          {/* Left side - Transaction info */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Category Icon */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                transaction.type === "income"
                  ? "bg-green-100 border-2 border-green-200"
                  : "bg-red-100 border-2 border-red-200"
              }`}
            >
              {getCategoryIcon(transaction.category)}
            </div>

            {/* Transaction Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {transaction.description}
                </h3>
                {transaction.isRecurring && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    🔄 Recurring
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 mt-1">
                <p className="text-sm text-gray-600">
                  {formatDate(transaction.date)}
                </p>
                <span className="text-gray-300">•</span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.category}
                </span>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-600">{transaction.account}</p>
              </div>
            </div>
          </div>

          {/* Right side - Amount and actions */}
          <div className="flex items-center space-x-4">
            {/* Amount */}
            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {transaction.type}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  dispatch({
                    type: TransactionAction.SELECT_TRANSACTION,
                    payload: transaction,
                  });
                  dispatch({
                    type: TransactionAction.OPEN_VIEW_MODAL,
                    payload: transaction,
                  });
                }}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                title="View details"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: TransactionAction.OPEN_EDIT_MODAL,
                    payload: transaction,
                  })
                }
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-150"
                title="Edit transaction"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <button
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150"
                title="Delete transaction"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Notes section - show if exists */}
        {transaction.notes && (
          <div className="mt-3 pl-16">
            <p className="text-sm text-gray-600 italic">
              "{transaction.notes}"
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionCard;
