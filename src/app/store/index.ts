import { nanoid } from 'nanoid'
import create, { UseStore } from 'zustand'
import { persist } from 'zustand/middleware'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IBudget, IBudgetData, IGoal, IGoalData, IIncome, IWalletData } from '../@types'
import IndexedDBStorage from '../infra/indexedDBPersistence'
import storeMigration from './migration'

dayjs.extend(isBetween)

interface IStoreState {
  wallet: {
    list: {
      [id: string]: IWalletData
    },
    selected: string,
    getDefaultWallet: () => IWalletData,
    createWallet: (name: string) => void,
    updateWallet: (wallet: IWalletData) => void,
    deleteWallet: (wallet: IWalletData) => void,
    undoDeleteWallet: (wallet: IWalletData) => void
  },
  budget: {
    list: (IGoalData | IBudgetData) [],
    getEffectiveBudget: (year: number, month: number) => (IGoalData | IBudgetData) [],
    createBudget: (value: IGoal | IBudget) => void,
    updateBudget: (id: string, value: IGoal | IBudget) => void,
    deleteBudget: (id: string) => void,
  }
}

interface ITransaction { budgetId: string, walletId: string, amount: number, tranDate: string, remarks?: string }

export interface ITransactionStore {
  incomeList: IIncome[],
  list: ITransaction[],
  getGrandTotalIncome: () => number;
  getTotalIncomeOfWallet: (walletId: string) => number;
  getTotalExpenses: () => number;
  getTotalOfEachBudget: () => {name: string, value: number}[];
  getTotalOfBudget: (budgetId: string) => number;
  addTransaction: (budgetId: string, walletId: string, amount: number, remarks?: string) => void,
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
      },
      createWallet: (name) => {
        const newId = nanoid();

        const newWallet: IWalletData = {
          id: newId,
          walletName: name
        }

        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [newId] : newWallet
          }
        })
      },
      updateWallet: (wallet) => {
        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [wallet.id] : wallet
          }
        })
      },
      deleteWallet: (wallet) => {
        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [wallet.id] : {
              ...wallet,
              isDeleted: true,
              deleteDate: new Date().toJSON()
            }
          }
        })
      },
      undoDeleteWallet: wallet => {
        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [wallet.id] : {
              ...wallet,
              isDeleted: undefined,
              deleteDate: undefined
            }
          }
        })
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
export const { getDefaultWallet, createWallet, updateWallet, deleteWallet, undoDeleteWallet } = useStore.getState().wallet

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
        getTotalOfBudget: (budgetId) => {
          return get().list.filter(t => t.budgetId === budgetId).reduce((tot, t) => Number(tot) + Number(t.amount), 0)
        },
        addTransaction: (budgetId, walletId, amount, remarks) => {
          const tranDate = (new Date()).toJSON()
          set(state => {
            state.list.push({ budgetId, walletId, amount, tranDate, remarks })
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
        getStorage: () => IndexedDBStorage,
        migrate: storeMigration.transactionStore,
        version: 1
      }
    ))
  }
  return transactionStore[year][month]
}

export default useStore