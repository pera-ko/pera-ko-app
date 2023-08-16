import { ClipboardDocumentCheckIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { IBudgetGoalData } from '../app/@types';
import { BottomNav } from './App';
import BudgetCheckList from '../components/budget-check-list';
import BudgetGrid from '../components/widgets/budget-grid';
import { useLocQuery } from '../app/hooks';
import {
  getEffectiveBudget,
  useBudgetStore,
  useTransactionStore
} from '../app/store';
import { money } from '../app/utils';
import toast from 'react-hot-toast';

const Budget: React.FC = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const location = useLocation();
  const history = useHistory();
  const query = useLocQuery();
  const [selectedItems, setSelectedItems] = useState<IBudgetGoalData[]>([]);
  const addTransaction = useTransactionStore(
    +year,
    +month
  )((state) => state).addTransaction;
  const selectedWalletId = useBudgetStore((state) => state.wallet.selected);
  const isQuickAdd = query.get('view') === 'quickadd';

  const handleViewChange = (mode: 'grid' | 'quickadd') => {
    query.set('view', mode);
    history.push(`${location.pathname}?${query.toString()}`);
  };
  let listItems = getEffectiveBudget(+year, +month).filter(b => !b.isHidden);

  const handleQuickAddClick = () => {
    var total = 0;
    selectedItems.forEach((item) => {
      addTransaction(item.id, selectedWalletId, item.amount);
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
      <div className='sticky top-0 z-auto flex items-center justify-between px-6 py-5 bg-inherit'>
        <div className='font-medium'>Select a budget</div>
        <div>
          <button
            className={`px-3 py-2 border rounded-l-xl outline-none focus:outline-none border-indigo-600 ${isQuickAdd
                ? 'rounded-r-none text-indigo-400'
                : 'bg-indigo-600 text-white'
              }`}
            onClick={() => handleViewChange('grid')}
          >
            <Squares2X2Icon className='w-6 h-6' />
          </button>
          <button
            className={`px-3 py-2 border rounded-r-xl outline-none focus:outline-none border-indigo-600 ${!isQuickAdd
                ? 'text-indigo-600 rounded-l-none'
                : 'bg-indigo-600 text-white'
              }`}
            onClick={() => handleViewChange('quickadd')}
          >
            <ClipboardDocumentCheckIcon className='w-6 h-6' />
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
        <div className='fixed inset-x-0 bottom-0 pb-6 text-center'>
          <button
            className='px-4 py-3 text-sm text-white bg-indigo-600 rounded-full shadow-md'
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
