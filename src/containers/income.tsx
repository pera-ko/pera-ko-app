import { ArrowCircleDownIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import { ReactComponent as WalletPana } from '../assets/svg/Wallet-pana.svg';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IIncome } from '../app/@types';
import useStore, { useTransactionStore } from '../app/store';
import { money } from '../app/utils';

dayjs.extend(calendar);

export default function Income() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const { incomeList } = useTransactionStore(+year, +month)((state) => state);
  const walletList = useStore((state) => state.wallet.list);
  return (
    <Fragment>
      <div className='sticky h- top-0 bg-white flex items-center font-medium'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='h-6 w-6' />
        </Link>
        Income
      </div>
      {incomeList.length > 0 ? (
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
          <WalletPana className='w-96' />
          <div className='mb-5 -mt-3 font-medium'>No Income yet</div>
          <AddIncomeButton to={`/${year}/${month}/income/new`} />
        </div>
      )}
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
  text: string;
  remarks?: string;
}
function IncomeItem({ amount, text, remarks }: IncomeItemProps) {
  return (
    <li className='flex justify-between items-center'>
      <div className='flex items-center'>
        <ArrowCircleDownIcon className='h-6 w-6 mx-5 my-3 text-gray-600' />
        <span className='text-sm'>{text}</span>
      </div>
      <div className='text-right mr-5'>
        <div className='text-sm font-medium'>{money(amount)}</div>
        <div className='text-xs text-gray-600'>{remarks}</div>
      </div>
    </li>
  );
}

function List({
  incomeList
}: {
  incomeList: (IIncome & { walletName: string })[];
}) {
  let lastDate: string | null = null;
  return (
    <ul>
      {incomeList.map((income, index) => {
        var retVal: React.ReactElement[] = [];
        var currentDate = new Date(income.tranDate).toDateString();

        if (lastDate !== currentDate) {
          var desc = dayjs(currentDate).calendar(undefined, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]'
          });
          retVal.push(<IncomeHeader key={desc} date='Friday, June 30, 2021' />);
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
      className={`${className} text-sm font-medium p-3 bg-indigo-500 text-white rounded-full shadow-md`}
    >
      <ArrowCircleDownIcon className='h-6 w-6 mr-3 inline-block' />
      Add Income
    </Link>
  );
}
