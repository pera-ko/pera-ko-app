import { ArrowCircleDownIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { Fragment } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useTransactionStore } from '../app/store';
import { money } from '../app/utils';

dayjs.extend(calendar);

export default function Income() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const incomeRoute = useRouteMatch('/:year/:month/income/new');
  const { incomeList } = useTransactionStore(+year, +month)((state) => state);

  let lastDate: string | null = null;
  console.log(incomeRoute);
  return (
    <Fragment>
      <div className='sticky h- top-0 bg-white flex items-center font-medium'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='h-6 w-6' />
        </Link>
        Income
      </div>
      <ul>
        {incomeList.map((income) => {
          var retVal: React.ReactElement[] = [];
          var currentDate = new Date(income.tranDate).toDateString();

          if (lastDate !== currentDate) {
            var desc = dayjs(currentDate).calendar(undefined, {
              sameDay: '[Today]',
              lastDay: '[Yesterday]'
            });
            retVal.push(
              <IncomeHeader key={desc} date='Friday, June 30, 2021' />
            );
            lastDate = currentDate;
          }

          retVal.push(
            <IncomeItem amount={income.amount} remarks={income.remarks} />
          );
          return <Fragment>{retVal}</Fragment>;
        })}
      </ul>
      <Link
        to={`/${year}/${month}/income/new`}
        className='fixed bottom-5 right-5 text-sm font-medium p-3 bg-indigo-500 text-white rounded-full shadow-md'
      >
        <ArrowCircleDownIcon className='h-6 w-6 mr-3 inline-block' />
        Add Income
      </Link>
    </Fragment>
  );
}

function IncomeHeader({ date }: { date: string }) {
  return (
    <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>{date}</li>
  );
}

interface IncomeItemProps {
  amount: number;
  remarks?: string;
}
function IncomeItem({ amount, remarks }: IncomeItemProps) {
  return (
    <li className='flex justify-between items-center'>
      <ArrowCircleDownIcon className='h-6 w-6 mx-5 my-3 text-gray-600' />
      <div className='text-right mr-5'>
        <div className='text-sm font-medium'>{money(amount)}</div>
        <div className='text-xs text-gray-600'>{remarks}</div>
      </div>
    </li>
  );
}
