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
import { useLocQuery } from '../app/hooks';
import { Fragment, PropsWithChildren } from 'react';
import Dashboard from './dashboard';

const App: React.FC<PropsWithChildren> = ({ children }) => {
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
      <div className='fixed inset-x-0 bottom-0 grid grid-cols-3 px-6 bg-white shadow dark:bg-gray-700'>
        <Link to='/' className='py-2 text-center w-15'>
          <HomeIcon className='inline w-6 h-6' />
          <div className='text-xs font-medium'>Home</div>
        </Link>
        <div className='text-center'>
          <button
            className='p-4 text-white transform -translate-y-1/2 bg-indigo-600 rounded-full'
            onClick={handleNewClick}
          >
            <PlusIcon className='w-6 h-6' />
          </button>
        </div>
        <Link
          to={`/${year}/${month}/preferences`}
          className='py-2 text-center w-15'
        >
          <Cog6ToothIcon className='inline w-6 h-6' />
          <div className='text-xs font-medium'>Settings</div>
        </Link>
      </div>
    </Fragment>
  );
}

export default App;
