import { Popover, RadioGroup } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
import BudgetRadio from './budget-radio';
import InputGroup from './input-group';
import { default as EmojiPicker, IEmojiData } from 'emoji-picker-react';
import { IBudget, IGoal } from '../app/@types';
import dayjs from 'dayjs';

interface Inputs {
  type: 'goal' | 'budget';
  budgetName: string;
  amount: number;
  icon: string;
  color: string;
  startDate?: string;
  endDate?: string;
  installmentType?: 'monthly' | 'semi-monthly';
}

interface BudgetFormProps {
  defaultValue?: Inputs;
  onSubmit?(value: IBudget | IGoal): void;
  submitText?: string;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  defaultValue,
  onSubmit,
  submitText = 'Create Budget'
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted }
  } = useForm<Inputs>({ defaultValues: defaultValue });
  const [type, setType] = useState<'budget' | 'goal'>(
    defaultValue ? defaultValue.type : 'budget'
  );
  const startDateValue = watch(
    'startDate',
    defaultValue?.type === 'goal'
      ? dayjs(defaultValue.startDate).format('YYYY-MM-DD')
      : ''
  );
  const endDateValue = watch(
    'endDate',
    defaultValue?.type === 'goal'
      ? dayjs(defaultValue.endDate).format('YYYY-MM-DD')
      : ''
  );
  const [installmentType, setInstallmentType] = useState<
    'monthly' | 'semi-monthly'
  >(defaultValue?.installmentType ? defaultValue.installmentType : 'monthly');
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>();
  const [color, setColor] = useState(
    defaultValue ? defaultValue.color : '#fff'
  );
  useEffect(() => {
    register('startDate', {
      required: type === 'goal' ? 'Start Date is required.' : false
    });
    register('endDate');
  }, [register]);
  console.log(startDateValue);
  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    let returnValue: IBudget | IGoal;
    if (defaultValue && !defaultValue.icon && !chosenEmoji) return;
    const icon = chosenEmoji ? chosenEmoji!.emoji : defaultValue!.icon;
    if (type === 'budget') {
      returnValue = {
        type,
        budgetName: data.budgetName,
        amount: data.amount,
        color,
        icon
      };
    } else {
      returnValue = {
        type,
        budgetName: data.budgetName,
        amount: data.amount,
        color,
        icon,
        startDate: data.startDate!,
        endDate: data.endDate,
        installmentType
      };
    }
    if (onSubmit) onSubmit(returnValue);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='mb-5'>
        <BudgetRadio type={type} onChange={setType} />
      </div>
      <div className='flex'>
        <div className='w-11 mr-3'>
          <label className='block mb-2'>
            <div className='font-medium text-sm my-1 text-gray-600'>Icon</div>
            <Popover>
              <Popover.Button
                type='button'
                className={`
                ${
                  isSubmitted && !chosenEmoji && !defaultValue?.icon
                    ? 'border-error'
                    : 'border-transparent'
                }
                block h-11 w-11 text-2xl font-medium items-center bg-indigo-100 rounded-md border-2 border-transparent focus:border-indigo-300 outline-none focus:outline-none`}
              >
                {chosenEmoji
                  ? chosenEmoji.emoji
                  : defaultValue
                  ? defaultValue.icon
                  : ''}
              </Popover.Button>
              <Popover.Panel className='absolute z-10'>
                <EmojiPicker
                  onEmojiClick={(e, emoji) => setChosenEmoji(emoji)}
                  native
                />
              </Popover.Panel>
            </Popover>
          </label>
          <label className=''>
            <div className='font-medium text-sm my-1 text-gray-600'>Color</div>
            <Popover>
              <Popover.Button
                type='button'
                className={`
                block h-11 w-11 px-3 rounded-full border-2 focus:border-indigo-300 focus:outline-none outline-none`}
                style={{ backgroundColor: color }}
              ></Popover.Button>
              <Popover.Panel className='absolute z-10'>
                <HexColorPicker color={color} onChange={setColor} />
              </Popover.Panel>
            </Popover>
          </label>
        </div>
        <div className='flex-1'>
          <InputGroup
            label='Budget Name'
            error={errors.budgetName}
            {...register('budgetName', { required: 'Name is required.' })}
          />
          <InputGroup
            label='Amount'
            contentLabel={{ type: 'text', content: 'PHP' }}
            error={errors.amount}
            inputClassName='text-right'
            {...register('amount', { required: 'Amount is required.' })}
          />
          {type === 'goal' && (
            <Fragment>
              <InputGroup
                label='Start Date'
                error={errors.startDate}
                type='date'
                value={startDateValue}
                onChange={(e) => setValue('startDate', e.target.value)}
              />
              <InputGroup
                label='End Date'
                error={errors.endDate}
                type='date'
                value={endDateValue}
                onChange={(e) => setValue('endDate', e.target.value)}
              />
              <div className='font-medium text-sm my-1 text-gray-600 mt-1'>
                Installment Type
              </div>
              <RadioGroup
                value={installmentType}
                onChange={setInstallmentType}
                className='grid grid-cols-2 text-center text-sm font-medium focus:bg-black'
              >
                <RadioGroup.Option
                  value='monthly'
                  className={({ active, checked }) => `
                    ${checked ? 'bg-indigo-100 text-indigo-500' : ''} 
                    ${
                      active ? 'ring-2 ring-offset-indigo-300 text-red-500' : ''
                    } 
                    px-2 py-3 border rounded-l-md outline-none focus:outline-none text-gray-600 
                    `}
                >
                  <RadioGroup.Label>Monthly</RadioGroup.Label>
                </RadioGroup.Option>
                <RadioGroup.Option
                  value='semi-monthly'
                  className={({ active, checked }) => `
                    ${checked ? 'bg-indigo-100 text-indigo-500' : ''} 
                    ${
                      active ? 'ring-2 ring-offset-indigo-300 text-red-500' : ''
                    } 
                    px-2 py-3 border rounded-r-md outline-none focus:outline-none text-gray-600 
                    `}
                >
                  <RadioGroup.Label>Semi-monthly</RadioGroup.Label>
                </RadioGroup.Option>
              </RadioGroup>
            </Fragment>
          )}
        </div>
      </div>
      <div className='fixed bottom-4 inset-x-0 px-5'>
        <button
          type='submit'
          className='font-medium w-full bg-indigo-600 text-white py-3 rounded-2xl shadow-md'
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
