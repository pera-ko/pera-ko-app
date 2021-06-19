import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { IBudget, IGoal } from '../app/@types';
import { WithId } from '../app/store';

interface Inputs {
  amount: number;
  remarks?: string;
}

interface Props {
  onSubmit?(value: Inputs): void;
}

export default function TransactionForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<Inputs>();

  return (
    <form className='px-5 mb-5 text-gray-800'>
      <Listbox value={''} onChange={() => console.log('')}>
        <Listbox.Button className='border-2 border-transparent relative w-full py-2 pl-3 pr-10 text-left bg-indigo-100 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
          <span className='block truncate'>
            <span className='text-sm font-medium'>- Select Budget Type -</span>
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <SelectorIcon
              className='w-6 h-6 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
      </Listbox>
      <label className=''>
        <div className='font-medium text-sm my-1'>Amount</div>
        <div className='px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
          <span className='mr-3'>PHP</span>
          <input
            className='font-medium flex-1 outline-none focus:outline-none text-right py-2 bg-transparent'
            type='number'
            value={1000.01}
            step='.01'
          />
        </div>
      </label>
      <label>
        <div className='font-medium text-sm my-1'>Remarks</div>
        <div className='px-3 font-medium flex items-center bg-indigo-100 rounded-md border-2 border-transparent focus-within:border-indigo-300'>
          <textarea className='font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent' />
        </div>
      </label>
      <div className='text-right my-4'>
        <button
          type='button'
          className='border border-indigo-500 py-1 px-2 rounded-full text-sm font-medium mr-2'
        >
          PHP 50,000.00
        </button>
        <button
          type='button'
          className='border border-indigo-500 py-1 px-2 rounded-full text-sm font-medium'
        >
          PHP 1,250.00
        </button>
      </div>
      <button
        type='submit'
        className='bg-indigo-500 rounded-lg py-3 w-full text-sm font-medium text-white'
      >
        Add Transaction
      </button>
    </form>
  );
}
