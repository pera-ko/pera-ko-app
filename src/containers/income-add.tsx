import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useHistory } from 'react-router-dom';
import { getDefaultWallet, useTransactionStore } from '../app/store';
import IncomeForm from '../components/income-form';

export default function IncomeAdd() {
  const history = useHistory();
  const addIncome = useTransactionStore((state) => state).addIncome;

  const defaultWallet = getDefaultWallet();

  return (
    <Dialog
      open
      onClose={() => history.goBack()}
      as='div'
      className='fixed inset-0 overflow-y-auto'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-75' />
      <div className='fixed inset-x-0 bottom-0 bg-white rounded-t-5xl'>
        <div className='sticky top-0 flex items-center font-medium bg-white h- rounded-t-5xl'>
          <button className='p-5' onClick={() => history.goBack()}>
            <ArrowLeftIcon className='w-6 h-6' />
          </button>
          <Dialog.Title>New Income</Dialog.Title>
        </div>
        <IncomeForm
          onSubmit={(value) => {
            addIncome(defaultWallet.id, value.amount, value.remarks);
            history.goBack();
          }}
        />
      </div>
    </Dialog>
  );
}
