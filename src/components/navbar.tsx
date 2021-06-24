import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { shortMonths } from '../app/constants';

export default function Navbar() {
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
      <div className='flex items-center pl-4'>
        {/* <Link to='/' className='py-5 px-4'>
          <img
            className='h-10 w-10 m-auto rounded-full'
            src='https://randomuser.me/api/portraits/men/32.jpg'
            alt=''
          />
        </Link> */}
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
