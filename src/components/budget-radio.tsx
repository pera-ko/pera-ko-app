import { RadioGroup } from '@headlessui/react';
import React, { Fragment } from 'react';

interface BudgetRadioProps {
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
            className={`px-2 py-1 border rounded-l-full outline-none focus:outline-none text-gray-600 ${
              !checked ? '' : 'bg-indigo-100 text-indigo-500'
            }`}
          >
            Budget
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value='goal' as={Fragment}>
        {({ checked }) => (
          <span
            className={`px-2 py-1 border rounded-r-full outline-none focus:outline-none text-gray-600 ${
              !checked ? '' : 'bg-indigo-100 text-indigo-500'
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
