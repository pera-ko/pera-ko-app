import { IBudgetStoreState } from "../..";
import { IWalletData } from "../../../@types";

export function renameCashOnHand(persistedState: IBudgetStoreState): IBudgetStoreState {

  const newWallet = Object.assign({}, persistedState.wallet.list)

  if (newWallet['default'] && newWallet['default'].walletName === 'Cash on Hand') {
    newWallet['default'].walletName = 'Cash'
  }

  return {
    ...persistedState,
    wallet: {
      ...persistedState.wallet,
      list: newWallet
    }
  }
}