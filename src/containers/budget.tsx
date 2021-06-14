import { ClipboardCheckIcon, ViewGridIcon } from "@heroicons/react/outline"
import { Fragment, useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { IBudget, IGoal } from "../@types";
import { BottomNav } from "../App";
import BudgetCheckList from "../components/budget-check-list";
import BudgetGrid from "../components/budget-grid";
import { useQuery } from "../hooks";
import testData from "../_testData";

const Budget: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const [selectedItems, setSelectedItems] = useState<(IBudget | IGoal)[]>([])
  const isQuickAdd = query.get('view') === 'quickadd'

  const handleViewChange = (mode: 'grid' | 'quickadd') => {
    query.set('view', mode)
    history.push(`${location.pathname}?${query.toString()}`)
  }

  const quickAddItems = testData.budgetList.filter(x => x.type === "goal").map(x => {
    return {
      ...x,
      amount : x.amount / 2
    };
  })
  return (
    <Fragment>
      <div>
        <div className='px-4 py-5 flex justify-between items-center sticky top-0 bg-white z-10'>
          <div className='font-medium'>
            Select a budget
          </div>
          <div>
            <button 
              className={`px-2 py-1 border rounded-l-xl outline-none focus:outline-none text-gray-600 ${isQuickAdd ? 'border-r-0' : 'bg-indigo-100 text-indigo-500'}`}
              onClick={() => handleViewChange('grid')}>
              <ViewGridIcon className='h-6 w-6'/>
            </button>
            <button 
              className={`px-2 py-1 border rounded-r-xl outline-none focus:outline-none text-gray-600 ${!isQuickAdd ? 'border-l-0' : 'bg-indigo-100 text-indigo-500'}`}
              onClick={() => handleViewChange('quickadd')}>
              <ClipboardCheckIcon className='h-6 w-6'/>
            </button>
          </div>
        </div>
        {isQuickAdd ? (
          <BudgetCheckList 
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
            items={quickAddItems} 
          />
        ) : (
          <BudgetGrid>
            {testData.budgetList.map(item => (
              <BudgetGrid.Item value={item}/>
            ))}
          </BudgetGrid>
        )}
        
      </div>
      {isQuickAdd && selectedItems.length > 0 ? (
          <div className='fixed inset-x-0 bottom-0 text-center pb-6'>
            <button className='bg-indigo-600 text-white rounded-full px-4 py-3 shadow-md'>
              Add&nbsp;
              <span className='font-medium text-sm'>
              PHP {selectedItems.reduce((total, s) => total + s.amount, 0).toLocaleString("en-us", { minimumFractionDigits: 2, currency: "PHP"})}
              </span>
              &nbsp;transactions
            </button>
          </div>
        ) : 
        <BottomNav/>}
    </Fragment>
  )
}

export default Budget