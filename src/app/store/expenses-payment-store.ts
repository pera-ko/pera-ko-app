import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import IndexedDBStorage from "../infra/indexedDBPersistence";
import { ITransactionData } from "../../shared/@types";

const PERSIST_NAME = 'expenses_payment'

// All transaction list should be ordered by tran date in descending order
export type IExpensesPaymentStore = {
  transactions: Record<string, ITransactionData[]>;
  addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string, labels?: string[]) => void;
  updateTransaction: (id: string, tranData: ITransactionData) => void;
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
    },
    updateTransaction: (id, tranData) => {
      let newTransactionListForWallet: ITransactionData[] = []

      if (get().transactions[tranData.walletId]) {
        const currentTransactions = get().transactions[tranData.walletId];
        const tranEntity = currentTransactions.find(tran => tran.id === id)

        // if the transaction date is the same, just replace the value of the item in the list
        // if not the same, then remove and insert the transaction to the list following the tran date order
        if (tranEntity?.tranDate.toString() === tranData.tranDate.toString()) {
          newTransactionListForWallet = currentTransactions.map(tran => {
            if (tran.id === id) return tranData
            return tran
          })
        } else {
          let inserted = false
          for (const tran of currentTransactions.filter(tran => tran.id !== id)) {
            if (!inserted && tranData.tranDate > tran.tranDate) {
              newTransactionListForWallet.push(tranData)
              inserted = true
            }
            newTransactionListForWallet.push(tran)
          }
        }
      }
      
      set(state => {
        if (!state.transactions[tranData.walletId]) {
          state.transactions[tranData.walletId] = []
        }

        state.transactions[tranData.walletId] = newTransactionListForWallet
        
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