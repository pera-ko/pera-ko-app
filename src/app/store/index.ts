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
  addTransaction: (budgetId: string, amount: number, remarks?: string) => void
}

const useStore = create<IStoreState>(persist(
  (set,get) => ({
    budget: {
      // list: [],
      list: [
        {id: "2_fu2yP4SSNCoyI9ezMPz", budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
        {id: "h1s4aoJLmaCnm8HkHrVsW", budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
        {id: "eNcsgjDJ1kjme8WFbRowF", budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
        {id: "iWVmgsI8yt_yWP-H7VoyQ", budgetName: "House", amount: 3000, icon: "🏠", type: "goal", color: "yellow", installmentType: "semi-monthly", startDate: new Date(2020, 10, 1).toJSON()},
      ],
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