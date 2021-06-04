import { Link, useParams, useRouteMatch } from "react-router-dom";
import { AdjustmentsIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HomeIcon, PlusIcon, TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/outline'
import { stringify } from "querystring";

const App: React.FC = ({ children }) => {
  let appPath = useRouteMatch("/:year/:month")
  let expensesMatch = useRouteMatch(`${appPath?.url}/expenses`);
  let incomeMatch = useRouteMatch(`${appPath?.url}/income`);
  return (
    <div>
      <div className={`bg-gradient-to-bl from-indigo-100 via-indigo-300 to-indigo-400 transition-all ease-in-out duration-150 ${appPath?.isExact ? 'rounded-b-3xl' : ''} ` }>
        <Navbar/>
        <div className='flex justify-between px-6'>
          <div className="chart"></div>
          <div className='text-right'>
            <div className='text-sm font-medium flex items-center justify-end'>
              Cash on Hand <ChevronDownIcon className='h-4 w-4 inline-block'/> </div>
            <div className='text-xl font-medium'>PHP 4,763.12</div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 px-10 mt-5'>
          <Link to={`${appPath?.url}/income`}>
            <div className='text-xs font-medium flex items-center  text-link'>
              <TrendingDownIcon className='h-4 w-4 mr-1 inline-block'/>
              Income
            </div>
            <div className='text-xs font-medium pl-5'>PHP 998,380.45</div>
            <div className='flex justify-center mt-2'>
              <div className='w-0 h-0' style={{borderLeft: '.35rem solid transparent', borderRight: '.35rem solid transparent', borderBottom: `.5rem solid ${incomeMatch ? 'white' : 'transparent'}`}}></div>
            </div>
          </Link>
          <Link to={`${appPath?.url}/expenses`}>
            <div className='text-xs font-medium flex items-center text-link'>
              <TrendingUpIcon className='h-4 w-4 mr-1 inline-block'/>
              Expenses
            </div>
            <div className='text-xs font-medium pl-5'>PHP 880.45</div>
            <div className='flex justify-center mt-2'>
              <div className='w-0 h-0' style={{borderLeft: '.35rem solid transparent', borderRight: '.35rem solid transparent', borderBottom: `.5rem solid ${expensesMatch ? 'white' : 'transparent'}`}}></div>
            </div>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function Navbar () {
  const { year, month } = useParams<{year: string, month: string}>();

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
        <img className='h-10 w-10 m-auto rounded-full' src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
        </Link>
        <div>
          <span className='font-medium mr-1'>{shortMonths[+month-1]}</span>
          <span>{year}</span>
        </div>
      </div>
      <div className='flex items-center'>
        <Link to={`/${prevYear}/${prevMonth}`} className='py-5 px-4'>
          <ChevronLeftIcon className='h-6 w-6'/>
        </Link>
        <Link to={`/${nextYear}/${nextMonth}`} className='py-5 px-4'>
          <ChevronRightIcon className='h-6 w-6'/>
        </Link>
      </div>
    </div>
  )
}

export function BottomNav() {
  return (
    <div className='bg-white border-t grid grid-cols-3 px-6 fixed inset-x-0 bottom-0'>
      <Link to='/preferences' className='text-center py-2 w-15'>
        <HomeIcon className='h-6 w-6 inline'/>
        <div className='text-xs font-medium'>Home</div>
      </Link>
      <div className='text-center'>
        <button className='p-4 bg-indigo-500 text-white rounded-full transform -translate-y-1/2'>
          <PlusIcon className='h-6 w-6'/>
        </button>
      </div>
      <Link to='/preferences' className='text-center py-2 w-15'>
        <AdjustmentsIcon className='h-6 w-6 inline'/>
        <div className='text-xs font-medium'>Preferences</div>
      </Link>
    </div>
  )
}

export default App;
