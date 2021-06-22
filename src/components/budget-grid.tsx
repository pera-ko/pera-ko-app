import React from 'react';
import { IBudget, IGoal } from '../app/@types';
import { hexToRGB } from '../app/utils';
import BudgetIcon from './budget-icon';

const BudgetGridComponent: React.FC = ({ children }) => {
  return (
    <ul className='grid grid-cols-auto-fit-minmax-75px gap-4 px-4'>
      {children}
    </ul>
  );
};

interface ItemProps {
  value: IBudget | IGoal;
  showAmount?: boolean;
  onClick?(value: IBudget | IGoal): void;
}
const BudgetGridItem: React.FC<ItemProps> = ({ value, children, onClick }) => {
  const handleItemClick = (item: IBudget | IGoal) => {
    if (onClick) onClick(item);
  };
  return (
    <li className='inline-block'>
      <button
        className='text-center w-full outline-none focus:outline-none'
        onClick={() => handleItemClick(value)}
      >
        <div className='text-3xl mt-3'>
          <BudgetIcon budget={value} size='large' />
          {/* <div className='rounded-full h-3 w-3 absolute border-2 border-white' style={{backgroundColor: value.color, right: "30%", bottom: "10%"}}></div> */}
        </div>
        <div className='text-xs'>{value.budgetName}</div>
      </button>
    </li>
  );
};

const BudgetGrid = Object.assign(BudgetGridComponent, { Item: BudgetGridItem });

export default BudgetGrid;
