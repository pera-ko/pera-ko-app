import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Transactions() {
  const { year, month } = useParams<{ year: string; month: string }>();
  return (
    <Fragment>
      <div className='sticky top-0 bg-white flex items-center font-medium'>
        <Link to={`/${year}/${month}`} className='p-5'>
          <ArrowLeftIcon className='h-6 w-6' />
        </Link>
        Transactions
      </div>
      <ul>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 30, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 25, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>

        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 18, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 15, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 12, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 8, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 5, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='bg-gray-200 px-5 py-2 text-xs sticky top-16'>
          Friday, June 2, 2021
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>🚗</div>
            <span className='font-medium text-sm'>XL7</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
        <li className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='px-4 py-3 text-2xl'>💗</div>
            <span className='font-medium text-sm'>Pag-ibig MP2</span>
          </div>
          <div className='text-right mr-5'>
            <div className='text-sm font-medium'>PHP 799,500.00</div>
            <div className='text-xs text-gray-600'>2nd half of month</div>
          </div>
        </li>
      </ul>
    </Fragment>
  );
}
