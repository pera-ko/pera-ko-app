import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { IBudgetGoalData } from '../../../shared/@types';
import { formatCurrency, hexToRGB, money } from '../../../shared/utils';
import BudgetIcon from './budget-icon';
import { twMerge } from 'tailwind-merge';

type Props = {
  value?: IBudgetGoalData;
  items: IBudgetGoalData[];
  onChange(value: IBudgetGoalData): void;
  progress?: {
    value: number;
  };
  readOnly?: boolean
}
export default function SelectBudget({
  value,
  items,
  onChange,
  progress,
  readOnly
}: Props) {

  let progressPercent =
    progress && value ? (progress.value / value.amount) * 100 : undefined;
  if (progressPercent && progressPercent > 100) progressPercent = 100;
  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative mt-1'>
        <Listbox.Button
          className={`flex items-center outline-none focus:outline-none ${
            !value && 'py-2 pl-3 pr-10  bg-gray-500/10'
          } border-2 border-transparent relative w-full text-left  rounded-lg`}
        >
          {value ? (
            <Fragment>
              <BudgetIcon className='ml-0 mr-2' color={value.color} icon={value.icon} size='large' />
              {progress && progressPercent ? (
                <div className={twMerge('flex-1', readOnly ? '' : 'pr-8')}>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>
                      {value.budgetName}
                    </span>
                    <div
                      className={`flex items-center text-xs font-medium  text-right ${
                        progress.value > value.amount ? '' : ''
                      }`}
                    >
                      {progress.value > value.amount && (
                        <ExclamationTriangleIcon className='inline-block w-4 h-4 mr-1 text-red-700' />
                      )}
                      {formatCurrency(progress.value)} /{' '}
                      {formatCurrency(value.amount)}
                    </div>
                  </div>
                  <div
                    className='h-3 mt-1 rounded shadow-inner'
                    style={{ backgroundColor: hexToRGB('#000000', 0.05) }}
                  >
                    <div
                      className='rounded'
                      style={{
                        backgroundColor: hexToRGB(value.color, 0.5),
                        width: `${progressPercent}%`,
                        height: '100%'
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className='text-sm font-medium'>
                    {value.budgetName}
                  </span>
                  <div className='text-xs font-medium text-gray-500'>
                    {money(value.amount)}
                  </div>
                </div>
              )}
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
          {!readOnly ? (
            <span className='absolute inset-y-0 right-0 flex items-center pointer-events-none'>
              <ChevronUpDownIcon
                className='w-6 h-6'
                aria-hidden='true'
              />
            </span>
          ) : null}
        </Listbox.Button>

        <Listbox.Options
          className='absolute w-full overflow-y-auto bg-white rounded shadow-md outline-none dark:bg-zinc-900 focus:outline-none max-h-60'
          
        >
          {items.map((b) => (
            <Listbox.Option
              key={b.id}
              value={b}
              className={({ active }) =>
                `${
                  active
                    ? 'flex  items-center'
                    : 'flex items-center'
                }`
              }
            >
              <BudgetIcon className='mx-3' color={b.color} icon={b.icon} />
              <div>
                <span className='text-sm font-medium'>{b.budgetName}</span>
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
