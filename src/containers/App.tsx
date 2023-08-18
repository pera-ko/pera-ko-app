import {
  Link,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';
import {
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useLocQuery, useLocalStorage } from '../app/hooks';
import { Fragment, PropsWithChildren } from 'react';
import Dashboard from './dashboard';
import Dashboard2 from './dashboard2';

const App: React.FC<PropsWithChildren> = ({ children }) => {
  const {value: newDashboard, loading } = useLocalStorage('expenses-dashboard', false);
  
  if (loading) {
    return null;
  }
  
  if (newDashboard) {
    return (
      <Dashboard2>
        {children}
      </Dashboard2>
    )
  }

  return (
    <Dashboard>
      {children}
    </Dashboard>
  )
};

export function BottomNav() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const location = useLocation();
  const history = useHistory();
  const query = useLocQuery();
  const handleNewClick = () => {
    query.set('newtran', 'open');
    history.push(`${location.pathname}?${query.toString()}`);
  };
  return (
    <Fragment>
      <div className='flex justify-center'>
        <div className='fixed bottom-8 grid grid-cols-3 backdrop-blur bg-slate-100/30 dark:bg-[#242424]/30 shadow rounded-2xl space-x-3 px-1'>
          <Link to='/' className='flex items-center justify-center px-2 py-2 text-center w-15'>
            <HomeIcon className='inline w-6 h-6' />
            {/* <div className='text-xs font-medium'></div> */}
          </Link>
          <div className='text-center'>
            <button
              className='p-4 text-white transform scale-110 rounded-full shadow-md bg-indigo-600/75 backdrop-blur'
              onClick={handleNewClick}
            >
              <PlusIcon className='w-6 h-6' />
            </button>
          </div>
          <Link
            to={`/${year}/${month}/preferences`}
            className='flex items-center justify-center px-2 py-2 text-center w-15'
          >
            <Cog6ToothIcon className='inline w-6 h-6' />
            {/* <div className='text-xs font-medium'>Settings</div> */}
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
