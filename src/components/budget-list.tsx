import React from 'react';
import { IBudget, IGoal } from '../app/@types';
import { money } from '../app/utils';
import BudgetIcon from './budget-icon';

const BudgetListComponent: React.FC = ({ children }) => {
  return <ul>{children}</ul>;
};

interface ItemProps {
  value: IBudget | IGoal;
  showAmount?: boolean;
  onClick?(value: IBudget | IGoal): void;
  className?: string;
}
const BudgetListItem: React.FC<ItemProps> = ({
  className,
  value,
  children,
  onClick
}) => {
  const handleItemClick = (item: IBudget | IGoal) => {
    if (onClick) onClick(item);
  };

  return (
    <li className={className}>
      <button
        className='w-full outline-none focus:outline-none'
        onClick={() => handleItemClick(value)}
      >
        <div className='flex justify-between items-center text-left'>
          <div className='flex items-center'>
            <BudgetIcon budget={value} />
            <div>
              <span className='font-medium text-sm'>{value.budgetName}</span>
              <div className='text-xs font-medium text-gray-600 leading-3'>
                {value.amount ? money(value.amount) : ''}
              </div>
            </div>
          </div>
          {children}
        </div>
      </button>
    </li>
  );
};

const BudgetList = Object.assign(BudgetListComponent, { Item: BudgetListItem });

export default BudgetList;
