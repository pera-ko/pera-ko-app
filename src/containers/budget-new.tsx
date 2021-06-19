import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline';
import { useHistory, useRouteMatch } from 'react-router';
import { IBudget, IGoal } from '../app/@types';
import BudgetForm from '../components/budget-form';
import useStore, {
  createBudget,
  deleteBudget,
  updateBudget
} from '../app/store';

export default function BudgetNew() {
  const route = useRouteMatch('/:year/:month/preferences/newbudget');
  const routeEdit = useRouteMatch<{ id: string }>(
    '/:year/:month/preferences/budget/:id'
  );
  const history = useHistory();
  const selectedBudget = useStore((state) =>
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
      className='fixed inset-0 bg-white overflow-y-auto text-gray-800 pb-20'
    >
      <div className='sticky top-0 bg-white flex justify-between items-center font-medium text-lg'>
        <button className='p-5' onClick={() => history.goBack()}>
          <ArrowLeftIcon className='h-6 w-6' />
        </button>
        <Dialog.Title className='text-left flex-1'>
          {selectedBudget ? 'Update' : 'New'} Budget
        </Dialog.Title>
        {selectedBudget && (
          <button className='p-5 text-error' onClick={handleDelete}>
            <TrashIcon className='h-6 w-6 ' />
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
