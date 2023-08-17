import shallow from "zustand/shallow"
import { useBudgetStore } from "../../app/store"
import useAggregateStore from "../../app/store/aggregate-store"
import ExpenseList from "../expense-list"
import WidgetPanel from "../widget-panel"

const RecentExpenses = () => {
  const { budget, wallets } = useBudgetStore(state => ({ budget: state.budget.list, wallets: state.wallet.list }), shallow)
  const { getLast10 } = useAggregateStore(state => state)

  return (
    <WidgetPanel title="RECENT EXPENSES">
      <ExpenseList
        items={getLast10()}
        budgetList={budget}
        walletList={wallets}
        />
    </WidgetPanel>
  )
}

export default RecentExpenses