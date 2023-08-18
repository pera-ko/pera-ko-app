import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBudgetGoalData } from '../app/@types';
import InputGroup from './input-group';
import SelectBudget from './select-budget';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import PaymentMethodList from './payment-method-list';
import { setDefaultWallet, useBudgetStore } from '../app/store';
import { shallow } from 'zustand/shallow';

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
  const { walletList, selectedWalletId } = useBudgetStore(
    (state) => ({
      walletList: state.wallet.list,
      selectedWalletId: state.wallet.selected
    }),
    shallow
  );
  const defaultWallet = walletList[selectedWalletId];
  const [selectPayment, setSelectPayment] = useState(false)
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
      className='px-5 mb-5'
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
      {
        selectPayment ? (
          <div>
            <div className='mx-2 my-4 text-sm font-medium text-gray-500'>Select Payment Method:</div>
            <PaymentMethodList
            items={Object.values(walletList)}
            selected={defaultWallet}
            onSelect={w => {
              setDefaultWallet(w)
              setSelectPayment(!selectPayment)
            }}
            />
          </div>
        ) : (
          <div className='flex justify-between mt-4'>
            <button 
              type='button' 
              className='py-1.5 text-left flex items-center justify-between' 
              onClick={() => setSelectPayment(!selectPayment)}>
              <div>
                <div className='text-xs font-medium text-gray-500'>Payment Method:</div>
                <div className='text-sm font-medium'>{defaultWallet.walletName}</div>
              </div>
              <ChevronUpDownIcon className='w-6 h-6'/>
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg'
              >
              Add Transaction
            </button>
          </div>
        )
      }
    </form>
  );
}
