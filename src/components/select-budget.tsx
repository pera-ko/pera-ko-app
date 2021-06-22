import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import { usePopper } from 'react-popper';
import { IBudgetGoalData } from '../app/@types';
import { money } from '../app/utils';
import BudgetIcon from './budget-icon';

interface Props {
  value?: IBudgetGoalData;
  items: IBudgetGoalData[];
  onChange(value: IBudgetGoalData): void;
}
export default function SelectBudget({ value, items, onChange }: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    useState<HTMLUListElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative mt-1' ref={setReferenceElement}>
        <Listbox.Button
          className={`flex items-center ${
            !value && 'py-2 pl-3 pr-10 bg-indigo-100'
          } border-2 border-transparent relative w-full text-left  rounded-lg`}
        >
          {value ? (
            <Fragment>
              <BudgetIcon budget={value} size='large' />
              <div>
                <span className='font-medium text-sm'>{value.budgetName}</span>
                <div className='text-xs font-medium text-gray-600'>
                  {money(value.amount)}
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <span className='block truncate'>
                <span className='text-sm font-medium'>
                  {value ? value : '- Select Budget Type -'}
                </span>
              </span>
            </Fragment>
          )}
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <SelectorIcon
              className='w-6 h-6 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>

        <Listbox.Options
          className='bg-white shadow-md absolute w-full rounded outline-none focus:outline-none overflow-y-auto max-h-64'
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {items.map((b) => (
            <Listbox.Option
              key={b.id}
              value={b}
              className={({ active }) =>
                `${
                  active
                    ? 'flex bg-indigo-50 items-center'
                    : 'flex items-center'
                }`
              }
            >
              <BudgetIcon budget={b} />
              <div>
                <span className='font-medium text-sm'>{b.budgetName}</span>
                <div className='text-xs font-medium text-gray-600'>
                  {money(b.amount)}
                </div>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
