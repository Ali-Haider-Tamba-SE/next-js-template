import {
  Transaction,
  TransactionModalMode,
  TransactionAction,
} from "@/types/transaction";
import { transactionLogger } from "@/lib/logger";

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
  transactionLogger.debug("🔄 Action dispatched:", action.type, action);
  transactionLogger.debug("📄 Current state:", state);

  let newState: TransactionUIState;

  switch (action.type) {
    case TransactionAction.SELECT_TRANSACTION:
      newState = { ...state, selectedTransaction: action.payload };
      break;
    case TransactionAction.CLEAR_SELECTION:
      newState = { ...state, selectedTransaction: null };
      break;
    case TransactionAction.TOGGLE_MODAL:
      newState = { ...state, isModalOpen: !state.isModalOpen };
      break;
    case TransactionAction.OPEN_ADD_MODAL:
      newState = {
        ...state,
        isModalOpen: true,
        modalMode: TransactionModalMode.ADD,
        selectedTransaction: null,
      };
      break;
    case TransactionAction.OPEN_EDIT_MODAL:
      newState = {
        ...state,
        isModalOpen: true,
        modalMode: TransactionModalMode.EDIT,
        selectedTransaction: action.payload,
      };
      break;
    case TransactionAction.OPEN_VIEW_MODAL:
      newState = {
        ...state,
        isModalOpen: true,
        modalMode: TransactionModalMode.VIEW,
        selectedTransaction: action.payload,
      };
      break;
    default:
      newState = state;
  }

  transactionLogger.debug("✅ New state:", newState);
  return newState;
}
