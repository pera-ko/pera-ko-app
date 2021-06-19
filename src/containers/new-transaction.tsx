import { Dialog, Listbox } from '@headlessui/react';
import { ArrowLeftIcon, SelectorIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router-dom';
import TransactionForm from '../components/transaction-form';

export default function NewTransaction() {
  const history = useHistory();
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
          <Dialog.Title>New Transaction</Dialog.Title>
        </div>
        <TransactionForm />
      </div>
    </Dialog>
  );
}
