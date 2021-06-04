import { ArrowLeftIcon, CheckCircleIcon, CheckIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const Preferences: React.FC = () => {
  const history = useHistory();
  return (
    <Fragment>
      <div className='sticky h- top-0 bg-white flex items-center font-medium text-lg'>
        <button 
          className='p-5'
          onClick={() => history.goBack()}>
          <ArrowLeftIcon className='h-6 w-6'/>
        </button>
        Preferences
      </div>
      <div className='flex px-5 mb-4'>
        <div className='flex-1 mr-4'>
          <div className='font-medium text-sm'>Enable Suggestions</div>
          <div className='text-gray-500 text-sm'>Suggest recent transactions to quickly populate the form</div>
        </div>
        <div className='w-16 h-8 bg-indigo-400 rounded-full flex items-center flex-row-reverse px-1'>
          <div className='bg-white w-6 h-6 rounded-full text-center'>
            
          </div>
        </div>
      </div>
      <div className='flex px-5 mb-4'>
        <div className='flex-1 mr-4'>
          <div className='font-medium text-sm'>Mask Income and Balance</div>
          <div className='text-gray-500 text-sm'>Hides the amount of income and balance with masking it with '?'</div>
        </div>
        <div className='w-16 h-8 bg-indigo-100 rounded-full flex items-center px-1'>
          <div className='bg-white w-6 h-6 rounded-full'>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 px-5 py-2 text-sm sticky top-16 font-medium'>
        Budget List
      </div>
      <ul>
        <li className='flex justify-between items-center border-red-300 border-l-4'>
          <div className='flex items-center'>
            <div className='pl-3 pr-4 py-3 text-2xl'>
              🚗
            </div>
            <div>
              <span className='font-medium text-sm'>XL7</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>PHP 799,500.00</div>
            </div>
          </div>
          <Link to='/' className='text-right mr-5'>
            <ChevronRightIcon className='h-6 w-6'/>
          </Link>
        </li>
        <li className='flex justify-between items-center border-green-300 border-l-4'>
          <div className='flex items-center'>
            <div className='pl-3 pr-4 py-3 text-2xl'>
              💗
            </div>
            <div>
              <span className='font-medium text-sm'>Pag-ibig MP2</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>PHP 3,500.00</div>
            </div>
          </div>
          <Link to='/' className='text-right mr-5'>
            <ChevronRightIcon className='h-6 w-6'/>
          </Link>
        </li>
        <li className='flex justify-between items-center border-yellow-300 border-l-4'>
          <div className='flex items-center'>
            <div className='pl-3 pr-4 py-3 text-2xl'>
              🌞
            </div>
            <div>
              <span className='font-medium text-sm'>Sunlife</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>PHP 5,500.00</div>
            </div>
          </div>
          <Link to='/' className='text-right mr-5'>
            <ChevronRightIcon className='h-6 w-6'/>
          </Link>
        </li>
      </ul>
    </Fragment>
  )
}

export default Preferences