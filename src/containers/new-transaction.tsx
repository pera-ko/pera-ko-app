import { Dialog, Transition } from '@headlessui/react';
import shallow from 'zustand/shallow';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useHistory, useParams } from 'react-router-dom';
import useStore from '../app/store';
import TransactionForm from '../components/transaction-form';
import { useTransactionStore } from '../app/store';
import { useQuery } from '../app/hooks';
import toast from 'react-hot-toast';
import { money } from '../app/utils';
import { Fragment } from 'react';

export default function NewTransaction() {
  const { year, month } = useParams<{ year: string; month: string }>();
  const { budgetList, selectedWalletId } = useStore(
    (state) => ({
      budgetList: state.budget.list,
      selectedWalletId: state.wallet.selected
    }),
    shallow
  );
  const history = useHistory();
  const query = useQuery();
  const { addTransaction, getTotalOfBudget } = useTransactionStore(
    +year,
    +month
  )(
    (state) => ({
      addTransaction: state.addTransaction,
      getTotalOfBudget: state.getTotalOfBudget
    }),
    shallow
  );
  const id = query.get('id');
  const selectedBudget = id ? budgetList.find((b) => b.id === id) : undefined;
  const isNewTransactionOpen = query.get('newtran') === 'open';

  const budgetListWithAmt = budgetList.map((b) => {
    return {
      ...b,
      totTranAmt: getTotalOfBudget(b.id)
    };
  });

  return (
    <Transition appear show={isNewTransactionOpen} as={Fragment}>
      <Dialog as={Fragment} onClose={() => history.goBack()}>
        <div className='fixed inset-0 overflow-y-auto'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='bg-black bg-opacity-50 fixed inset-0' />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 transform translate-y-full'
            enterTo='opacity-100 transform translate-y-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 transform translate-y-0'
            leaveTo='opacity-0 transform translate-y-full'
          >
            <div className='fixed bottom-0 inset-x-0 overflow-hidden transition-all transform bg-white shadow-xl rounded-t-2xl'>
              <div className='sticky h- top-0 bg-white flex items-center font-medium rounded-t-5xl'>
                <button
                  className='p-5 outline-none focus:outline-none'
                  onClick={() => history.goBack()}
                >
                  <ArrowLeftIcon className='h-6 w-6' />
                </button>
                <Dialog.Title>New Transaction</Dialog.Title>
              </div>
              <TransactionForm
                selectedBudget={selectedBudget}
                budgetList={budgetListWithAmt}
                onSubmit={(value) => {
                  addTransaction(
                    value.budgetId,
                    selectedWalletId,
                    value.amount,
                    value.remarks
                  );
                  history.goBack();
                  toast.success(`${money(value.amount)} added to transaction`);
                }}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    // <Dialog
    //   open
    //   onClose={() => history.goBack()}
    //   as='div'

    // >
    //   <Dialog.Overlay className='bg-black bg-opacity-75 inset-0 fixed' />
    //   <div className='bg-white fixed inset-x-0 bottom-0 rounded-t-5xl pt-1'>
    //     <div className='sticky h- top-0 bg-white flex items-center font-medium rounded-t-5xl'>
    //       <button
    //         className='p-5 outline-none focus:outline-none'
    //         onClick={() => history.goBack()}
    //       >
    //         <ArrowLeftIcon className='h-6 w-6' />
    //       </button>
    //       <Dialog.Title>New Transaction</Dialog.Title>
    //     </div>
    //     <TransactionForm
    //       selectedBudget={selectedBudget}
    //       budgetList={budgetList}
    //       onSubmit={(value) => {
    //         addTransaction(value.budgetId, value.amount, value.remarks);
    //         history.goBack();
    //         toast.success(`${money(value.amount)} added to transaction`);
    //       }}
    //     />
    //   </div>
    // </Dialog>
  );
}
