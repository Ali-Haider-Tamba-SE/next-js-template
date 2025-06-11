import { useTransactionContext } from "@/context/transaction/transactionContext";

const TransactionModal = () => {
  const { state, dispatch } = useTransactionContext();

  const selectedTransaction = state.selectedTransaction;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-end">
      <div className="bg-white h-full w-96 p-6 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <button
          onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
          className="absolute top-4 right-4"
        >
          Close
        </button>
        <div className="space-y-4">
          <h1 className="text-xl font-semibold border-b pb-2">
            Transaction Details
          </h1>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="text-gray-900">
                {selectedTransaction?.description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <p className="text-gray-900">{selectedTransaction?.amount}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <p className="text-gray-900">{selectedTransaction?.date}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <p className="text-gray-900">{selectedTransaction?.type}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <p className="text-gray-900">{selectedTransaction?.category}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account
              </label>
              <p className="text-gray-900">{selectedTransaction?.account}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <p className="text-gray-900">{selectedTransaction?.notes}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recurring
              </label>
              <p className="text-gray-900">
                {selectedTransaction?.isRecurring ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
