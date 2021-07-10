import { ClipboardCheckIcon, ViewGridIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IBudgetGoalData } from '../app/@types';
import { BottomNav } from './App';
import BudgetCheckList from '../components/budget-check-list';
import BudgetGrid from '../components/widgets/budget-grid';
import { useQuery } from '../app/hooks';
import { getEffectiveBudget, useTransactionStore } from '../app/store';
import { money } from '../app/utils';
import toast from 'react-hot-toast';

const Budget: React.FC = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const [selectedItems, setSelectedItems] = useState<IBudgetGoalData[]>([]);
  const addTransaction = useTransactionStore(
    +year,
    +month
  )((state) => state).addTransaction;
  const isQuickAdd = query.get('view') === 'quickadd';

  const handleViewChange = (mode: 'grid' | 'quickadd') => {
    query.set('view', mode);
    history.push(`${location.pathname}?${query.toString()}`);
  };
  let listItems = getEffectiveBudget(+year, +month);

  const handleQuickAddClick = () => {
    var total = 0;
    selectedItems.forEach((item) => {
      addTransaction(item.id, 'default', item.amount);
      total += item.amount;
    });
    setSelectedItems([]);
    handleViewChange('grid');
    toast.success(`Total of ${money(total)} has been added`);
  };

  const handleBudgetGridItemClick = (id: string) => {
    query.set('newtran', 'open');
    query.set('id', id);
    history.push(`${location.pathname}?${query.toString()}`);
  };

  if (isQuickAdd) {
    listItems = listItems
      .filter((x) => x.type === 'goal')
      .map((x) => {
        let amount = x.amount;
        if (x.type === 'goal' && x.installmentType === 'semi-monthly') {
          amount = amount / 2;
        }
        return {
          ...x,
          amount
        };
      });
  }
  return (
    <Fragment>
      <div className='sticky top-0 px-6 py-5 flex justify-between items-center bg-white z-auto'>
        <div className='font-medium'>Select a budget</div>
        <div>
          <button
            className={`px-3 py-2 border rounded-l-xl outline-none focus:outline-none border-indigo-400 ${
              isQuickAdd
                ? 'rounded-r-none text-indigo-400'
                : 'bg-indigo-400 text-white'
            }`}
            onClick={() => handleViewChange('grid')}
          >
            <ViewGridIcon className='h-6 w-6' />
          </button>
          <button
            className={`px-3 py-2 border rounded-r-xl outline-none focus:outline-none border-indigo-400 ${
              !isQuickAdd
                ? 'text-indigo-400 rounded-l-none'
                : 'bg-indigo-400 text-white'
            }`}
            onClick={() => handleViewChange('quickadd')}
          >
            <ClipboardCheckIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
      {isQuickAdd ? (
        <BudgetCheckList
          selectedItems={selectedItems}
          onSelectedItemsChange={setSelectedItems}
          items={listItems}
        />
      ) : (
        <BudgetGrid>
          {listItems.map((item) => (
            <BudgetGrid.Item
              key={item.id}
              value={item}
              onClick={() => handleBudgetGridItemClick(item.id)}
            />
          ))}
        </BudgetGrid>
      )}
      {isQuickAdd && selectedItems.length > 0 ? (
        <div className='fixed inset-x-0 bottom-0 text-center pb-6'>
          <button
            className='bg-indigo-600 text-white rounded-full px-4 py-3 shadow-md text-sm'
            onClick={handleQuickAddClick}
          >
            Add&nbsp;
            <span className='font-medium '>
              {money(
                selectedItems.reduce((total, s) => total + Number(s.amount), 0)
              )}
            </span>
            &nbsp;transactions
          </button>
        </div>
      ) : (
        <BottomNav />
      )}
    </Fragment>
  );
};

export default Budget;
