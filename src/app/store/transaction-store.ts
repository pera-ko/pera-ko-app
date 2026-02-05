import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IIncome, ITransaction, ITransactionData, ITransferTransaction } from "../../shared/@types";
import { IndexedDBStorageYearMonth } from "../infra/indexedDBPersistence";
import storeMigration from "./migration";

export const sumPerCategory = (items: ITransaction[]) => {
  let retval: { name: string, value: number }[] = [];
  
  items.forEach(tran => {
    if (tran.type === undefined) {
      var g = retval.find(x => x.name === tran.budgetId)
      if (!g) {
        retval.push({ name: tran.budgetId, value: tran.amount })
      } else {
        g.value += tran.amount;
      }
    }
  })

  return retval
}

export type ITransactionStore = {
  incomeList: IIncome[];
  list: (ITransactionData | ITransferTransaction)[];
  getGrandTotalIncome: () => number;
  getTotalIncomeOfWallet: (walletId: string) => number;
  getTotalExpenses: () => number;
  getTotalExpensesOfWallet: (walletId: string) => number;
  getTotalOfEachBudget: () => { name: string, value: number }[];
  getTotalOfBudget: (budgetId: string) => number;
  addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string, labels?: string[], tranDate?: string) => void;
  updateTransaction: (id: string, tranData: ITransactionData) => void;
  addIncome: (walletId: string, amount: number, remarks?: string) => void;
  addTransfer: (walletFromId: string, walletToId: string, amount: number, remarks?: string) => void;
}

const useTransactionStore = create<ITransactionStore>()(persist(
  (set, get) => ({
    incomeList: [

    ],
    list: [],
    getGrandTotalIncome: () => get().incomeList.filter(t => t.type !== "transfer").reduce((x, y) => x + y.amount, 0),
    getTotalIncomeOfWallet: (walletId: string) => get().incomeList.filter(i => i.walletId === walletId).reduce((x, y) => x + y.amount, 0),
    getTotalExpenses: () => get().list.filter(t => t.type !== "transfer").reduce((x, y) => x + y.amount, 0),
    getTotalExpensesOfWallet: (walletId: string) => get().list.filter(t => {
      if (t.type === "transfer") {
        return t.walletFromId === walletId
      } else {
        return t.walletId === walletId
      }
    }).reduce((x, y) => x + y.amount, 0),
    getTotalOfEachBudget: () => {
      return sumPerCategory(get().list.filter(t => t.type === undefined) as ITransaction[])
    },
    getTotalOfBudget: (budgetId: string) => {
      return get().list.filter(t => t.type === undefined && t.budgetId === budgetId).reduce((tot, t) => tot + t.amount, 0)
    },
    addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string, labels = [], tranDate?: string) => {
      const finalTranDate = tranDate || (new Date()).toJSON()
      set(state => {
        state.list.push({ id, type: undefined, budgetId, walletId, amount, tranDate: finalTranDate, remarks, labels })
        return state;
      })
    },
    updateTransaction: (id: string, tranData: ITransactionData) => {
      set(state => ({
        ...state,
        list: state.list.map(item => {
          if (item.type === undefined && item.id === id) {
            return tranData
          }
          return item
        })
      }))
    },
    addIncome: (walletId: string, amount: number, remarks?: string) => {
      const tranDate = (new Date()).toJSON()
      set(state => {
        state.incomeList.push({
          type: undefined,
          amount: amount,
          remarks,
          tranDate,
          walletId
        })
        return state;
      })
    },
    addTransfer: (walletFromId: string, walletToId: string, amount: number, remarks?: string) => {
      const tranDate = (new Date()).toJSON()
      set(state => {
        state.list.push({ type: "transfer", walletFromId, walletToId, amount, tranDate, remarks })
        state.incomeList.push({
          type: 'transfer',
          amount: amount,
          remarks: "Transferred from another wallet",
          tranDate,
          walletId: walletToId
        })
        return state;
      })

    }
  }),
  {
    name: 'perako-transaction',
    storage: createJSONStorage(() => IndexedDBStorageYearMonth),
    migrate: storeMigration.transactionStore,
    version: 1,
    skipHydration: true
  }
));

export default useTransactionStore