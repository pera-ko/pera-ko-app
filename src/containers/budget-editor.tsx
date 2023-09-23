import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useHistory, useRouteMatch } from 'react-router';
import { IBudget, IGoal } from '../shared/@types';
import BudgetForm from '../components/budget-form';
import {
  createBudget,
  deleteBudget,
  updateBudget,
  useBudgetStore
} from '../app/store';
import NavBar from '../shared/components/navbar';

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
      className='fixed inset-0 z-20 pb-20 overflow-y-auto bg-white dark:bg-dark'
    >
      <NavBar
          leftButton={{
            type: "button",
            icon: ArrowLeftIcon,
            onClick: () => history.goBack()
          }}
          title={`${selectedBudget ? 'Update' : 'New'} Budget`}
          rightButton={{
            type: "button",
            icon: TrashIcon,
            onClick: handleDelete
          }}
          />
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
