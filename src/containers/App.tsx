import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import {
  AdjustmentsIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon
} from '@heroicons/react/outline';
import { useQuery } from '../app/hooks';
import NewTransaction from './new-transaction';
import useStore, { getDefaultWallet, useTransactionStore } from '../app/store';
import { money } from '../app/utils';
import { useEffect, useState } from 'react';

const App: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { year, month } = useParams<{ year: string; month: string }>();
  const query = useQuery();
  const appPath = useRouteMatch('/:year/:month');
  const expensesMatch = useRouteMatch(`${appPath?.url}/expenses`);
  const incomeMatch = useRouteMatch(`${appPath?.url}/income`);
  const { getTotalExpenses, getGrandTotalIncome, getTotalIncomeOfWallet } =
    useTransactionStore(+year, +month)((state) => state);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  const isNewTransactionOpen = query.get('newtran') === 'open';

  if (loading) {
    return <div>Loading...</div>;
  }

  var defaultWallet = getDefaultWallet();
  var totalIncome = getGrandTotalIncome();
  var totalExpenses = getTotalExpenses();
  var balance = getTotalIncomeOfWallet(defaultWallet.id) - totalExpenses;

  return (
    <div>
      <div
        style={{ height: '35vh', minHeight: '220px' }}
        className={`flex flex-col justify-between bg-gradient-to-bl from-white  to-indigo-300 transition-all ease-in-out duration-150 ${
          appPath?.isExact ? 'rounded-b-5xl' : ''
        } `}
      >
        <Navbar />
        <div className='flex justify-between px-6'>
          <div className='chart'></div>
          <div className='text-right'>
            <div className='text-sm font-medium flex items-center justify-end'>
              {defaultWallet.walletName}{' '}
              <ChevronDownIcon className='h-4 w-4 inline-block' />{' '}
            </div>
            <div className='text-3xl font-medium'>{money(balance)}</div>
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
      {isNewTransactionOpen && <NewTransaction />}
    </div>
  );
};

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function Navbar() {
  const { year, month } = useParams<{ year: string; month: string }>();

  let nextMonth = +month + 1;
  let nextYear = +year;
  let prevMonth = +month - 1;
  let prevYear = +year;

  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear = nextYear + 1;
  }

  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear = prevYear - 1;
  }

  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <Link to='/' className='py-5 px-4'>
          <img
            className='h-10 w-10 m-auto rounded-full'
            src='https://randomuser.me/api/portraits/men/32.jpg'
            alt=''
          />
        </Link>
        <div className='text-xl ml-1'>
          <span className='font-medium mr-1 uppercase'>
            {shortMonths[+month - 1]}
          </span>
          <span>{year}</span>
        </div>
      </div>
      <div className='flex items-center'>
        <Link to={`/${prevYear}/${prevMonth}`} className='py-5 px-4'>
          <ChevronLeftIcon className='h-6 w-6' />
        </Link>
        <Link to={`/${nextYear}/${nextMonth}`} className='py-5 px-4'>
          <ChevronRightIcon className='h-6 w-6' />
        </Link>
      </div>
    </div>
  );
}

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
  );
}

export default App;
