import { Listbox } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { IBudget, IGoal } from '../app/@types';
import { WithId } from '../app/store';

type BudgetGoalType = (IGoal & WithId) | (IBudget & WithId);

interface Props {
  value?: BudgetGoalType;
  items: BudgetGoalType[];
  onChange(value: BudgetGoalType): void;
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
        <Listbox.Button className='border-2 border-transparent relative w-full py-2 pl-3 pr-10 text-left bg-indigo-100 rounded-lg'>
          <span className='block truncate'>
            <span className='text-sm font-medium'>
              {value ? value.budgetName : '- Select Budget Type -'}
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
          className='bg-white shadow-md absolute w-full rounded outline-none focus:outline-none'
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {items.map((b) => (
            <Listbox.Option
              key={b.id}
              value={b}
              className={({ active }) =>
                `${active ? 'py-2 px-4 bg-indigo-50 ' : ' py-2 px-4'}`
              }
            >
              {b.budgetName}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
