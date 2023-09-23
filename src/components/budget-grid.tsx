import React, { PropsWithChildren } from 'react';
import { IBudget, IGoal } from '../shared/@types';
import BudgetIcon from './budget-icon';

const BudgetGridComponent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className='grid gap-4 px-4 grid-cols-auto-fit-minmax-75px'>
      {children}
    </ul>
  );
};

type ItemProps = {
  value: IBudget | IGoal;
  showAmount?: boolean;
  onClick?(value: IBudget | IGoal): void;
} & PropsWithChildren

const BudgetGridItem: React.FC<ItemProps> = ({ value, children, onClick }) => {
  const handleItemClick = (item: IBudget | IGoal) => {
    if (onClick) onClick(item);
  };
  return (
    <li className='inline-block'>
      <button
        className='w-full text-center outline-none focus:outline-none'
        onClick={() => handleItemClick(value)}
      >
        <div className='mt-3 text-3xl'>
          <BudgetIcon color={value.color} icon={value.icon} size='large' />
          {/* <div className='absolute w-3 h-3 border-2 border-white rounded-full' style={{backgroundColor: value.color, right: "30%", bottom: "10%"}}></div> */}
        </div>
        <div className='text-xs'>{value.budgetName}</div>
      </button>
    </li>
  );
};

const BudgetGrid = Object.assign(BudgetGridComponent, { Item: BudgetGridItem });

export default BudgetGrid;
