import { motion } from 'framer-motion';
import React from 'react';
import { IBudget, IGoal } from '../../app/@types';
import BudgetIcon from './../budget-icon';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.01
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const BudgetGridComponent: React.FC = ({ children }) => {
  return (
    <motion.ul
      className='grid grid-cols-4 gap-4 px-4'
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {children}
    </motion.ul>
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
    <motion.li className='inline-block' variants={item}>
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
    </motion.li>
  );
};

const BudgetGrid = Object.assign(BudgetGridComponent, { Item: BudgetGridItem });

export default BudgetGrid;
