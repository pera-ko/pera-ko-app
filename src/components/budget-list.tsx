import React, { PropsWithChildren } from 'react';
import { IBudget, IGoal } from '../app/@types';
import { money } from '../app/utils';
import BudgetIcon from './budget-icon';

const BudgetListComponent: React.FC<PropsWithChildren> = ({ children }) => {
  return <ul>{children}</ul>;
};

interface ItemProps extends PropsWithChildren {
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
        <div className='flex items-center justify-between text-left'>
          <div className='flex items-center'>
            <BudgetIcon budget={value} />
            <div>
              <span className='text-sm font-medium'>{value.budgetName}</span>
              <div className='text-xs font-medium leading-3 text-gray-600'>
                {money(value.amount)}
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
