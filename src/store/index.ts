import { nanoid } from 'nanoid'
import create from 'zustand'
import { IBudget, IGoal } from '../app/@types'

export interface WithId {
  id: string
}

interface IStoreState {
  budget: {
    list: (IGoal & WithId | IBudget & WithId) [],
    createBudget: (value: IGoal | IBudget) => void,
    updateBudget: (id: string, value: IGoal | IBudget) => void
  }
}

const useStore = create<IStoreState>((set,get) => ({
  budget: {
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
  }
}))

export default useStore