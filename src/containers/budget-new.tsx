import { Dialog, RadioGroup } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import BudgetForm from '../components/budget-form';

export default function BudgetNew() {
  const route = useRouteMatch('/:year/:month/preferences/newbudget');
  const routeEdit = useRouteMatch('/:year/:month/preferences/budget/:id');
  const history = useHistory();

  const isOpen = route !== null && route.isExact;

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
        <Dialog.Title>New Budget</Dialog.Title>
      </div>
      <div className='px-5 py-5'>
        <BudgetForm />
      </div>
    </Dialog>
  );
}
