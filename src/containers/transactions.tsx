import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { shallow } from 'zustand/shallow';
import useTransactionStore from '../app/store/transaction-store';
import useBudgetStore from '../app/store/budget-store';
import NavBar from '../components/navbar';
import { ITransaction } from '../app/@types';
import Page from '../components/page';
import { useLocalStorage } from '../app/hooks';
import OverviewPie from '../components/widgets/charts/overview-pie';
import ExpenseList from '../components/expense-list';

dayjs.extend(calendar);

export default function Transactions() {
  const {value: newDashboard, loading } = useLocalStorage('expenses-dashboard', false);
  const { year, month } = useParams<{ year: string; month: string }>();
  const { list: transactionList } = useTransactionStore()((state) => state);
  const { budgetList, walletList } = useBudgetStore(
    (state) => ({
      budgetList: state.budget.list,
      walletList: state.wallet.list
    }),
    shallow
  );

  let sortedList: ITransaction[] = [
    ...transactionList.filter((t) => t.type === undefined)
  ] as ITransaction[];
  sortedList.reverse();

  const content = (
    <>
      <NavBar
        leftButton={{
          type: "link",
          icon: ArrowLeftIcon,
          link: `/${year}/${month}`
        }}
        title='Expenses'
        />
      <OverviewPie/>
      <ExpenseList 
        budgetList={budgetList}
        items={sortedList}
        walletList={walletList}
        showHeader
        />
    </>
  )

  if (loading) return null;

  if (newDashboard) {
    return (
      <Page isOpen>
        {content}
      </Page>
    );
  }

  return content
}
