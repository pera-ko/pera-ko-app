import { CheckIcon } from '@heroicons/react/24/outline';
import { IBudgetGoalData } from '../app/@types';
import BudgetList from './budget-list';

interface Props {
  items: IBudgetGoalData[];
  selectedItems: IBudgetGoalData[];
  onSelectedItemsChange(items: IBudgetGoalData[]): void;
}
export default function BudgetCheckList({
  items,
  selectedItems,
  onSelectedItemsChange
}: Props) {
  return (
    <BudgetList>
      {items.map((item) => {
        const isSelected = selectedItems.some(
          (s) => s.budgetName === item.budgetName
        );
        return (
          <BudgetList.Item
            className={`mx-2 my-1 py-1 rounded transition-all border duration-100 ${
              isSelected
                ? 'shadow border-indigo-400'
                : 'shadow-md border-transparent'
            }`}
            key={item.id}
            value={item}
            onClick={() => {
              if (isSelected) {
                onSelectedItemsChange(
                  selectedItems.filter((s) => s.budgetName !== item.budgetName)
                );
              } else {
                onSelectedItemsChange([...selectedItems, item]);
              }
            }}
          >
            <div
              className={`h-7 w-7 mr-5 rounded-full border  relative ${
                !isSelected
                  ? 'bg-indigo-50  text-indigo-600 border-indigo-100'
                  : 'bg-indigo-500  text-white border-indigo-500'
              } `}
            >
              {isSelected && (
                <CheckIcon
                  className='absolute w-6 h-6'
                  style={{ top: '1px', left: '1px' }}
                />
              )}
            </div>
          </BudgetList.Item>
        );
      })}
    </BudgetList>
  );
}
