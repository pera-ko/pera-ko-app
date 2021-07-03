import { ITransactionStore } from '..';
import { transaction } from './migration-1'

const storeMigration = (persistedState: any, version: number): ITransactionStore => {
  switch(version) {
    case 0:
      return transaction(persistedState)
    default:
      return persistedState
  }
}

export default {
  transactionStore: storeMigration
};