import React from 'react';
import { IBudget, IGoal } from '../app/@types';
import { hexToRGB } from '../app/utils';

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
        <div className='text-3xl pt-3 pb-1.5'>
          <div
            className='px-1.5 py-1.5 rounded-2xl inline-block'
            style={{
              backgroundColor: value.color,
              boxShadow: `0px 1px 2px ${hexToRGB(value.color, 0.5)}`
            }}
          >
            {value.icon}
          </div>
          {/* <div className='rounded-full h-3 w-3 absolute border-2 border-white' style={{backgroundColor: value.color, right: "30%", bottom: "10%"}}></div> */}
        </div>
        <div className='text-xs'>{value.budgetName}</div>
      </button>
    </li>
  );
};

const BudgetGrid = Object.assign(BudgetGridComponent, { Item: BudgetGridItem });

export default BudgetGrid;
