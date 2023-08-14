import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import useStore, { ITransaction, useTransactionStore } from '../app/store';
import { money } from '../app/utils';
import BudgetIcon from '../components/budget-icon';
import shallow from 'zustand/shallow';

dayjs.extend(calendar);

export default function Transactions() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const { list: transactionList } = useTransactionStore(
    +year,
    +month
  )((state) => state);
  const { budgetList, walletList } = useStore(
    (state) => ({
      budgetList: state.budget.list,
      walletList: state.wallet.list
    }),
    shallow
  );

  let sortedList: ITransaction[] = [
    ...transactionList.filter((t) => t.type === undefined)
  ] as ITransaction[];
  sortedList.reverse();
  let lastDate: string | null = null;
  return (
    <Fragment>
      <div className='sticky top-0 flex items-center font-medium bg-white dark:bg-dark'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='w-6 h-6' />
        </Link>
        Expenses
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
                className='sticky px-5 py-2 text-xs bg-gray-200 dark:bg-zinc-900 top-16'
              >
                {desc}
              </li>
            );
            lastDate = currentDate;
          }

          retVal.push(
            <li key={t.tranDate} className='flex items-center justify-between'>
              <div className='flex items-center'>
                <BudgetIcon budget={budget} />
                <div>
                  <div className='text-sm font-medium'>
                    {budget?.budgetName}
                  </div>
                  <div className='text-xs'>
                    {walletList[t.walletId].walletName}
                  </div>
                </div>
              </div>
              <div className='mr-5 text-right'>
                <div className='text-sm font-medium'>{money(t.amount)}</div>
                <div className='text-xs text-gray-500'>{t.remarks}</div>
              </div>
            </li>
          );

          return <Fragment key={index}>{retVal}</Fragment>;
        })}
      </ul>
    </Fragment>
  );
}
