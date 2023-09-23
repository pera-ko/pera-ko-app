import { CheckIcon } from '@heroicons/react/20/solid';
import { IBudgetGoalData } from '../shared/@types';
import BudgetList from './budget-list';
import { twMerge } from 'tailwind-merge'

type BudgetCheckListProps = {
  items: IBudgetGoalData[];
  selectedItems: IBudgetGoalData[];
  onSelectedItemsChange(items: IBudgetGoalData[]): void;
}
export default function BudgetCheckList({
  items,
  selectedItems,
  onSelectedItemsChange
}: BudgetCheckListProps) {

  const handleItemClick = (item: IBudgetGoalData) => {
    const isSelected = selectedItems.some(
      (s) => s.budgetName === item.budgetName
    );

    if (isSelected) {
      onSelectedItemsChange(
        selectedItems.filter((s) => s.budgetName !== item.budgetName)
      );
    } else {
      onSelectedItemsChange([...selectedItems, item]);
    }
  }

  const renderCheckbox = (isSelected: boolean) => (
    <div
      className={twMerge('flex items-center justify-center h-7 w-7 mr-5 rounded-full border relative',
        !isSelected 
          ? 'bg-indigo-500/25 text-indigo-600 border-indigo-500/25' 
          : 'bg-indigo-500  text-white border-indigo-500'
      )}
    >
      { isSelected && <CheckIcon className='absolute w-5 h-5'/> }
    </div>
  )

  return (
    <BudgetList>
      {items.map((item) => {
        const isSelected = selectedItems.some(
          (s) => s.budgetName === item.budgetName
        );
        return (
          <BudgetList.Item
            className={twMerge('mx-2 my-1 py-1 rounded transition-all border duration-100 bg-white dark:bg-zinc-900',
              isSelected ? 'shadow border-indigo-400' : 'shadow-md border-transparent'
            )}
            key={item.id}
            value={item}
            onClick={handleItemClick}
          >
            {renderCheckbox(isSelected)}
          </BudgetList.Item>
        );
      })}
    </BudgetList>
  );
}
