import { Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CreditCardIcon
} from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
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
  const walletList = useStore((state) => state.wallet.list);

  const isOpen = route ? true : false;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className='fixed inset-0 overflow-y-auto'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 transform translate-y-full'
          enterTo='opacity-100 transform translate-y-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 transform translate-x-0'
          leaveTo='opacity-0 transform translate-x-full'
        >
          <div className='bg-white top-0 '>
            <div className='sticky top-0 bg-white flex items-center font-medium text-lg'>
              <button
                className='p-5 outline-none focus:outline-none'
                onClick={() => history.goBack()}
              >
                <ArrowLeftIcon className='h-6 w-6' />
              </button>
              Preferences
            </div>
            <StickyHeader className='mb-4'>General</StickyHeader>
            <OptionSwitch
              checked={enableSuggestions}
              title='Enable Suggestions'
              description='Suggests recent transactions to quickly populate the form'
              onChange={setEnableSuggestions}
            />
            <OptionSwitch
              checked={maskIncome}
              title='Mask Income and Balance'
              description="Hides the amount of income and balance by masking it with '?'"
              onChange={setMaskIncome}
            />
            <StickyHeader>
              Wallets
              {/* <Link to={`${route?.url}/newwallet`} className='text-link'>
            ADD
          </Link> */}
            </StickyHeader>
            <ul>
              {Object.values(walletList).map((wallet) => {
                return (
                  <li key={wallet.id}>
                    <Link
                      to='/'
                      className='flex justify-between items-center py-3 px-5'
                    >
                      <div className='pr-5 text-2xl'>
                        <CreditCardIcon className='h-6 w-6' />
                      </div>
                      <div className='flex-1'>
                        <span className='font-medium text-sm'>
                          {wallet.walletName}
                        </span>
                      </div>
                      {/* <ChevronRightIcon className='h-6 w-6 block' /> */}
                    </Link>
                  </li>
                );
              })}
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
                  onClick={() =>
                    history.push(`${route?.url}/budget/${item.id}`)
                  }
                >
                  <ChevronRightIcon className='h-6 w-6 mr-5' />
                </BudgetList.Item>
              ))}
            </BudgetList>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Preferences;
