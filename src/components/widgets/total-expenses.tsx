import WidgetPanel from "../widget-panel";
import MoneyHeader from "../money-header";
import { useParams } from "react-router";
import { useTransactionStore } from "../../app/store";
import { useLocalStorage } from "../../app/hooks";

function TotalExpenses() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const {
    getTotalExpenses,
  } = useTransactionStore(+year, +month)((state) => state);
  const [mask, setMask] = useLocalStorage('expenses-dashboard-mask', false)

  const totalExpenses = getTotalExpenses();
  const filters = (
    <div className="flex">
      <button className="flex">
        THIS MONTH
        {/* <ChevronDownIcon className="w-4 h-4 ml-1 text-inherit" /> */}
      </button>
    </div>
  );
  return (
    <WidgetPanel title="Total Expenses" topRightElement={filters}>
      <MoneyHeader value={totalExpenses} maskValue={mask} onMask={setMask}/>
    </WidgetPanel>
  );
}

export default TotalExpenses;
