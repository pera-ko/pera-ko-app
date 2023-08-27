import useAggregateStore from "../../app/store/aggregate-store"
import ExpenseList from "../expense-list"
import WidgetPanel from "../widget-panel"

const RecentExpenses = () => {
  const last10 = useAggregateStore(state => state.transactions.last10)

  return (
    <WidgetPanel title="RECENT EXPENSES" sticky>
      <ExpenseList items={last10} />
    </WidgetPanel>
  )
}

export default RecentExpenses