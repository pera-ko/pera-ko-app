import { Dialog, Transition } from '@headlessui/react';
import { shallow } from 'zustand/shallow';
import { useHistory } from 'react-router-dom';
import ExpenseForm from '../components/expense-form';
import toast from 'react-hot-toast';
import { money } from '../../../shared/utils';
import { Fragment } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useBudgetStore from '../../../app/store/budget-store';
import useTransactionStore from '../../../app/store/transaction-store';
import NavBar from '../../../shared/components/navbar';
import useAddExpense from '../hooks/use-add-expense';
import { useLocQuery } from '../../../shared/hooks/use-loc-query';

export default function NewTransaction() {
  
  const addTransaction = useAddExpense()

  const { budgetList, selectedWalletId } = useBudgetStore(
    (state) => ({
      budgetList: state.budget.list,
      selectedWalletId: state.wallet.selected
    }),
    shallow
  );
  const history = useHistory();
  const { search: { newtran, catId } } = useLocQuery<{ newtran: 'open' | 'closed', catId: string }>();
  const getTotalOfBudget = useTransactionStore(state => state.getTotalOfBudget)
  // const id = search['catId'];
  const selectedBudget = catId ? budgetList.find((b) => b.id === catId) : undefined;
  const isNewTransactionOpen = newtran === 'open';

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
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
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
            <div className='fixed inset-x-0 bottom-0 overflow-hidden transition-all transform shadow-xl bg-slate-100 dark:bg-dark rounded-t-2xl'>
              <NavBar
                leftButton={{
                  type: 'button',
                  icon: ArrowLeftIcon,
                  onClick: () => history.goBack()
                }}
                title='New Expense'
                />
              <ExpenseForm
                selectedBudget={selectedBudget}
                budgetList={budgetListWithAmt}
                onSubmit={(value) => {
                  addTransaction(
                    value.budgetId,
                    selectedWalletId,
                    value.amount,
                    value.remarks,
                    value.labels,
                    value.date
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
  );
}
