import { ArrowLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import usePortal from 'react-useportal'

export default function IncomeAdd() {
  const history = useHistory();
  const { Portal } = usePortal();
  return (
    <Portal>
      <div className='bg-black bg-opacity-75 inset-0 fixed'>
        <div className='bg-white fixed inset-x-0 bottom-0 rounded-t-3xl'>
          <div className='sticky h- top-0 bg-white flex items-center font-medium rounded-t-3xl'>
            <button className='p-5' onClick={() => history.goBack()}>
              <ArrowLeftIcon className='h-6 w-6'/>
            </button>
            New Income
          </div>
          <form className='px-5 mb-5 text-gray-800'>
            <label className=''>
              <div className='font-medium text-sm my-1'>Amount</div>
              <div className='px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                <span className='mr-3'>PHP</span>
                <input className='font-medium flex-1 outline-none focus:outline-none text-right py-2 bg-transparent' type="number" value={1000.01} step=".01"/>
              </div>
            </label>
            <label>
              <div className='font-medium text-sm my-1'>Remarks</div>
              <div className='px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
                <textarea
                  className='font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent' 
                  />
              </div>
            </label>
            <div className='text-right my-4'>
              <button type='button' className='border border-indigo-500 py-1 px-2 rounded-full text-sm font-medium mr-2'>
                PHP 50,000.00
              </button>
              <button type='button' className='border border-indigo-500 py-1 px-2 rounded-full text-sm font-medium'>
                PHP 1,250.00
              </button>
            </div>
            <button className='bg-indigo-500 rounded-lg py-3 w-full text-sm font-medium text-white'>
              Add Income
            </button>
          </form>
        </div>
      </div>
    </Portal>
  )
}