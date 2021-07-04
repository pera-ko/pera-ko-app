import shallow from 'zustand/shallow';
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import {
  AdjustmentsIcon,
  HomeIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon
} from '@heroicons/react/outline';
import { useQuery } from '../app/hooks';
import NewTransaction from './new-transaction';
import useStore, { setDefaultWallet, useTransactionStore } from '../app/store';
import { money } from '../app/utils';
import { Fragment } from 'react';
import Navbar from '../components/navbar';
import { PieChart, Pie, Cell } from 'recharts';
import SelectWallet from '../components/select-wallet';

const App: React.FC = ({ children }) => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const appPath = useRouteMatch('/:year/:month');
  const expensesMatch = useRouteMatch(`${appPath?.url}/expenses`);
  const incomeMatch = useRouteMatch(`${appPath?.url}/income`);
  const budgetList = useStore((state) => state.budget.list);
  const { walletList, selectedWalletId } = useStore(
    (state) => ({
      walletList: state.wallet.list,
      selectedWalletId: state.wallet.selected
    }),
    shallow
  );
  const {
    getTotalExpensesOfWallet,
    getGrandTotalIncome,
    getTotalIncomeOfWallet,
    getTotalOfEachBudget
  } = useTransactionStore(+year, +month)((state) => state);

  const defaultWallet = walletList[selectedWalletId];
  const totalIncome = getGrandTotalIncome();
  const totalExpenses = getTotalExpensesOfWallet(selectedWalletId);
  const balance = getTotalIncomeOfWallet(defaultWallet.id) - totalExpenses;
  const chartData = getTotalOfEachBudget();

  const colors = chartData.map(
    (data) => budgetList.find((b) => b.id === data.name)!.color
  );

  return (
    <div>
      <div
        style={{ height: '35vh', minHeight: '220px' }}
        className={`flex flex-col justify-between bg-gradient-to-bl from-white  to-indigo-300 transition-all ease-in-out duration-150 ${
          appPath?.isExact ? 'rounded-b-2xl' : ''
        } `}
      >
        <Navbar />
        <div className='flex justify-between px-6 items-center'>
          <div className='flex-1 text-center'>
            <PieChart className='inline-block' width={150} height={100}>
              <Pie
                data={chartData}
                cy={85}
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={70}
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
            {/* <div className='text-sm font-medium flex items-center justify-end'>
              {defaultWallet.walletName}{' '}
              <ChevronDownIcon className='h-4 w-4 inline-block' />{' '}
            </div> */}
            <div className='text-3xl font-medium whitespace-nowrap'>
              {money(balance)}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 px-10 mt-5'>
          <div className='flex justify-center'>
            <Link to={`${appPath?.url}/income`}>
              <div className='text-xs font-medium items-center  text-link'>
                <TrendingDownIcon className='h-4 w-4 mr-1 inline-block' />
                Income
              </div>
              <div className='text-number font-medium ml-5'>
                {money(totalIncome)}
              </div>
              <div className='flex justify-center mt-2'>
                <div
                  className='w-0 h-0'
                  style={{
                    borderLeft: '.35rem solid transparent',
                    borderRight: '.35rem solid transparent',
                    borderBottom: `.5rem solid ${
                      incomeMatch ? 'white' : 'transparent'
                    }`
                  }}
                ></div>
              </div>
            </Link>
          </div>
          <div className='flex justify-center'>
            <Link to={`${appPath?.url}/expenses`} className='mx-auto inline'>
              <div className='text-xs font-medium items-center text-link'>
                <TrendingUpIcon className='h-4 w-4 mr-1 inline-block' />
                Expenses
              </div>
              <div className='text-number font-medium ml-5'>
                {money(totalExpenses)}
              </div>
              <div className='flex justify-center mt-2'>
                <div
                  className='w-0 h-0'
                  style={{
                    borderLeft: '.35rem solid transparent',
                    borderRight: '.35rem solid transparent',
                    borderBottom: `.5rem solid ${
                      expensesMatch ? 'white' : 'transparent'
                    }`
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
};

export function BottomNav() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const handleNewClick = () => {
    query.set('newtran', 'open');
    history.push(`${location.pathname}?${query.toString()}`);
  };
  return (
    <Fragment>
      <div className='bg-white border-t grid grid-cols-3 px-6 fixed inset-x-0 bottom-0'>
        <Link to='/' className='text-center py-2 w-15'>
          <HomeIcon className='h-6 w-6 inline' />
          <div className='text-xs font-medium'>Home</div>
        </Link>
        <div className='text-center'>
          <button
            className='p-4 bg-indigo-500 text-white rounded-full transform -translate-y-1/2'
            onClick={handleNewClick}
          >
            <PlusIcon className='h-6 w-6' />
          </button>
        </div>
        <Link
          to={`/${year}/${month}/preferences`}
          className='text-center py-2 w-15'
        >
          <AdjustmentsIcon className='h-6 w-6 inline' />
          <div className='text-xs font-medium'>Preferences</div>
        </Link>
      </div>
    </Fragment>
  );
}

export default App;
