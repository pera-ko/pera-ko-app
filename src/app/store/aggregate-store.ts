import create from "zustand";
import { persist } from "zustand/middleware";
import IndexedDBStorage from "../infra/indexedDBPersistence";
import { ITransactionData } from "../@types";

const PERSIST_NAME = 'aggregate'

// All transactions should be ordered by tran date in descending order
export interface IAggregateStore {
  transactions: {
    last10: ITransactionData[]
  },
  addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string) => void,
  getLast10: () => ITransactionData[]

}

const useAggregateStore = create<IAggregateStore>(persist(
  (set, get) => ({
    transactions: {
      last10: []
    },
    addTransaction: (id, budgetId, walletId, amount, remarks) => {
      const tranDate = (new Date()).toJSON()

      const newTran = { id, type: undefined, budgetId, walletId, amount, tranDate, remarks }

      const last10 = [...get().transactions.last10]

      const count = last10.unshift(newTran)


      if (count > 10) { // TODO: should also check the dates and not just the count
        last10.pop()
      }

      set(state => {
        state.transactions.last10 = last10
      })
    },
    getLast10: () => {
      return get().transactions.last10
    }
  }),
  {
    name: PERSIST_NAME,
    getStorage: () => IndexedDBStorage,
    version: 1
  }
))

export default useAggregateStore