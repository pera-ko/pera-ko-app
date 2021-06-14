import { CheckIcon } from "@heroicons/react/outline";
import { IBudget, IGoal } from "../@types";
import BudgetList from "./budget-list";

interface Props {
  items: (IBudget | IGoal)[];
  selectedItems: (IBudget | IGoal)[];
  onSelectedItemsChange(items: (IBudget | IGoal)[]): void
}
export default function BudgetCheckList({ items, selectedItems, onSelectedItemsChange } : Props) {
  return (
    <BudgetList>
      {items.map(item => {
        const isSelected = selectedItems.some(s => s.budgetName === item.budgetName);
        return (
          <BudgetList.Item value={item} onClick={() => {
            if (isSelected) {
              onSelectedItemsChange(selectedItems.filter(s => s.budgetName !== item.budgetName))
            } else {
              onSelectedItemsChange([
                ...selectedItems, item
              ])
            }
          }}>
            <div className={`h-7 w-7 mr-5 rounded-full border  relative ${!isSelected ? 'bg-indigo-50  text-indigo-600 border-indigo-100' : 'bg-indigo-500  text-white border-indigo-500'} `}>
              {isSelected && <CheckIcon className='h-6 w-6 absolute' style={{top: "1px", left: "1px"}}/>}
            </div>
          </BudgetList.Item>
        )
      })}
    </BudgetList>
  )
}