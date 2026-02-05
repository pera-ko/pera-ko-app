import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import IndexedDBStorage from "../infra/indexedDBPersistence";
import { ITransactionData } from "../../shared/@types";

const PERSIST_NAME = 'aggregate'

// All transactions should be ordered by tran date in descending order
export type IAggregateStore = {
  transactions: {
    last10: ITransactionData[]
  },
  addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string, labels?: string[], tranDate?: string) => void,
  updateTransaction: (id: string, transaction: ITransactionData) => void
}


const useAggregateStore = create<IAggregateStore>()(
  persist((set, get) => ({
    transactions: {
      last10: []
    },
    addTransaction: (id, budgetId, walletId, amount, remarks, labels = [], tranDate) => {
      const finalTranDate = tranDate || (new Date()).toJSON()

      const newTran = { id, type: undefined, budgetId, walletId, amount, tranDate: finalTranDate, remarks, labels }
      
      const last10 = [...get().transactions.last10]

      // Find the correct position to insert based on tranDate (descending order)
      let insertIndex = last10.length
      for (let i = 0; i < last10.length; i++) {
        if (finalTranDate > last10[i].tranDate) {
          insertIndex = i
          break
        }
      }

      last10.splice(insertIndex, 0, newTran)

      // Keep only last 10
      if (last10.length > 10) {
        last10.pop()
      }

      set(state => ({
        ...state,
        transactions: {
          ...state.transactions,
          last10
        }
      }))
      
    },
    updateTransaction: (id, transaction) => {

      const last10 = get().transactions.last10.map(tran => {
        if (tran.id === id) return transaction
        return tran;
      })

      set(state => ({
        ...state,
        transactions: {
          ...state.transactions,
          last10
        }
      }))
    }
  }),
  {
    name: PERSIST_NAME,
    storage: createJSONStorage(() => IndexedDBStorage),
    version: 1
  })
)


export default useAggregateStore