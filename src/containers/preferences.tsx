import {
  ArrowLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import BudgetList from '../components/budget-list';
import OptionSwitch from '../components/option-switch';
import StickyHeader from '../components/sticky-header';
import { useLocalStorage } from '../app/hooks';
import useBudgetStore from '../app/store/budget-store';
import NavBar from '../components/navbar';
import Page from '../components/page';
import PaymentMethodIcon from '../components/payment-method-icon';

const Preferences: React.FC = () => {
  const route = useRouteMatch('/:year/:month/preferences');
  const history = useHistory();
  const budgetList = useBudgetStore((state) => state.budget.list);
  const walletList = useBudgetStore((state) => state.wallet.list);
  const defaultWallet = useBudgetStore((state) => state.wallet.selected);
  const {value: newDashboard, setValue: setNewDashboard } = useLocalStorage('expenses-dashboard', false);
  const {value: enableQuickTran, setValue: setQuickTran } = useLocalStorage('quick-tran-enabled', true);
  const isOpen = route ? true : false;
  
  return (
    <Page isOpen={isOpen}>
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
        <OptionSwitch
          checked={enableQuickTran}
          title='Enable Quick Transaction'
          description='Show quick transaction mode in the home page'
          onChange={setQuickTran}
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
              <li key={wallet.id}>
                {wallet.id !== "default" ? (
                  <Link
                    to={`${route?.url}/wallet/${wallet.id}/edit`}
                    className='flex items-center justify-between px-5 py-3'
                    >
                    <div className='pr-5 text-2xl'>
                      <PaymentMethodIcon type={wallet.type}/>
                    </div>
                    <div className='flex-1'>
                      <span className='text-sm font-medium'>
                        {wallet.walletName}
                      </span>
                    </div>
                    <ChevronRightIcon className='block w-6 h-6' />
                  </Link>
                ) : (
                  <div
                    className='flex items-center justify-between px-5 py-3'
                    >
                    <div className='pr-5 text-2xl'>
                      <PaymentMethodIcon type={wallet.type}/>
                    </div>
                    <div className='flex-1'>
                      <span className='text-sm font-medium'>
                        {wallet.walletName}
                      </span>
                    </div>
                    
                  </div>
                )}
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
    </Page>
  );
};

export default Preferences;
