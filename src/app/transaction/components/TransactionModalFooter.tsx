import { Loader2 } from "lucide-react";

interface TransactionModalFooterProps {
  mode: "add" | "edit" | "view";
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const TransactionModalFooter = ({
  mode,
  isSubmitting,
  onClose,
  onSubmit,
}: TransactionModalFooterProps) => {
  if (mode === "view") {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="flex justify-between space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 text-center px-6 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="flex-1 text-center px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting && (
            <Loader2 className="animate-spin h-4 w-4 text-white" />
          )}
          <span className="flex-1 text-center">
            {isSubmitting
              ? "Saving..."
              : mode === "add"
              ? "Add Transaction"
              : "Save Changes"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TransactionModalFooter;
