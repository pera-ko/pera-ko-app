import { Dialog, FocusTrap } from "@headlessui/react";
import { ArrowLeftIcon, CheckCircleIcon, CheckIcon, ChevronRightIcon, CreditCardIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import BudgetList from "../components/budget-list";
import OptionSwitch from "../components/option-switch";

const Preferences: React.FC = () => {
  const route = useRouteMatch('/:year/:month/preferences');
  const history = useHistory();
  const [enableSuggestions, setEnableSuggestions] = useState(true)
  const [maskIncome, setMaskIncome] = useState(false)
  const isOpen =  route !== null && route.isExact
  return (
    <Dialog open={isOpen} onClose={() => history.goBack()}
      as="div"
      className='fixed inset-0 bg-white overflow-y-auto'>
        <div className='sticky h- top-0 bg-white flex items-center font-medium text-lg'>
          <button
            className='p-5'
            onClick={() => history.goBack()}>
            <ArrowLeftIcon className='h-6 w-6' />
          </button>
          Preferences
        </div>
        <OptionSwitch
          checked={enableSuggestions}
          title="Enable Suggestions" 
          description="Suggest recent transactions to quickly populate the form"
          onChange={setEnableSuggestions}/>
        <OptionSwitch
          checked={maskIncome}
          title="Mask Income and Balance"
          description="Hides the amount of income and balance with masking it with '?'"
          onChange={setMaskIncome}/>
        <div className='bg-gray-200 px-5 py-2 text-sm sticky top-16 font-medium flex justify-between'>
          Wallets
          <Link  to={`${route?.url}/newwallet`} className='text-link'>ADD</Link>
        </div>
        <ul>
          <li>
            <Link to='/' className='flex justify-between items-center py-3 px-5'>
              <div className='pr-5 text-2xl'>
                <CreditCardIcon className='h-6 w-6' />
              </div>
              <div className='flex-1'>
                <span className='font-medium text-sm'>Cash on hand</span>
                <div className='text-xs font-medium text-gray-600 leading-3'>PHP 4,763.12</div>
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
                <div className='text-xs font-medium text-gray-600 leading-3'>PHP 799,500.00</div>
              </div>
              <ChevronRightIcon className='h-6 w-6 block' />
            </Link>
          </li>
        </ul>
        <div className='bg-gray-200 px-5 py-2 text-sm sticky top-16 font-medium flex justify-between'>
          Budget List
          <Link  to={`${route?.url}/newbudget`} className='text-link'>ADD</Link>
        </div>
        <BudgetList>
          <BudgetList.Item value={{budgetName: "XL7", amount: 799500, icon: "🚗", type: "budget", color: "gray"}}>
            <ChevronRightIcon className='h-6 w-6 mr-5'/>
          </BudgetList.Item>
          <BudgetList.Item value={{budgetName: "Pag-ibig MP2", amount: 3500, icon: "💗", type: "budget", color: "red"}}>
            <ChevronRightIcon className='h-6 w-6 mr-5'/>
          </BudgetList.Item>
          <BudgetList.Item value={{budgetName: "Sunlife", amount: 3000, icon: "🌞", type: "budget", color: "yellow"}}>
            <ChevronRightIcon className='h-6 w-6 mr-5'/>
          </BudgetList.Item>
        </BudgetList>
    </Dialog>
  )
}

export default Preferences