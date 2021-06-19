import { nanoid } from 'nanoid'
import create, { UseStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBudget, IGoal } from '../@types'
import IndexedDBStorage from '../infra/indexedDBPersistence'

export interface WithId {
  id: string
}

interface IStoreState {
  budget: {
    list: (IGoal & WithId | IBudget & WithId) [],
    createBudget: (value: IGoal | IBudget) => void,
    updateBudget: (id: string, value: IGoal | IBudget) => void,
    deleteBudget: (id: string) => void,
  }
}

interface ITransactionStore {
  list: { budgetId: string, amount: number, tranDate: string, remarks?: string }[],
  getTotalExpenses: () => number;
  addTransaction: (budgetId: string, amount: number, remarks?: string) => void
}

const useStore = create<IStoreState>(persist(
  (set,get) => ({
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
        list: [],
        getTotalExpenses: () => get().list.reduce((x, y) => Number(x) + Number(y.amount), 0),
        addTransaction: (budgetId, amount, remarks) => {
          const tranDate = (new Date()).toJSON()
          set(state => {
            state.list.push({ budgetId, amount, tranDate, remarks })
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