import budgetStoreMigration from "./budget"
import transactionStoreMigration from "./transaction"

const storeMigration = {
  budgetStore: budgetStoreMigration,
  transactionStore: transactionStoreMigration
}

export default storeMigration