import React from "react";
import { IBudget, IGoal } from "../@types";

const BudgetListComponent: React.FC = ({children}) => {
  return (
    <ul>
      {children}
    </ul>
  )
}

interface ItemProps {
  value: IBudget | IGoal,
  showAmount?: boolean;
  onClick?(value: IBudget | IGoal): void
}
const BudgetListItem: React.FC<ItemProps> = ({ value, children }) => {
  return (
    <li>
      <button className='w-full outline-none focus:outline-none'>
        <div className='flex justify-between items-center border-l-4 text-left' style={{borderColor: value.color}}>
          <div className='flex items-center'>
            <div className='pl-3 pr-4 py-3 text-2xl'>
              {value.icon}
            </div>
            <div>
              <span className='font-medium text-sm'>{value.budgetName}</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>PHP {value.amount.toLocaleString("en-us", { minimumFractionDigits: 2, currency: "PHP"})}</div>
            </div>
          </div>
          {children}
        </div>
      </button>
    </li>
  )
}

const BudgetList = Object.assign(BudgetListComponent, { Item: BudgetListItem })

export default BudgetList;