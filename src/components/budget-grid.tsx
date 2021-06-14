import React from "react";
import { IBudget, IGoal } from "../@types";

const BudgetGridComponent: React.FC = ({children}) => {
  return (
    <ul className='grid grid-cols-auto-fit-minmax-75px gap-4 px-4'>
      {children}
    </ul>
  )
}

interface ItemProps {
  value: IBudget | IGoal,
  showAmount?: boolean;
  onClick?(value: IBudget | IGoal): void
}
const BudgetGridItem: React.FC<ItemProps> = ({ value, children, onClick }) => {
  const handleItemClick = (item: IBudget | IGoal) => {
    if (onClick) onClick(item)
  }
  return (
    <li className='inline-block'>
      <button
        className='text-center w-full'
        onClick={() => handleItemClick(value)}
      >
        <div className='text-2xl pt-3 pb-1.5 relative'>
          {value.icon}
          <div className='rounded-full h-3 w-3 absolute border-2 border-white' style={{backgroundColor: value.color, right: "30%", bottom: "10%"}}></div>
        </div>
        <div className='text-xs'>{value.budgetName}</div>
        
      </button>
    </li>
  )
  return (
    <li>
      <button className='outline-none focus:outline-none'>
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

const BudgetGrid = Object.assign(BudgetGridComponent, { Item: BudgetGridItem })

export default BudgetGrid;