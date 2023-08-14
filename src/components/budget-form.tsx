import { Popover, RadioGroup } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
import BudgetRadio from './budget-radio';
import InputGroup from './input-group';
import { default as EmojiPicker, EmojiStyle } from 'emoji-picker-react';
import { IBudget, IGoal } from '../app/@types';
import dayjs from 'dayjs';
import OptionSwitch from './option-switch';

interface Inputs {
  type: 'goal' | 'budget';
  budgetName: string;
  amount: number;
  icon: string;
  color: string;
  startDate?: string;
  endDate?: string;
  installmentType?: 'monthly' | 'semi-monthly';
  isHidden?: boolean;
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
  const [chosenEmoji, setChosenEmoji] = useState<string | null>();
  const [color, setColor] = useState(
    defaultValue ? defaultValue.color : '#fff'
  );
  const [isHidden, setIsHidden] = useState(defaultValue ? defaultValue.isHidden : false)
  useEffect(() => {
    register('startDate', {
      required: type === 'goal' ? 'Start Date is required.' : false
    });
    register('endDate');
  }, [register, type]);

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    let returnValue: IBudget | IGoal;
    if (defaultValue && !defaultValue.icon && !chosenEmoji) return;
    const icon = chosenEmoji ? chosenEmoji! : defaultValue!.icon;
    if (type === 'budget') {
      returnValue = {
        type,
        budgetName: data.budgetName,
        amount: data.amount,
        color,
        icon,
        isHidden
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
        installmentType,
        isHidden
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
        <div className='mr-3 w-11'>
          <label className='block mb-2'>
            <div className='my-1 text-sm font-medium text-gray-500'>Icon</div>
            <Popover>
              <Popover.Button
                type='button'
                className={`
                border
                block h-11 w-11 text-2xl font-medium items-center bg-gray-500/10 
                rounded-md focus-within:outline-none focus-within:ring-2
                focus-within:ring-slate-500 focus-within:ring-opacity-50 focus-within:border-slate-900
                ${isSubmitted && !chosenEmoji && !defaultValue?.icon
                  ? 'border-error'
                  : 'border-transparent'
                }`}
              >
                {chosenEmoji
                  ? chosenEmoji
                  : defaultValue
                    ? defaultValue.icon
                    : ''}
              </Popover.Button>
              <Popover.Panel className='absolute z-10'>
                <EmojiPicker
                  onEmojiClick={(ed, emoji) => setChosenEmoji(ed.emoji)}
                  emojiStyle={EmojiStyle.NATIVE}
                  width={275}
                  height={325}
                  previewConfig={{
                    showPreview: false
                  }}
                />
              </Popover.Panel>
            </Popover>
          </label>
          <label className=''>
            <div className='my-1 text-sm font-medium text-gray-500'>Color</div>
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
              <div className='my-1 mt-1 text-sm font-medium text-gray-600'>
                Installment Type
              </div>
              <RadioGroup
                value={installmentType}
                onChange={setInstallmentType}
                className='grid grid-cols-2 text-sm font-medium text-center focus:bg-black'
              >
                <RadioGroup.Option
                  value='monthly'
                  className={({ active, checked }) => `
                    ${checked ? 'bg-indigo-100 text-indigo-500' : ''} 
                    ${active ? 'ring-2 ring-offset-indigo-300 text-red-500' : ''
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
                    ${active ? 'ring-2 ring-offset-indigo-300 text-red-500' : ''
                    } 
                    px-2 py-3 border rounded-r-md outline-none focus:outline-none text-gray-600 
                    `}
                >
                  <RadioGroup.Label>Semi-monthly</RadioGroup.Label>
                </RadioGroup.Option>
              </RadioGroup>
            </Fragment>
          )}
          <div className='flex flex-row-reverse mt-4'>
            <OptionSwitch title='Hidden' description='' checked={isHidden} onChange={e => setIsHidden(e)} />
          </div>
        </div>
      </div>
      <div className='fixed inset-x-0 px-5 bottom-4'>
        <button
          type='submit'
          className='w-full py-3 font-medium text-white bg-indigo-600 shadow-md rounded-2xl'
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
