import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBudgetGoalData } from '../app/@types';
import InputGroup from './input-group';
import SelectBudget from './select-budget';

interface Inputs {
  amount: number;
  remarks?: string;
}

interface Props {
  selectedBudget?: IBudgetGoalData;
  budgetList: (IBudgetGoalData & { totTranAmt: number })[];
  onSubmit?(value: Inputs & { budgetId: string }): void;
}

export default function TransactionForm({
  selectedBudget,
  budgetList,
  onSubmit
}: Props) {
  const amountInputRef = useRef<HTMLInputElement | null>(null);
  const [budget, setBudget] = useState<IBudgetGoalData | undefined>(
    selectedBudget
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();
  useEffect(() => {
    register('amount', {
      required: 'Amount is required.'
    });
    if (selectedBudget && amountInputRef.current) {
      amountInputRef.current.focus();
      amountInputRef.current.select();
    }
  }, [register, selectedBudget]);

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmit && budget)
      onSubmit({
        ...data,
        budgetId: budget.id
      });
  };

  let defaultAmount: number | undefined;

  if (selectedBudget && selectedBudget.type === 'goal') {
    defaultAmount =
      selectedBudget.installmentType === 'monthly'
        ? selectedBudget.amount
        : selectedBudget.amount / 2;
  }

  const getBudgetProgress = (budgetId: string | undefined) => {
    if (!budgetId) return { value: 0 };
    var budgetX = budgetList.find((b) => b.id === budgetId);
    return budgetX ? { value: budgetX.totTranAmt } : { value: 0 };
  };
  return (
    <form
      className='px-5 mb-5 text-gray-800'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <SelectBudget
        items={budgetList}
        value={budget}
        onChange={setBudget}
        progress={getBudgetProgress(budget?.id)}
      />
      <InputGroup
        inputClassName='text-right'
        label='Amount'
        defaultValue={defaultAmount}
        error={errors.amount}
        type='number'
        step='.01'
        contentLabel={{ type: 'text', content: 'PHP' }}
        ref={amountInputRef}
        onChange={(e) => setValue('amount', e.target.valueAsNumber)}
      />
      <InputGroup label='Remarks' {...register('remarks')} />
      {/* {budget ? (
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
      ) : (
        
      )} */}
      <div className='h-8'></div>
      <button
        type='submit'
        className='bg-indigo-500 rounded-lg py-3 w-full text-sm font-medium text-white'
      >
        Add Transaction
      </button>
    </form>
  );
}
