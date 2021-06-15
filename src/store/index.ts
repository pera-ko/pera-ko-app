import { nanoid } from 'nanoid'
import create from 'zustand'
import { IBudget, IGoal } from '../@types'

export interface WithId {
  id: string
}

interface IStoreState {
  budget: {
    list: (IGoal & WithId | IBudget & WithId) [],
    createBudget: (value: IGoal | IBudget) => void
  }
}

const useStore = create<IStoreState>((set,get) => ({
  budget: {
    list: [
      {id: "iWVmgsI8yt_yWP-H7VoyQ", budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "goal", color: "yellow", installmentType: "semi-monthly", startDate: new Date(2020, 10, 1).toJSON()},
      {id: "5t_Votl4QJaWWfhxzu8sC", budgetName: "Pag-ibig MP2", amount: 2500, icon: "💗", type: "goal", color: "red", installmentType: "semi-monthly", startDate: new Date(2020, 1, 1).toJSON()},
      {id: "Ezrn_IsbbBVGUbbSH-9J5", budgetName: "Coins.ph", amount: 1000, icon: "📈", type: "goal", color: "gold", installmentType: "semi-monthly", startDate: new Date(2020, 1, 1).toJSON()},
      {id: "lWJLkqrlA9-0jxiAiGRku", budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"},
      {id: "2_fu2yP4SSNCoyI9ezMPz", budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
      {id: "h1s4aoJLmaCnm8HkHrVsW", budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
      {id: "UxVIVBS5q_e3dBHQsVCfL", budgetName: "Meralco", amount: 8000, icon: "⚡", type: "budget", color: "orange"},
      {id: "eNcsgjDJ1kjme8WFbRowF", budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
      {id: "41XafkHsyS95Fz5796Q-i", budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "budget", color: "yellow"},
      {id: "D___Z8K9Q8ZVaDLbzMLkH", budgetName: "Pag-ibig MP2", amount: 3500, icon: "💗", type: "budget", color: "red"},
      {id: "RK7OYhYnS4BATbDZP9jIB", budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"},
      {id: "v3vuWsfaEOJR4pcdnUA_V", budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
      {id: "ssnrTLXwF1XOSQG2JzWWt", budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
      {id: "0bDnz5x9qvIcUPZ5mB16_", budgetName: "Meralco", amount: 8000, icon: "⚡", type: "budget", color: "orange"},
      {id: "yCQJmQvJy5wrYuSSNFyJ4", budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
      {id: "sajXmhIBfXlUlUNY8SWRl", budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "budget", color: "yellow"},
      {id: "WT0yI21r6hAb_OH_fkW6N", budgetName: "Pag-ibig MP2", amount: 3500, icon: "💗", type: "budget", color: "red"},
      {id: "iSCAbM8KRCCxvImILxbQZ", budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"},
      {id: "uZ9AtNVkB-1LYcI0a4v3h", budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
      {id: "2Qw_BaTmnaPVGLIeHLlMK", budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
      {id: "jrMTHFOzltEvYkWdNVmVx", budgetName: "Meralco", amount: 8000, icon: "⚡", type: "budget", color: "orange"},
      {id: "Cuu1mwNDzKXo59L2mb7SV", budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
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
    }
  }
}))

export default useStore