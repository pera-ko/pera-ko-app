import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useHistory, useParams } from 'react-router-dom';
import useStore, { getDefaultWallet, useTransactionStore } from '../app/store';
import IncomeForm from '../components/income-form';

export default function IncomeAdd() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const history = useHistory();
  const addIncome = useTransactionStore(
    +year,
    +month
  )((state) => state).addIncome;

  const defaultWallet = getDefaultWallet();

  return (
    <Dialog
      open
      onClose={() => history.goBack()}
      as='div'
      className='fixed inset-0  overflow-y-auto'
    >
      <Dialog.Overlay className='bg-black bg-opacity-75 inset-0 fixed' />
      <div className='bg-white fixed inset-x-0 bottom-0 rounded-t-5xl'>
        <div className='sticky h- top-0 bg-white flex items-center font-medium rounded-t-5xl'>
          <button className='p-5' onClick={() => history.goBack()}>
            <ArrowLeftIcon className='h-6 w-6' />
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
