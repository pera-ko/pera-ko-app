import { Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
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
  const budgetList = useStore((state) => state.budget.list);
  const walletList = useStore((state) => state.wallet.list);

  const isOpen = route ? true : false;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className='fixed inset-0 overflow-y-auto bg-white dark:bg-[#242424]'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 transform translate-y-full'
          enterTo='opacity-100 transform translate-y-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 transform translate-x-0'
          leaveTo='opacity-0 transform translate-x-full'
        >
          <div className='top-0'>
            <div className='sticky top-0 flex items-center text-lg font-medium bg-white dark:bg-dark'>
              <button
                className='p-5 outline-none focus:outline-none'
                onClick={() => history.goBack()}
              >
                <ArrowLeftIcon className='w-6 h-6' />
              </button>
              Settings
            </div>
            {false ? <GeneralSettings/> : null}
            <StickyHeader>
              Wallets
              <Link to={`${route?.url}/newwallet`} className='text-link'>
                ADD
              </Link>
            </StickyHeader>
            <ul>
              {Object.values(walletList)
                .filter((w) => !w.isDeleted)
                .map((wallet) => {
                  return (
                    <li key={wallet.id}>
                      <Link
                        to={`${route?.url}/wallet/${wallet.id}`}
                        className='flex items-center justify-between px-5 py-3'
                      >
                        <div className='pr-5 text-2xl'>
                          <CreditCardIcon className='w-6 h-6' />
                        </div>
                        <div className='flex-1'>
                          <span className='text-sm font-medium'>
                            {wallet.walletName}
                          </span>
                        </div>
                        <ChevronRightIcon className='block w-6 h-6' />
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
                  <ChevronRightIcon className='w-6 h-6 mr-5' />
                </BudgetList.Item>
              ))}
            </BudgetList>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

const GeneralSettings = () => {
  const [enableSuggestions, setEnableSuggestions] = useState(true);
  const [maskIncome, setMaskIncome] = useState(false);
  
  return (
    <>
      <StickyHeader>
        General
      </StickyHeader>
      <div className='mt-2'>
        <OptionSwitch
          checked={enableSuggestions}
          title='New Dashboard'
          description='Use the new customizable dashboard'
          onChange={setEnableSuggestions}
          />
        <OptionSwitch
          checked={maskIncome}
          title='Mask Income and Balance'
          description="Hides the amount of income and balance with masking it with '?'"
          onChange={setMaskIncome}
          />
      </div>
    </>
  )
}

export default Preferences;
