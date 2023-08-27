import { ArrowDownCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ReactComponent as WalletPana } from '../assets/svg/Wallet-pana.svg';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IIncome } from '../app/@types';
import { money } from '../app/utils';
import { useBudgetStore, useTransactionStore } from '../app/store';

dayjs.extend(calendar);

export default function Income() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const incomeList = useTransactionStore((state) => state.incomeList);
  const walletList = useBudgetStore((state) => state.wallet.list);

  return (
    <Fragment>
      <div className='sticky top-0 flex items-center font-medium bg-white dark:bg-dark'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='w-6 h-6' />
        </Link>
        Income
      </div>
      {incomeList.filter((i) => i.type !== 'transfer').length > 0 ? (
        <>
          <List
            incomeList={incomeList.map((income) => ({
              ...income,
              walletName: walletList[income.walletId].walletName
            }))}
          />
          <AddIncomeButton
            to={`/${year}/${month}/income/new`}
            className='fixed bottom-5 right-5'
          />
        </>
      ) : (
        <div className='text-center'>
          <WalletPana className='m-auto h-44'/>
          <div className='mb-5 -mt-3 font-medium'>No Income yet</div>
          <AddIncomeButton to={`/${year}/${month}/income/new`} />
        </div>
      )}
    </Fragment>
  );
}

function IncomeHeader({ date }: { date: string }) {
  return (
    <li className='sticky px-5 py-2 text-xs bg-gray-200 dark:bg-zinc-900 top-16'>{date}</li>
  );
}

interface IncomeItemProps {
  amount: number;
  text: string;
  remarks?: string;
}
function IncomeItem({ amount, text, remarks }: IncomeItemProps) {
  return (
    <li className='flex items-center justify-between'>
      <div className='flex items-center'>
        <ArrowDownCircleIcon className='w-6 h-6 mx-5 my-3 ' />
        <span className='text-sm'>{text}</span>
      </div>
      <div className='mr-5 text-right'>
        <div className='text-sm font-medium'>{money(amount)}</div>
        <div className='text-xs text-gray-500'>{remarks}</div>
      </div>
    </li>
  );
}

function List({
  incomeList
}: {
  incomeList: (IIncome & { walletName: string })[];
}) {
  const sortedList = [...incomeList];
  sortedList.reverse();
  let lastDate: string | null = null;
  return (
    <ul>
      {sortedList.map((income, index) => {
        var retVal: React.ReactElement[] = [];
        var currentDate = new Date(income.tranDate).toDateString();

        if (lastDate !== currentDate) {
          var desc = dayjs(currentDate).calendar(undefined, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]'
          });
          retVal.push(<IncomeHeader key={desc} date={desc} />);
          lastDate = currentDate;
        }

        retVal.push(
          <IncomeItem
            key={income.tranDate}
            amount={income.amount}
            text={income.walletName}
            remarks={income.remarks}
          />
        );
        return <Fragment key={index}>{retVal}</Fragment>;
      })}
    </ul>
  );
}

function AddIncomeButton({
  to,
  className
}: {
  to: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`${className} text-sm font-medium p-3 bg-indigo-600 text-white rounded-full shadow-md`}
    >
      <ArrowDownCircleIcon className='inline-block w-6 h-6 mr-3' />
      Add Income
    </Link>
  );
}