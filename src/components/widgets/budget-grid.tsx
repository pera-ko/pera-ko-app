import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import { IBudget, IGoal } from '../../shared/@types';
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

const BudgetGridComponent: React.FC<PropsWithChildren> = ({ children }) => {
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
    <motion.li className='inline-block' variants={item}>
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
    </motion.li>
  );
};

const BudgetGrid = Object.assign(BudgetGridComponent, { Item: BudgetGridItem });

export default BudgetGrid;
