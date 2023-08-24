import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import IndexedDBStorage from "../infra/indexedDBPersistence";
import { IBudget, IBudgetData, IGoal, IGoalData, IWalletData } from "../@types";
import storeMigration from "./migration";

dayjs.extend(isBetween)

export interface IBudgetStoreState {
  wallet: {
    list: {
      [id: string]: IWalletData
    },
    selected: string,
    setDefaultWallet: (wallet: IWalletData) => void,
    getDefaultWallet: () => IWalletData,
    createWallet: (name: string, type: "credit-card" | "e-wallet" | "cash") => void,
    updateWallet: (wallet: IWalletData) => void,
    deleteWallet: (wallet: IWalletData) => void,
    undoDeleteWallet: (wallet: IWalletData) => void
  },
  budget: {
    list: (IGoalData | IBudgetData)[],
    getEffectiveBudget: (year: number, month: number) => (IGoalData | IBudgetData)[],
    createBudget: (value: IGoal | IBudget) => void,
    updateBudget: (id: string, value: IGoal | IBudget) => void,
    deleteBudget: (id: string) => void,
  }
}

const defaultWalletList: {
  [id: string]: IWalletData
} = {
  "default": {
    id: "default",
    walletName: "Cash",
    type: "cash"
  }
}

const useBudgetStore = create<IBudgetStoreState>()(persist(
  (set, get) => ({
    wallet: {
      list: defaultWalletList,
      selected: "default",
      getDefaultWallet: () => {
        var { list, selected } = get().wallet;

        return list[selected]
      },
      setDefaultWallet: (wallet) => {
        set(state => {
          state.wallet.selected = wallet.id
          return state
        })
      },
      createWallet: (name, type) => {
        const newId = nanoid();

        const newWallet: IWalletData = {
          id: newId,
          walletName: name,
          type
        }

        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [newId]: newWallet
          }

          return state;
        })
      },
      updateWallet: (wallet) => {
        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [wallet.id]: wallet
          }
          return state;
        })
      },
      deleteWallet: (wallet) => {
        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [wallet.id]: {
              ...wallet,
              isDeleted: true,
              deleteDate: new Date().toJSON()
            }
          }
          return state;
        })
      },
      undoDeleteWallet: wallet => {
        set(state => {
          state.wallet.list = {
            ...state.wallet.list,
            [wallet.id]: {
              ...wallet,
              isDeleted: undefined,
              deleteDate: undefined
            }
          }
          return state;
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
          return state;
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
          return state;
        })
      },
      deleteBudget: (id) => {
        set(state => {
          state.budget.list = get().budget.list.filter(b => b.id !== id)
          return state;
        })
      }
    }
  }),
  {
    name: "perako-budget",
    storage: createJSONStorage(() => IndexedDBStorage),
    migrate: storeMigration.budgetStore,
    version: 1,
  }
))

export const { getEffectiveBudget, createBudget, updateBudget, deleteBudget } = useBudgetStore.getState().budget
export const { getDefaultWallet, setDefaultWallet, createWallet, updateWallet, deleteWallet, undoDeleteWallet } = useBudgetStore.getState().wallet

export default useBudgetStore