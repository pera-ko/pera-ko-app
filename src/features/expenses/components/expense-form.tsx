import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBudgetGoalData } from '../../../app/@types';
import InputGroup from '../../../shared/components/input-group';
import SelectBudget from '../../../components/select-budget';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import PaymentMethodList from './payment-method-list';
import { setDefaultWallet, useBudgetStore } from '../../../app/store';
import { shallow } from 'zustand/shallow';
import Dialog from '../../../shared/components/dialog';
import LabelPicker from '../../../shared/components/label-picker';
// import Chip from './chip';
// import { CalendarIcon } from '@heroicons/react/20/solid';

type Inputs = {
  amount: number;
  remarks?: string;
}

type Props = {
  selectedBudget?: IBudgetGoalData;
  budgetList: (IBudgetGoalData & { totTranAmt: number })[];
  onSubmit?(value: Inputs & { budgetId: string, labels: string[] }): void;
  readOnly?: boolean
}

export default function TransactionForm({
  selectedBudget,
  budgetList,
  onSubmit,
  readOnly
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
  const [labels, setLabels] = useState<string[]>([])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();
  useEffect(() => {
    register('amount', {
      required: 'Amount is required.',
      value: selectedBudget?.type === 'goal' 
              ? selectedBudget.installmentType === 'monthly' 
                ? selectedBudget.amount
                : selectedBudget.amount / 2
              : undefined
    });
    if (selectedBudget && amountInputRef.current) {
      amountInputRef.current.focus();
      amountInputRef.current.select();
    }
  }, [register, selectedBudget]);

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmit && budget) {
      const submitData = {
        ...data,
        budgetId: budget.id,
        labels
      }
      
      onSubmit(submitData);
    }
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

  const paymentMethodButton = (
    <button 
      type='button' 
      className='py-1.5 text-left flex items-center justify-between' 
      onClick={() => {
        if (readOnly) return
        setSelectPayment(!selectPayment)
      }}>
      <div>
        <div className='text-xs font-medium text-gray-500'>Payment Method:</div>
        <div className='text-sm font-medium'>{defaultWallet.walletName}</div>
      </div>
      {!readOnly ? <ChevronUpDownIcon className='w-6 h-6'/> : null }
    </button>
  )
  
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
        readOnly={readOnly}
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
        readOnly={readOnly}
      />
      <InputGroup label='Description' {...register('remarks')} readOnly={readOnly}/>
      <div className='flex mt-4 space-x-2'>
        {/* <Chip leftElement={<CalendarIcon className='w-5 h-5'/>}>Today</Chip> */}
        <LabelPicker
          onChange={setLabels}
          selected={labels}
          />
      </div>
      <div className='flex justify-between mt-4'>
        {paymentMethodButton}
        <button
          type='submit'
          className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg'
          >
          Add Expense
        </button>
      </div>
      {selectPayment ? (
        <Dialog title='' onClose={() => setSelectPayment(!selectPayment)} showClose={false} position='bottom'>
          <PaymentMethodList
            items={Object.values(walletList)}
            selected={defaultWallet}
            onSelect={w => {
              setDefaultWallet(w)
              setSelectPayment(!selectPayment)
            }}
            />
        </Dialog>
      ) : null}
    </form>
  );
}
