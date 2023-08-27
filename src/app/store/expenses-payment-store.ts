import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import IndexedDBStorage from "../infra/indexedDBPersistence";
import { ITransactionData } from "../@types";

const PERSIST_NAME = 'expenses_payment'

// All transaction list should be ordered by tran date in descending order
export type IExpensesPaymentStore = {
  transactions: Record<string, ITransactionData[]>;
  addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string, labels?: string[]) => void;
}

const useExpensesPaymentStore = create<IExpensesPaymentStore>()(persist(
  (set, get) => ({
    transactions: {},
    totalExpenses: {},
    addTransaction: (id, budgetId, walletId, amount, remarks, labels = []) => {
      const tranDate = (new Date()).toJSON()

      set(state => {
        const newTran = { id, type: undefined, budgetId, walletId, amount, tranDate, remarks, labels }

        if (!state.transactions[walletId]) {
          state.transactions[walletId] = []
        }
        state.transactions[walletId].unshift(newTran)
        return state;
      })

    }
  }),
  {
    name: PERSIST_NAME,
    storage: createJSONStorage(() => IndexedDBStorage),
  }
))

export default useExpensesPaymentStore