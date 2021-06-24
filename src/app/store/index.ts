import { nanoid } from 'nanoid'
import create, { UseStore } from 'zustand'
import { persist } from 'zustand/middleware'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IBudget, IBudgetData, IGoal, IGoalData, IIncome, IWalletData } from '../@types'
import IndexedDBStorage from '../infra/indexedDBPersistence'

dayjs.extend(isBetween)

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
    getEffectiveBudget: (year: number, month: number) => (IGoalData | IBudgetData) [],
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
  getTotalOfEachBudget: () => {name: string, value: number}[]
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
      getEffectiveBudget: (year, month) => {
        return get().budget.list.filter(b => {
          if (b.type === "budget") {
            return true;
          } else {
            const startDate = dayjs(b.startDate)
            const endDate = !b.endDate ? 
                                dayjs() : 
                                (b.endDate === "1970-01-01T00:00:00.000Z" ? dayjs() : dayjs(b.endDate))
            return dayjs(`${year}-${month}-01`).isBetween(startDate, endDate, 'day', '[]')
          }
        })
      },
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

export const { getEffectiveBudget, createBudget, updateBudget, deleteBudget } = useStore.getState().budget
export const { getDefaultWallet } = useStore.getState().wallet

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
        getTotalIncomeOfWallet: (walletId) => get().incomeList.filter(i => i.walletId === walletId).reduce((x, y) => Number(x) + Number(y.amount),0),
        getTotalExpenses: () => get().list.reduce((x, y) => Number(x) + Number(y.amount), 0),
        getTotalOfEachBudget: () => {
          let retval: { name: string, value: number }[] = [];
          
          get().list.forEach(tran => {
            var g = retval.find(x => x.name === tran.budgetId)
            if (!g) {
              retval.push({name: tran.budgetId, value: Number(tran.amount)})
            } else {
              g.value += Number(tran.amount);
            }
          })

          return retval;
        },
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