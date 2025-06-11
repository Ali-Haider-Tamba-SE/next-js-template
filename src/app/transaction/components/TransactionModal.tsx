import { useTransactionContext } from "@/context/transaction/transactionContext";
import {
  RecurringInterval,
  Transaction,
  TransactionAction,
  TransactionType,
} from "@/types/transaction";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TransactionModalHeader from "./TransactionModalHeader";
import TransactionTypeSelector from "./TransactionTypeSelector";
import TransactionFormFields from "./TransactionFormFields";
import RecurringTransactionSection from "./RecurringTransactionSection";
import TransactionModalFooter from "./TransactionModalFooter";

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
      type: TransactionType.EXPENSE,
      category: "",
      account: "",
      notes: "",
      isRecurring: false,
      recurringInterval: RecurringInterval.MONTHLY,
      recurringEndDate: "",
    },
  });

  const transactionType = watch("type");

  // Click handlers defined at the top
  const handleClose = () => {
    dispatch({ type: TransactionAction.TOGGLE_MODAL });
  };

  const onSubmit: SubmitHandler<TransactionFormData> = (data) => {
    if (mode === "add" && onSave) {
      const newTransaction: Transaction = {
        ...data,
        id: Date.now().toString(),
      };
      onSave(newTransaction);
    } else if (mode === "edit" && onUpdate && selectedTransaction) {
      const updatedTransaction: Transaction = {
        ...selectedTransaction,
        ...data,
      };
      onUpdate(updatedTransaction);
    }

    dispatch({ type: TransactionAction.TOGGLE_MODAL });
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  // Initialize form data based on mode
  useEffect(() => {
    if (mode === "edit" && selectedTransaction) {
      reset(selectedTransaction);
    } else if (mode === "add") {
      reset({
        description: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        type: TransactionType.EXPENSE,
        category: "",
        account: "",
        notes: "",
        isRecurring: false,
        recurringInterval: RecurringInterval.MONTHLY,
        recurringEndDate: "",
      });
    } else if (mode === "view" && selectedTransaction) {
      reset(selectedTransaction);
    }
  }, [mode, selectedTransaction, reset]);

  const isReadOnly = mode === "view";

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="bg-gray-900 h-full w-full max-w-md shadow-2xl overflow-hidden relative">
        <TransactionModalHeader mode={mode} onClose={handleClose} />

        <div className="p-6 overflow-y-auto h-full pb-24 bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TransactionTypeSelector
              register={register}
              transactionType={transactionType}
              isReadOnly={isReadOnly}
              selectedTransaction={selectedTransaction}
            />

            <TransactionFormFields
              register={register}
              errors={errors}
              isReadOnly={isReadOnly}
              selectedTransaction={selectedTransaction}
            />

            <RecurringTransactionSection
              register={register}
              watch={watch}
              errors={errors}
              isReadOnly={isReadOnly}
              selectedTransaction={selectedTransaction}
            />
          </form>
        </div>

        <TransactionModalFooter
          mode={mode}
          isSubmitting={isSubmitting}
          onClose={handleClose}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default TransactionModal;
