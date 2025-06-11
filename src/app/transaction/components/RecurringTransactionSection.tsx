import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { RotateCcw } from "lucide-react";

interface RecurringTransactionSectionProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<any>;
  isReadOnly: boolean;
  selectedTransaction?: any;
}

const RecurringTransactionSection = ({
  register,
  watch,
  errors,
  isReadOnly,
  selectedTransaction,
}: RecurringTransactionSectionProps) => {
  const isRecurring = watch("isRecurring");

  return (
    <div className="border-t border-gray-700 pt-5">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-6 h-6 bg-purple-900 rounded-full flex items-center justify-center">
          <RotateCcw className="w-3 h-3 text-purple-300" />
        </div>
        <h3 className="font-semibold text-gray-300">Recurring Options</h3>
      </div>

      <div className="space-y-4">
        <div>
          {isReadOnly ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">
                Recurring:
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedTransaction?.isRecurring
                    ? "bg-green-900 text-green-300"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {selectedTransaction?.isRecurring ? "Yes" : "No"}
              </span>
            </div>
          ) : (
            <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700">
              <input
                type="checkbox"
                {...register("isRecurring")}
                className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-500 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-300">
                Make this a recurring transaction
              </span>
            </label>
          )}
        </div>

        {/* Recurring Options - only show when isRecurring is true */}
        {((isReadOnly && selectedTransaction?.isRecurring) ||
          (!isReadOnly && isRecurring)) && (
          <div className="pl-4 border-l-2 border-purple-700 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Frequency *
              </label>
              {isReadOnly ? (
                <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
                  <p className="text-gray-100 capitalize">
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
                  className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-gray-100 focus:outline-none ${
                    errors.recurringInterval
                      ? "border-red-500"
                      : "border-gray-600 focus:border-blue-500"
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
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                End Date (Optional)
              </label>
              {isReadOnly ? (
                <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
                  <p className="text-gray-100">
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
                  className={`w-full p-3 rounded-lg border-2 bg-gray-800 text-gray-100 focus:outline-none ${
                    errors.recurringEndDate
                      ? "border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecurringTransactionSection;
