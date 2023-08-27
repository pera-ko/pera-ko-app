import { useRouteMatch } from "react-router";
import { setDefaultWallet, useBudgetStore, useTransactionStore } from "../app/store";
import { shallow } from "zustand/shallow";
import AppBar from "../components/appbar";
import { Cell, Pie, PieChart } from "recharts";
import SelectWallet from "../components/select-wallet";
import { money } from "../app/utils";
import { Link } from "react-router-dom";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import NewTransaction from "./new-transaction";
import { PropsWithChildren } from "react";

const Dashboard: React.FC<PropsWithChildren> = ({ children }) => {
  const appPath = useRouteMatch('/:year/:month');
  const expensesMatch = useRouteMatch(`${appPath?.url}/expenses`);
  const incomeMatch = useRouteMatch(`${appPath?.url}/income`);
  const budgetList = useBudgetStore((state) => state.budget.list);
  const { walletList, selectedWalletId } = useBudgetStore(
    (state) => ({
      walletList: state.wallet.list,
      selectedWalletId: state.wallet.selected
    }),
    shallow
  );
  const {
    getTotalExpenses,
    getTotalExpensesOfWallet,
    getGrandTotalIncome,
    getTotalIncomeOfWallet,
    getTotalOfEachBudget
  } = useTransactionStore((state) => state);

  const defaultWallet = walletList[selectedWalletId];
  const totalIncome = getGrandTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalWalletExpenses = getTotalExpensesOfWallet(selectedWalletId);
  const balance =
    getTotalIncomeOfWallet(defaultWallet.id) - totalWalletExpenses;
  const chartData = getTotalOfEachBudget();

  const colors = chartData.map(
    (data) => budgetList.find((b) => b.id === data.name)!.color
  );

  return (
    <div>
      <div
        style={{ minHeight: '220px' }}
        className={`flex flex-col justify-between transition-all ease-in-out duration-150 bg-slate-200 dark:bg-dark`}
      >
        <AppBar />
        <div className='flex items-center justify-between px-6'>
          <div className='flex-1 text-center'>
            <PieChart className='inline-block' width={125} height={100}>
              <Pie
                data={chartData}
                cy={85}
                startAngle={180}
                endAngle={0}
                innerRadius={35}
                outerRadius={60}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    strokeWidth={0.5}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className='text-right'>
            <SelectWallet
              value={defaultWallet}
              items={Object.values(walletList)}
              onChange={setDefaultWallet}
            />
            {/* <div className='flex items-center justify-end text-sm font-medium'>
              {defaultWallet.walletName}{' '}
              <ChevronDownIcon className='inline-block w-4 h-4' />{' '}
            </div> */}
            <div className='text-3xl font-medium whitespace-nowrap font-money'>
              {money(balance)}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 px-10 mt-5'>
          <div className='flex justify-center'>
            <Link to={`${appPath?.url}/income`}>
              <div className='items-center text-xs font-medium text-link'>
                <ArrowTrendingDownIcon className='inline-block w-4 h-4 mr-1' />
                Income
              </div>
              <div className='ml-5 font-medium text-number'>
                {money(totalIncome)}
              </div>
              <div className='flex justify-center mt-2'>
                <div
                  className={`w-0 h-0 border-b-[.5rem] 
                    ${incomeMatch 
                      ? ' border-b-slate-50 dark:border-b-[#242424]' 
                      : 'border-b-transparent'}`}
                  style={{
                    borderLeft: '.35rem solid transparent',
                    borderRight: '.35rem solid transparent',
                  }}
                ></div>
              </div>
            </Link>
          </div>
          <div className='flex justify-center'>
            <Link to={`${appPath?.url}/expenses`} className='inline mx-auto'>
              <div className='items-center text-xs font-medium text-link'>
                <ArrowTrendingUpIcon className='inline-block w-4 h-4 mr-1' />
                Expenses
              </div>
              <div className='ml-5 font-medium text-number'>
                {money(totalExpenses)}
              </div>
              <div className='flex justify-center mt-2'>
                <div
                  className={`w-0 h-0 border-b-[.5rem] 
                    ${expensesMatch 
                      ? 'border-b-slate-50 dark:border-b-[#242424]' 
                      : 'border-b-transparent'}`}
                  style={{
                    borderLeft: '.35rem solid transparent',
                    borderRight: '.35rem solid transparent',
                  }}
                ></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {children}
      <NewTransaction />
    </div>
  );
}

export default Dashboard