import WidgetPanel from "../../shared/components/widget-panel";
import MoneyHeader from "../../shared/components/money-header";
import { useRouteMatch } from "react-router";
import { useTransactionStore } from "../../app/store";
import { Link } from "react-router-dom";
import useLocalStorage from "../../shared/hooks/use-local-storage";

function TotalExpenses() {
  const appPath = useRouteMatch('/:year/:month');
  const {
    getTotalExpenses,
  } = useTransactionStore((state) => state);
  const { value: mask, setValue: setMask } = useLocalStorage('expenses-dashboard-mask', false)

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
      <Link to={`${appPath?.url}/expenses`} className='block px-2'>
        <MoneyHeader value={totalExpenses} maskValue={mask} onMask={setMask}/>
      </Link>
    </WidgetPanel>
  );
}

export default TotalExpenses;
