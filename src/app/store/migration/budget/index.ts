import { IBudgetStoreState } from '../..';
import { renameCashOnHand } from './migration-1'

const budgetStoreMigration = (persistedState: any, version: number): IBudgetStoreState => {
  switch (version) {
    case 0:
      return renameCashOnHand(persistedState)
    default:
      return persistedState
  }
}

export default budgetStoreMigration;