import { Transaction } from "@/types/transaction";

export interface TransactionUIState {
  selectedTransaction: Transaction | null;
  isModalOpen: boolean;
}

export type TransactionUIAction =
  | { type: "SELECT_TRANSACTION"; payload: Transaction }
  | { type: "CLEAR_SELECTION" }
  | { type: "TOGGLE_MODAL" };

export const initialUIState: TransactionUIState = {
  selectedTransaction: null,
  isModalOpen: false,
};

export function transactionReducer(
  state: TransactionUIState,
  action: TransactionUIAction
): TransactionUIState {
  switch (action.type) {
    case "SELECT_TRANSACTION":
      return { ...state, selectedTransaction: action.payload };
    case "CLEAR_SELECTION":
      return { ...state, selectedTransaction: null };
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: !state.isModalOpen };
    default:
      return state;
  }
}
