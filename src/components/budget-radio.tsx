import { RadioGroup } from '@headlessui/react';
import React, { Fragment } from 'react';

type BudgetRadioProps = {
  type: 'budget' | 'goal';
  onChange(value: 'budget' | 'goal'): void;
}

const BudgetRadio: React.FC<BudgetRadioProps> = ({ type, onChange }) => {
  return (
    <RadioGroup
      value={type}
      onChange={onChange}
      className='grid grid-cols-2 text-center'
    >
      <RadioGroup.Option value='budget' as={Fragment}>
        {({ checked }) => (
          <span
            className={`px-3 py-2 border rounded-l-full outline-none focus:outline-none border-indigo-600 ${
              !checked ? ' ' : 'bg-indigo-600 text-white'
            }`}
          >
            Budget
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value='goal' as={Fragment}>
        {({ checked }) => (
          <span
            className={`px-3 py-2 border rounded-r-full outline-none focus:outline-none border-indigo-600 ${
              !checked ? '' : 'bg-indigo-600 text-white'
            }`}
          >
            Goal
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default BudgetRadio;
