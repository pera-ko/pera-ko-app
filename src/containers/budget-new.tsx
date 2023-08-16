import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useHistory, useRouteMatch } from 'react-router';
import { IBudget, IGoal } from '../app/@types';
import BudgetForm from '../components/budget-form';
import {
  createBudget,
  deleteBudget,
  updateBudget,
  useBudgetStore
} from '../app/store';

export default function BudgetNew() {
  const route = useRouteMatch('/:year/:month/preferences/newbudget');
  const routeEdit = useRouteMatch<{ id: string }>(
    '/:year/:month/preferences/budget/:id'
  );
  const history = useHistory();
  const selectedBudget = useBudgetStore((state) =>
    state.budget.list.find((b) => b.id === routeEdit?.params.id)
  );
  const handleSubmit = (value: IGoal | IBudget) => {
    if (!selectedBudget) {
      if (createBudget) createBudget(value);
    } else {
      updateBudget(selectedBudget.id, value);
    }
    history.goBack();
  };

  const handleDelete = () => {
    deleteBudget(routeEdit!.params.id);
    history.goBack();
  };

  const isOpen =
    (route !== null && route.isExact) ||
    (routeEdit !== null && routeEdit.isExact);

  return (
    <Dialog
      open={isOpen}
      onClose={() => history.goBack()}
      as='div'
      className='fixed inset-0 pb-20 overflow-y-auto bg-white dark:bg-zinc-900'
    >
      <div className='sticky top-0 flex items-center justify-between text-lg font-medium '>
        <button
          className='p-5 outline-none focus:outline-none'
          onClick={() => history.goBack()}
        >
          <ArrowLeftIcon className='w-6 h-6' />
        </button>
        <Dialog.Title className='flex-1 text-left'>
          {selectedBudget ? 'Update' : 'New'} Budget
        </Dialog.Title>
        {selectedBudget && (
          <button className='p-5 text-error' onClick={handleDelete}>
            <TrashIcon className='w-6 h-6 ' />
          </button>
        )}
      </div>
      <div className='px-5 py-5'>
        <BudgetForm
          onSubmit={handleSubmit}
          defaultValue={selectedBudget}
          submitText={selectedBudget ? 'Update Budget' : 'Create Budget'}
        />
      </div>
    </Dialog>
  );
}
