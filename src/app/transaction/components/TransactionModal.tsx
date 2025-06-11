import { useTransactionContext } from "@/context/transaction/transactionContext";
import { Transaction } from "@/types/transaction";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface TransactionModalProps {
  mode: "add" | "edit" | "view";
  onSave?: (transaction: Transaction) => void;
  onUpdate?: (transaction: Transaction) => void;
}

type TransactionFormData = Omit<Transaction, "id">;

const TransactionModal = ({
  mode,
  onSave,
  onUpdate,
}: TransactionModalProps) => {
  const { state, dispatch } = useTransactionContext();
  const selectedTransaction = state.selectedTransaction;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    defaultValues: {
      description: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      category: "",
      account: "",
      notes: "",
      isRecurring: false,
      recurringInterval: "monthly",
      recurringEndDate: "",
    },
  });

  const isRecurring = watch("isRecurring");
  const transactionType = watch("type");

  // Initialize form data based on mode
  useEffect(() => {
    if (mode === "edit" && selectedTransaction) {
      reset(selectedTransaction);
    } else if (mode === "add") {
      reset({
        description: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        type: "expense",
        category: "",
        account: "",
        notes: "",
        isRecurring: false,
        recurringInterval: "monthly",
        recurringEndDate: "",
      });
    } else if (mode === "view" && selectedTransaction) {
      reset(selectedTransaction);
    }
  }, [mode, selectedTransaction, reset]);

  const onSubmit: SubmitHandler<TransactionFormData> = (data) => {
    if (mode === "add" && onSave) {
      const newTransaction: Transaction = {
        ...data,
        id: Date.now().toString(), // Simple ID generation
      };
      onSave(newTransaction);
    } else if (mode === "edit" && onUpdate && selectedTransaction) {
      const updatedTransaction: Transaction = {
        ...selectedTransaction,
        ...data,
      };
      onUpdate(updatedTransaction);
    }

    dispatch({ type: "TOGGLE_MODAL" });
  };

  const handleClose = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add Transaction"
      : mode === "edit"
      ? "Edit Transaction"
      : "Transaction Details";

  // Color schemes based on mode
  const modeStyles = {
    add: {
      headerBg: "bg-gradient-to-r from-green-500 to-green-600",
      buttonBg: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
      iconBg: "bg-green-100",
      icon: "💰",
    },
    edit: {
      headerBg: "bg-gradient-to-r from-blue-500 to-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      iconBg: "bg-blue-100",
      icon: "✏️",
    },
    view: {
      headerBg: "bg-gradient-to-r from-gray-500 to-gray-600",
      buttonBg: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
      iconBg: "bg-gray-100",
      icon: "👁️",
    },
  };

  const currentStyle = modeStyles[mode];

  return (
    <div className="fixed inset-0 flex justify-end z-50 ">
      <div className="bg-white h-full w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out overflow-hidden">
        {/* Header */}
        <div
          className={`${currentStyle.headerBg} px-6 py-4 text-white relative`}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/20"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${currentStyle.iconBg} rounded-full flex items-center justify-center text-lg`}
            >
              {currentStyle.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-white/80 text-sm">
                {mode === "add" && "Create a new transaction"}
                {mode === "edit" && "Modify transaction details"}
                {mode === "view" && "View transaction information"}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto h-full pb-24">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Transaction Type Indicator */}
            {!isReadOnly && (
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
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">💸</span>
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
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">💰</span>
                      <span className="font-medium">Income</span>
                    </div>
                  </div>
                </label>
              </div>
            )}

            {isReadOnly && selectedTransaction && (
              <div className="mb-6">
                <div
                  className={`p-4 rounded-lg ${
                    selectedTransaction.type === "income"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {selectedTransaction.type === "income" ? "💰" : "💸"}
                    </span>
                    <div>
                      <p
                        className={`font-semibold text-lg ${
                          selectedTransaction.type === "income"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        ${selectedTransaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {selectedTransaction.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                {isReadOnly ? (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900 font-medium">
                      {selectedTransaction?.description}
                    </p>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter transaction description"
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 2,
                          message: "Description must be at least 2 characters",
                        },
                      })}
                      className={`w-full p-3 rounded-lg border-2 transition-colors focus:outline-none ${
                        errors.description
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.description.message}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount *
                </label>
                {isReadOnly ? (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900 font-bold text-lg">
                      ${selectedTransaction?.amount.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="0.00"
                        {...register("amount", {
                          required: "Amount is required",
                          min: {
                            value: 0.01,
                            message: "Amount must be greater than 0",
                          },
                        })}
                        step="0.01"
                        min="0"
                        className={`w-full pl-8 pr-3 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                          errors.amount
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.amount.message}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Date and Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  {isReadOnly ? (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-900">
                        {new Date(
                          selectedTransaction?.date || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <>
                      <input
                        type="date"
                        {...register("date", { required: "Date is required" })}
                        className={`w-full p-3 rounded-lg border-2 transition-colors focus:outline-none ${
                          errors.date
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }`}
                      />
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.date.message}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  {isReadOnly ? (
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-900">
                        {selectedTransaction?.category}
                      </p>
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="e.g., Food, Transport"
                        {...register("category", {
                          required: "Category is required",
                          minLength: {
                            value: 2,
                            message: "Category must be at least 2 characters",
                          },
                        })}
                        className={`w-full p-3 rounded-lg border-2 transition-colors focus:outline-none ${
                          errors.category
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }`}
                      />
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.category.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Account */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account *
                </label>
                {isReadOnly ? (
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900">
                      {selectedTransaction?.account}
                    </p>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="e.g., Checking, Credit Card"
                      {...register("account", {
                        required: "Account is required",
                        minLength: {
                          value: 2,
                          message: "Account must be at least 2 characters",
                        },
                      })}
                      className={`w-full p-3 rounded-lg border-2 transition-colors focus:outline-none ${
                        errors.account
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                    {errors.account && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.account.message}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                {isReadOnly ? (
                  <div className="p-3 bg-gray-50 rounded-lg border min-h-[80px]">
                    <p className="text-gray-900">
                      {selectedTransaction?.notes || "No notes"}
                    </p>
                  </div>
                ) : (
                  <textarea
                    placeholder="Add any additional notes..."
                    {...register("notes")}
                    rows={3}
                    className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                )}
              </div>

              {/* Recurring Transaction Section */}
              <div className="border-t pt-5">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    🔄
                  </div>
                  <h3 className="font-semibold text-gray-700">
                    Recurring Options
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    {isReadOnly ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">
                          Recurring:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedTransaction?.isRecurring
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {selectedTransaction?.isRecurring ? "Yes" : "No"}
                        </span>
                      </div>
                    ) : (
                      <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          {...register("isRecurring")}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Make this a recurring transaction
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Recurring Options - only show when isRecurring is true */}
                  {((isReadOnly && selectedTransaction?.isRecurring) ||
                    (!isReadOnly && isRecurring)) && (
                    <div className="pl-4 border-l-2 border-purple-200 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Frequency *
                        </label>
                        {isReadOnly ? (
                          <div className="p-3 bg-gray-50 rounded-lg border">
                            <p className="text-gray-900 capitalize">
                              {selectedTransaction?.recurringInterval}
                            </p>
                          </div>
                        ) : (
                          <select
                            {...register("recurringInterval", {
                              required: isRecurring
                                ? "Recurring interval is required"
                                : false,
                            })}
                            className={`w-full p-3 rounded-lg border-2 transition-colors focus:outline-none ${
                              errors.recurringInterval
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-blue-500"
                            }`}
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          End Date (Optional)
                        </label>
                        {isReadOnly ? (
                          <div className="p-3 bg-gray-50 rounded-lg border">
                            <p className="text-gray-900">
                              {selectedTransaction?.recurringEndDate
                                ? new Date(
                                    selectedTransaction.recurringEndDate
                                  ).toLocaleDateString()
                                : "No end date"}
                            </p>
                          </div>
                        ) : (
                          <input
                            type="date"
                            {...register("recurringEndDate", {
                              validate: (value) => {
                                if (isRecurring && value) {
                                  const endDate = new Date(value);
                                  const startDate = new Date(watch("date"));
                                  return (
                                    endDate >= startDate ||
                                    "End date must be after start date"
                                  );
                                }
                                return true;
                              },
                            })}
                            className={`w-full p-3 rounded-lg border-2 transition-colors focus:outline-none ${
                              errors.recurringEndDate
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-blue-500"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        {!isReadOnly && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className={`px-6 py-2 text-sm font-medium text-white ${currentStyle.buttonBg} border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2`}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <span>
                  {isSubmitting
                    ? "Saving..."
                    : mode === "add"
                    ? "Add Transaction"
                    : "Save Changes"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
