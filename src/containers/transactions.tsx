import { ArrowLeftIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import useStore, { useTransactionStore } from '../app/store';
import { money } from '../app/utils';
import BudgetIcon from '../components/budget-icon';

dayjs.extend(calendar);

export default function Transactions() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const { list: transactionList } = useTransactionStore(
    +year,
    +month
  )((state) => state);
  const budgetList = useStore((state) => state.budget.list);

  let sortedList = [...transactionList];
  sortedList.reverse();
  let lastDate: string | null = null;
  return (
    <Fragment>
      <div className='sticky top-0 bg-white flex items-center font-medium'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='h-6 w-6' />
        </Link>
        Transactions
      </div>
      <ul>
        {sortedList.map((t, index) => {
          var retVal: React.ReactElement[] = [];
          var currentDate = new Date(t.tranDate).toDateString();
          const budget = budgetList.find((b) => b.id === t.budgetId);
          if (!budget) return null;
          if (lastDate !== currentDate) {
            var desc = dayjs(currentDate).calendar(undefined, {
              sameDay: '[Today]',
              lastDay: '[Yesterday]'
            });
            retVal.push(
              <li
                key={desc}
                className='bg-gray-200 px-5 py-2 text-xs sticky top-16'
              >
                {desc}
              </li>
            );
            lastDate = currentDate;
          }

          retVal.push(
            <li key={t.tranDate} className='flex justify-between items-center'>
              <div className='flex items-center'>
                <BudgetIcon budget={budget} />
                <span className='font-medium text-sm'>
                  {budget?.budgetName}
                </span>
              </div>
              <div className='text-right mr-5'>
                <div className='text-sm font-medium'>{money(t.amount)}</div>
                <div className='text-xs text-gray-600'>{t.remarks}</div>
              </div>
            </li>
          );

          return <Fragment key={index}>{retVal}</Fragment>;
        })}
      </ul>
    </Fragment>
  );
}
