import create, { UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";
import { IIncome, ITransactionData, ITransferTransaction } from "../@types";
import IndexedDBStorage from "../infra/indexedDBPersistence";
import storeMigration from "./migration";

export interface ITransactionStore {
  incomeList: IIncome[];
  list: (ITransactionData | ITransferTransaction)[];
  getGrandTotalIncome: () => number;
  getTotalIncomeOfWallet: (walletId: string) => number;
  getTotalExpenses: () => number;
  getTotalExpensesOfWallet: (walletId: string) => number;
  getTotalOfEachBudget: () => { name: string, value: number }[];
  getTotalOfBudget: (budgetId: string) => number;
  addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string) => void;
  addIncome: (walletId: string, amount: number, remarks?: string) => void;
  addTransfer: (walletFromId: string, walletToId: string, amount: number, remarks?: string) => void;
}

const transactionStore: {
  [year: number]: {
    [month: number]: UseBoundStore<ITransactionStore>
  }
} = {}

const useTransactionStore = (year: number, month: number) => {
  if (!transactionStore[year]) {
    transactionStore[year] = {}
  }
  if (!transactionStore[year][month]) {

    transactionStore[year][month] = create<ITransactionStore>(persist(
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
          let retval: { name: string, value: number }[] = [];

          get().list.forEach(tran => {
            if (tran.type === undefined) {
              var g = retval.find(x => x.name === tran.budgetId)
              if (!g) {
                retval.push({ name: tran.budgetId, value: tran.amount })
              } else {
                g.value += tran.amount;
              }
            }
          })

          return retval;
        },
        getTotalOfBudget: (budgetId: string) => {
          return get().list.filter(t => t.type === undefined && t.budgetId === budgetId).reduce((tot, t) => tot + t.amount, 0)
        },
        addTransaction: (id: string, budgetId: string, walletId: string, amount: number, remarks?: string) => {
          const tranDate = (new Date()).toJSON()
          set(state => {
            state.list.push({ id, type: undefined, budgetId, walletId, amount, tranDate, remarks })
          })
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
          })

        }
      }),
      {
        name: `perako-transaction-${year}-${month}`,
        getStorage: () => IndexedDBStorage,
        migrate: storeMigration.transactionStore,
        version: 1
      }
    ))
  }
  return transactionStore[year][month]
}

export default useTransactionStore