import { nanoid } from 'nanoid'
import create, { UseStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBudget, IBudgetData, IGoal, IGoalData, IIncome, IWalletData } from '../@types'
import IndexedDBStorage from '../infra/indexedDBPersistence'

interface IStoreState {
  wallet: {
    list: {
      [id: string]: IWalletData
    },
    selected: string,
    getDefaultWallet: () => IWalletData
  },
  budget: {
    list: (IGoalData | IBudgetData) [],
    createBudget: (value: IGoal | IBudget) => void,
    updateBudget: (id: string, value: IGoal | IBudget) => void,
    deleteBudget: (id: string) => void,
  }
}

interface ITransactionStore {
  incomeList: IIncome[],
  list: { budgetId: string, amount: number, tranDate: string, remarks?: string }[],
  getGrandTotalIncome: () => number;
  getTotalIncomeOfWallet: (walletId: string) => number;
  getTotalExpenses: () => number;
  addTransaction: (budgetId: string, amount: number, remarks?: string) => void,
  addIncome: (walletId: string, amount: number, remarks?: string) => void
}

const defaultWalletList: {
  [id: string]: IWalletData
} = {
  "default": {
    id: "default",
    walletName: "Cash on Hand"
  }
}

const useStore = create<IStoreState>(persist(
  (set,get) => ({
    wallet: {
      list: defaultWalletList,
      selected: "default",
      getDefaultWallet: () => {
        var { list, selected } = get().wallet;

        return list[selected]
      }
    },
    budget: {
      list: [],
      createBudget: (value) => {
        const newId = nanoid();

        const newBudget = {
          id: newId,
          ...value
        }

        set(state => {
          state.budget.list.push(newBudget)
        })
      },
      updateBudget: (id, value) => {
        var budgetIndex = get().budget.list.findIndex(b => b.id === id)
        var nextBudget = {
          id,
          ...value
        }
        set(state => {
          state.budget.list[budgetIndex] = nextBudget
        })
      },
      deleteBudget: (id) => {
        set(state => {
          state.budget.list = get().budget.list.filter(b => b.id !== id)
        })
      }
    }}),
    {
      name: "perako-budget",
      getStorage: () => IndexedDBStorage
    }
))

export const { createBudget, updateBudget, deleteBudget } = useStore.getState().budget

const transactionStore: {
  [year: number] : {
    [month: number] : UseStore<ITransactionStore>
  }
} = {}

export const useTransactionStore = (year: number, month: number) => {
  if (!transactionStore[year]) {
    transactionStore[year] = {}
  }
  if (!transactionStore[year][month]) {
    console.log(`creating transaction store for ${year}, ${month}`)
    transactionStore[year][month] = create<ITransactionStore>(persist(
      (set, get) => ({
        incomeList: [

        ],
        list: [],
        getGrandTotalIncome: () => get().incomeList.reduce((x, y) => Number(x) + Number(y.amount),0),
        getTotalIncomeOfWallet: (walletId) => get().incomeList.filter(i => i.walletId === walletId).reduce((x, y) => x + y.amount,0),
        getTotalExpenses: () => get().list.reduce((x, y) => Number(x) + Number(y.amount), 0),
        addTransaction: (budgetId, amount, remarks) => {
          const tranDate = (new Date()).toJSON()
          set(state => {
            state.list.push({ budgetId, amount, tranDate, remarks })
          })
        },
        addIncome: (walletId, amount, remarks) => {
          const tranDate = (new Date()).toJSON()
          set(state => {
            state.incomeList.push({
              amount: amount,
              remarks,
              tranDate,
              walletId
            })
          })
        }
      }),
      {
        name: `perako-transaction-${year}-${month}`,
        getStorage: () => IndexedDBStorage
      }
    ))
  }
  return transactionStore[year][month]
}

export default useStore