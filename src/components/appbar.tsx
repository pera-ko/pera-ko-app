import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { shortMonths } from '../app/constants';

export default function AppBar() {
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
    <div className='fixed inset-x-0 flex justify-between top-0 backdrop-blur bg-slate-100/30 dark:bg-[#242424]/30'>
      <div className='flex items-center pl-4'>
        {/* <Link to='/' className='px-4 py-5'>
          <img
            className='w-10 h-10 m-auto rounded-full'
            src='https://randomuser.me/api/portraits/men/32.jpg'
            alt=''
          />
        </Link> */}
        <div className='ml-1 text-xl font-money'>
          <span className='mr-1 font-medium uppercase'>
            {shortMonths[+month - 1]}
          </span>
          <span>{year}</span>
        </div>
      </div>
      <div className='flex items-center'>
        <Link to={`/${prevYear}/${prevMonth}`} className='px-4 py-5'>
          <ChevronLeftIcon className='w-6 h-6' />
        </Link>
        <Link to={`/${nextYear}/${nextMonth}`} className='px-4 py-5'>
          <ChevronRightIcon className='w-6 h-6' />
        </Link>
      </div>
    </div>
  );
}
