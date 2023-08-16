import { ITransactionStore } from "../..";

export function transaction(persistedState: any): ITransactionStore {
  return {
    ...persistedState,
    list: persistedState.list.map((tran: any) => {
      tran.walletId = "default";
      return tran;
    })
  }
}