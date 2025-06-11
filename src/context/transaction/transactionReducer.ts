import {
  Transaction,
  TransactionModalMode,
  TransactionAction,
} from "@/types/transaction";

export interface TransactionUIState {
  selectedTransaction: Transaction | null;
  isModalOpen: boolean;
  modalMode: TransactionModalMode;
}

export type TransactionUIAction =
  | { type: TransactionAction.SELECT_TRANSACTION; payload: Transaction }
  | { type: TransactionAction.CLEAR_SELECTION }
  | { type: TransactionAction.TOGGLE_MODAL }
  | { type: TransactionAction.OPEN_ADD_MODAL }
  | { type: TransactionAction.OPEN_EDIT_MODAL; payload: Transaction }
  | { type: TransactionAction.OPEN_VIEW_MODAL; payload: Transaction };

export const initialUIState: TransactionUIState = {
  selectedTransaction: null,
  isModalOpen: false,
  modalMode: TransactionModalMode.VIEW,
};

export function transactionReducer(
  state: TransactionUIState,
  action: TransactionUIAction
): TransactionUIState {
  switch (action.type) {
    case TransactionAction.SELECT_TRANSACTION:
      return { ...state, selectedTransaction: action.payload };
    case TransactionAction.CLEAR_SELECTION:
      return { ...state, selectedTransaction: null };
    case TransactionAction.TOGGLE_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen };
    case TransactionAction.OPEN_ADD_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalMode: TransactionModalMode.ADD,
        selectedTransaction: null,
      };
    case TransactionAction.OPEN_EDIT_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalMode: TransactionModalMode.EDIT,
        selectedTransaction: action.payload,
      };
    case TransactionAction.OPEN_VIEW_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalMode: TransactionModalMode.VIEW,
        selectedTransaction: action.payload,
      };
    default:
      return state;
  }
}
