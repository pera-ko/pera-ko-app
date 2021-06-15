import { Dialog, RadioGroup } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { IBudget, IGoal } from '../@types';
import BudgetForm from '../components/budget-form';
import useStore from '../store';

export default function BudgetNew() {
  const route = useRouteMatch('/:year/:month/preferences/newbudget');
  const routeEdit = useRouteMatch<{ id: string }>(
    '/:year/:month/preferences/budget/:id'
  );
  const history = useHistory();
  const createBudget = useStore((state) => state.budget.createBudget);
  const updateBudget = useStore((state) => state.budget.updateBudget);
  const selectedBudget = useStore((state) =>
    state.budget.list.find((b) => b.id == routeEdit?.params.id)
  );
  const handleSubmit = (value: IGoal | IBudget) => {
    if (!selectedBudget) {
      createBudget(value);
    } else {
      updateBudget(selectedBudget.id, value);
    }
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
      <div className='sticky top-0 bg-white flex items-center font-medium text-lg'>
        <button className='p-5' onClick={() => history.goBack()}>
          <ArrowLeftIcon className='h-6 w-6' />
        </button>
        <Dialog.Title>{selectedBudget ? 'Update' : 'New'} Budget</Dialog.Title>
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
