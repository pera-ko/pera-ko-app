import { Dialog } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CreditCardIcon
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import BudgetList from '../components/budget-list';
import OptionSwitch from '../components/option-switch';
import StickyHeader from '../components/sticky-header';
import useStore from '../app/store';

const Preferences: React.FC = () => {
  const route = useRouteMatch('/:year/:month/preferences');
  const history = useHistory();
  const [enableSuggestions, setEnableSuggestions] = useState(true);
  const [maskIncome, setMaskIncome] = useState(false);
  const budgetList = useStore((state) => state.budget.list);
  const isOpen = route !== null && route.isExact;
  return (
    <Dialog
      open={isOpen}
      onClose={() => history.goBack()}
      as='div'
      className='fixed inset-0 bg-white overflow-y-auto'
    >
      <div className='sticky h- top-0 bg-white flex items-center font-medium text-lg'>
        <button className='p-5' onClick={() => history.goBack()}>
          <ArrowLeftIcon className='h-6 w-6' />
        </button>
        Preferences
      </div>
      <OptionSwitch
        checked={enableSuggestions}
        title='Enable Suggestions'
        description='Suggest recent transactions to quickly populate the form'
        onChange={setEnableSuggestions}
      />
      <OptionSwitch
        checked={maskIncome}
        title='Mask Income and Balance'
        description="Hides the amount of income and balance with masking it with '?'"
        onChange={setMaskIncome}
      />
      <StickyHeader>
        Wallets
        <Link to={`${route?.url}/newwallet`} className='text-link'>
          ADD
        </Link>
      </StickyHeader>
      <ul>
        <li>
          <Link to='/' className='flex justify-between items-center py-3 px-5'>
            <div className='pr-5 text-2xl'>
              <CreditCardIcon className='h-6 w-6' />
            </div>
            <div className='flex-1'>
              <span className='font-medium text-sm'>Cash on hand</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>
                PHP 4,763.12
              </div>
            </div>
            <ChevronRightIcon className='h-6 w-6 block' />
          </Link>
        </li>
        <li>
          <Link to='/' className='flex justify-between items-center py-3 px-5'>
            <div className='pr-5 text-2xl'>
              <CreditCardIcon className='h-6 w-6' />
            </div>
            <div className='flex-1'>
              <span className='font-medium text-sm'>Gcash</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>
                PHP 799,500.00
              </div>
            </div>
            <ChevronRightIcon className='h-6 w-6 block' />
          </Link>
        </li>
      </ul>
      <StickyHeader>
        Budget List
        <Link to={`${route?.url}/newbudget`} className='text-link'>
          ADD
        </Link>
      </StickyHeader>
      <BudgetList>
        {budgetList.map((item) => (
          <BudgetList.Item
            key={item.id}
            value={item}
            onClick={() => history.push(`${route?.url}/budget/${item.id}`)}
          >
            <ChevronRightIcon className='h-6 w-6 mr-5' />
          </BudgetList.Item>
        ))}
      </BudgetList>
    </Dialog>
  );
};

export default Preferences;
