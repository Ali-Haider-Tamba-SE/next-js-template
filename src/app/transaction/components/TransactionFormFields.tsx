import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AlertCircle } from "lucide-react";

interface TransactionFormFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isReadOnly: boolean;
  selectedTransaction?: any;
}

const TransactionFormFields = ({
  register,
  errors,
  isReadOnly,
  selectedTransaction,
}: TransactionFormFieldsProps) => {
  return (
    <div className="space-y-5">
      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Description *
        </label>
        {isReadOnly ? (
          <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-gray-100 font-medium">
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
              className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-600 focus:border-blue-500"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {String(errors.description.message)}
              </p>
            )}
          </>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Amount *
        </label>
        {isReadOnly ? (
          <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-gray-100 font-bold text-lg">
              ${selectedTransaction?.amount.toFixed(2)}
            </p>
          </div>
        ) : (
          <>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
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
                className={`w-full pl-8 pr-3 py-3 rounded-lg border-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none ${
                  errors.amount
                    ? "border-red-500"
                    : "border-gray-600 focus:border-blue-500"
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {String(errors.amount.message)}
              </p>
            )}
          </>
        )}
      </div>

      {/* Date and Category Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Date *
          </label>
          {isReadOnly ? (
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
              <p className="text-gray-100">
                {new Date(selectedTransaction?.date || "").toLocaleDateString()}
              </p>
            </div>
          ) : (
            <>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-gray-100 focus:outline-none ${
                  errors.date
                    ? "border-red-500"
                    : "border-gray-600 focus:border-blue-500"
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-400">
                  {String(errors.date.message)}
                </p>
              )}
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Category *
          </label>
          {isReadOnly ? (
            <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
              <p className="text-gray-100">{selectedTransaction?.category}</p>
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
                className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-600 focus:border-blue-500"
                }`}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-400">
                  {String(errors.category.message)}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Account */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Account *
        </label>
        {isReadOnly ? (
          <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
            <p className="text-gray-100">{selectedTransaction?.account}</p>
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
              className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none ${
                errors.account
                  ? "border-red-500"
                  : "border-gray-600 focus:border-blue-500"
              }`}
            />
            {errors.account && (
              <p className="mt-1 text-sm text-red-400">
                {String(errors.account.message)}
              </p>
            )}
          </>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Notes
        </label>
        {isReadOnly ? (
          <div className="p-3 bg-gray-800 rounded-lg border border-gray-600 min-h-[80px]">
            <p className="text-gray-100">
              {selectedTransaction?.notes || "No notes"}
            </p>
          </div>
        ) : (
          <textarea
            placeholder="Add any additional notes..."
            {...register("notes")}
            rows={3}
            className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
          />
        )}
      </div>
    </div>
  );
};

export default TransactionFormFields;
