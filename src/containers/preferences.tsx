import { Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import BudgetList from '../components/budget-list';
import OptionSwitch from '../components/option-switch';
import StickyHeader from '../components/sticky-header';
import { useLocalStorage } from '../app/hooks';
import useBudgetStore from '../app/store/budget-store';
import NavBar from '../components/navbar';

const Preferences: React.FC = () => {
  const route = useRouteMatch('/:year/:month/preferences');
  const history = useHistory();
  const budgetList = useBudgetStore((state) => state.budget.list);
  const walletList = useBudgetStore((state) => state.wallet.list);
  const {value: newDashboard, setValue: setNewDashboard } = useLocalStorage('expenses-dashboard', false);
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
            <NavBar 
              leftButton={{
                type: "button",
                icon: ArrowLeftIcon,
                onClick: () => history.goBack()
              }}
              title='Settings'
            />
            <StickyHeader>
              General
            </StickyHeader>
            <div className='mt-4'>
              <OptionSwitch
                checked={newDashboard}
                title='Expenses Dashboard'
                description='Use the new dashboard that only displays expenses for the month'
                onChange={setNewDashboard}
                />
            </div>
            <StickyHeader>
              Payment Methods
              <Link to={`${route?.url}/newwallet`} className='text-link'>
                ADD
              </Link>
            </StickyHeader>
            <ul className='bg-white dark:bg-dark'>
              {Object.values(walletList)
                .filter((w) => !w.isDeleted)
                .map((wallet) => {
                  return (
                    <li key={wallet.id} >
                      <Link
                        to={`${route?.url}/wallet/${wallet.id}/edit`}
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

export default Preferences;
