import { ArrowCircleDownIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

export default function Income() {
  const { year, month } = useParams<{year: string, month: string}>();
  return (
    <Fragment>
      <div className='sticky h- top-0 bg-white flex items-center font-medium'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='h-6 w-6'/>
        </Link>
        Income
      </div>
      <ul>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
        <IncomeHeader date="Friday, June 30, 2021"/>
        <IncomeItem amount={799500} remarks="napanalunan sa lotto"/>
        <IncomeItem amount={2000} remarks="utang ni babylyn"/>
      </ul>
      <Link to={`/${year}/${month}/income/new`} className='fixed bottom-5 right-5 text-sm font-medium p-3 bg-indigo-500 text-white rounded-full shadow-md'>
        <ArrowCircleDownIcon className='h-6 w-6 mr-3 inline-block'/>
        Add Income
      </Link>
    </Fragment>
  )
}

function IncomeHeader({date} : { date: string }) {
  return (
    <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
      {date}
    </li>
  )
}

interface IncomeItemProps {
  amount: number
  remarks: string
}
function IncomeItem ({ amount, remarks } : IncomeItemProps) {
  return (
    <li className='flex justify-between items-center'>
      <ArrowCircleDownIcon className='h-6 w-6 mx-5 my-3 text-gray-600'/>
      <div className='text-right mr-5'>
        <div className='text-sm font-medium'>PHP {amount.toLocaleString("en-us", { minimumFractionDigits: 2, currency: "PHP"})}</div>
        <div className='text-xs text-gray-600'>{remarks}</div>
      </div>
    </li>
  )
}