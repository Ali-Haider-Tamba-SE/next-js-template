import { useTransactionContext } from "@/context/transaction/transactionContext";
import { Transaction } from "@/types/transaction";
import TransactionModal from "@/app/transaction/components/TransactionModal";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { dispatch, state } = useTransactionContext();

  return (
    <div className="bg-white rounded-lg p-4">
      {state.isModalOpen && <TransactionModal />}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200">
            {transaction.type === "income" ? "💰" : "💸"}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
          </div>
          <button
            onClick={() => {
              dispatch({ type: "SELECT_TRANSACTION", payload: transaction });
              dispatch({ type: "TOGGLE_MODAL" });
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
