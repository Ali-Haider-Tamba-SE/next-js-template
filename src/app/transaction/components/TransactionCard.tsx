import { useTransactionContext } from "@/context/transaction/transactionContext";
import {
  Transaction,
  TransactionAction,
  TransactionType,
} from "@/types/transaction";
import TransactionModal from "@/app/transaction/components/TransactionModal";
import { Eye, Edit, Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useDeleteTransaction } from "@/hook/transaction/useTransaction";
import { useUpdateTransaction } from "@/hook/transaction/useTransaction";
import { useCreateTransaction } from "@/hook/transaction/useTransaction";

import { Logger } from "@/lib/logger";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { dispatch, state } = useTransactionContext();
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const { mutate: createTransaction } = useCreateTransaction();

  const logger = new Logger({
    enabled: true,
    level: "debug",
    prefix: "TransactionCard",
  });

  const handleViewTransaction = () => {
    dispatch({
      type: TransactionAction.SELECT_TRANSACTION,
      payload: transaction,
    });
    dispatch({
      type: TransactionAction.OPEN_VIEW_MODAL,
      payload: transaction,
    });
  };

  const handleEditTransaction = () => {
    dispatch({
      type: TransactionAction.OPEN_EDIT_MODAL,
      payload: transaction,
    });
  };

  const handleDeleteTransaction = () => {
    deleteTransaction(transaction.id);
  };

  const handleUpdateTransaction = (tx: Transaction) => {
    logger.debug("🔄 handleUpdateTransaction", tx);
    updateTransaction(tx);
  };

  const handleCreateTransaction = (tx: Transaction) => {
    logger.debug("🔄 handleCreateTransaction", tx);
    createTransaction(tx);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {state.isModalOpen && (
        <TransactionModal
          mode={state.modalMode}
          onSave={handleCreateTransaction}
          onUpdate={handleUpdateTransaction}
        />
      )}

      <div className="px-4 py-3 border-b border-gray-700 hover:bg-gray-800 transition-colors bg-gray-900">
        <div className="flex items-center justify-between">
          {/* Transaction info */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-100">
                {transaction.description}
              </h3>
              <span
                className={twMerge(
                  "font-semibold",
                  transaction.type === TransactionType.INCOME
                    ? "text-green-400"
                    : "text-gray-100"
                )}
              >
                {transaction.type === TransactionType.INCOME ? "+" : "-"}$
                {Number(transaction.amount)?.toFixed(2) || 0}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{formatDate(transaction.date)}</span>
                {transaction.isRecurring && (
                  <>
                    <span>•</span>
                    <span>Recurring</span>
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleViewTransaction}
                  className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={handleEditTransaction}
                  className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDeleteTransaction}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notes */}
            {transaction.notes && (
              <p className="text-sm text-gray-400 mt-2 italic">
                {transaction.notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
