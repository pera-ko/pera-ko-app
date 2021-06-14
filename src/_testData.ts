import { IBudget, IGoal } from "./@types";

const budgetList: (IGoal | IBudget)[] = [
  {budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "goal", color: "yellow", installmentType: "semi-monthly", startDate: new Date(2020, 10, 1).toJSON()},
  {budgetName: "Pag-ibig MP2", amount: 2500, icon: "💗", type: "goal", color: "red", installmentType: "semi-monthly", startDate: new Date(2020, 1, 1).toJSON()},
  {budgetName: "Coins.ph", amount: 1000, icon: "📈", type: "goal", color: "gold", installmentType: "semi-monthly", startDate: new Date(2020, 1, 1).toJSON()},
  {budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"},
  {budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
  {budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
  {budgetName: "Meralco", amount: 8000, icon: "⚡", type: "budget", color: "orange"},
  {budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
  {budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "budget", color: "yellow"},
  {budgetName: "Pag-ibig MP2", amount: 3500, icon: "💗", type: "budget", color: "red"},
  {budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"},
  {budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
  {budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
  {budgetName: "Meralco", amount: 8000, icon: "⚡", type: "budget", color: "orange"},
  {budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
  {budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "budget", color: "yellow"},
  {budgetName: "Pag-ibig MP2", amount: 3500, icon: "💗", type: "budget", color: "red"},
  {budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"},
  {budgetName: "Food", amount: 4000, icon: "🍔", type: "budget", color: "violet"},
  {budgetName: "Transpo", amount: 4000, icon: "🚂", type: "budget", color: "green"},
  {budgetName: "Meralco", amount: 8000, icon: "⚡", type: "budget", color: "orange"},
  {budgetName: "Gadgets", amount: 2000, icon: "🎧", type: "budget", color: "blue"},
]
const testData = {
  budgetList
}
export default testData