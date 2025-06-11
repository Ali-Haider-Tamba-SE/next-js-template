import { X, Plus, Edit, Eye } from "lucide-react";

interface TransactionModalHeaderProps {
  mode: "add" | "edit" | "view";
  onClose: () => void;
}

const TransactionModalHeader = ({
  mode,
  onClose,
}: TransactionModalHeaderProps) => {
  const title =
    mode === "add"
      ? "Add Transaction"
      : mode === "edit"
      ? "Edit Transaction"
      : "Transaction Details";

  const subtitle =
    mode === "add"
      ? "Create a new transaction"
      : mode === "edit"
      ? "Modify transaction details"
      : "View transaction information";

  const IconComponent = mode === "add" ? Plus : mode === "edit" ? Edit : Eye;

  return (
    <div className="bg-gray-800 px-6 py-4 text-white border-b border-gray-700">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-300 hover:text-white p-1 rounded"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-gray-300" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-gray-300 text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionModalHeader;
