import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePopper } from 'react-popper';
import { IBudget, IGoal } from '../app/@types';
import { WithId } from '../app/store';
import InputGroup from './input-group';

interface Inputs {
  amount: number;
  remarks?: string;
}

interface Props {
  budgetList: ((IGoal & WithId) | (IBudget & WithId))[];
  onSubmit?(value: Inputs & { budgetId: string }): void;
}

export default function TransactionForm({ budgetList, onSubmit }: Props) {
  const [budget, setBudget] = useState<(IGoal & WithId) | (IBudget & WithId)>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<Inputs>();
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }]
  });
  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmit && budget)
      onSubmit({
        ...data,
        budgetId: budget.id
      });
  };

  return (
    <form
      className='px-5 mb-5 text-gray-800'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Listbox value={budget} onChange={setBudget}>
        <Listbox.Button
          ref={referenceElement}
          className='border-2 border-transparent relative w-full py-2 pl-3 pr-10 text-left bg-indigo-100 rounded-lg'
        >
          <span className='block truncate'>
            <span className='text-sm font-medium'>
              {budget ? budget.budgetName : '- Select Budget Type -'}
            </span>
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <SelectorIcon
              className='w-6 h-6 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className='bg-white shadow-md absolute'
          ref={popperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {budgetList.map((b) => (
            <Listbox.Option key={b.id} value={b}>
              {b.budgetName}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <InputGroup
        inputClassName='text-right'
        label='Amount'
        error={errors.amount}
        type='number'
        contentLabel={{ type: 'text', content: 'PHP' }}
        {...register('amount', {
          required: 'Amount is required.',
          setValueAs: (v) => new Date(v).toJSON()
        })}
      />
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
