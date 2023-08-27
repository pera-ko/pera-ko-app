import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import IndexedDBStorage from "../infra/indexedDBPersistence";

const PERSIST_NAME = 'label-list'

export const defaultLabels = [
  "Emergency", "Fast Food"
]

export interface ILabelStore {
  list: string[]
  createLabel: (val: string) => string
}


const useLabelStore = create<ILabelStore>()(
  persist((set, get) => ({
    list: defaultLabels,
    createLabel: val => {
      set(state => ({
        list: [...state.list, val]
        })
      )

      return val
    }
  }),
  {
    name: PERSIST_NAME,
    storage: createJSONStorage(() => IndexedDBStorage),
    version: 1
  })
)


export default useLabelStore