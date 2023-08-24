import { shallow } from "zustand/shallow"
import { useBudgetStore } from "../../app/store"
import useAggregateStore from "../../app/store/aggregate-store"
import ExpenseList from "../expense-list"
import WidgetPanel from "../widget-panel"

const RecentExpenses = () => {
  const last10 = useAggregateStore(state => state.transactions.last10)
  const { budget, wallets } = useBudgetStore(state => ({ budget: state.budget.list, wallets: state.wallet.list }), shallow)

  return (
    <WidgetPanel title="RECENT EXPENSES" sticky>
      <ExpenseList
        items={last10}
        budgetList={budget}
        walletList={wallets}
        />
    </WidgetPanel>
  )
}

export default RecentExpenses