import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import useTransactionStore from '../app/store/transaction-store';
import NavBar from '../components/navbar';
import { ITransaction } from '../app/@types';
import Page from '../components/page';
import { useLocQuery, useLocalStorage } from '../app/hooks';
import { OverviewPie } from '../components/widgets/charts/overview-pie';
import ExpenseList from '../components/expense-list';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import SelectDialog from '../components/select-dialog';
import useLabelStore from '../app/store/label-store';

dayjs.extend(calendar);

export default function Transactions() {
  const labels = useLabelStore(state => state.list)
  const {value: newDashboard, loading } = useLocalStorage('expenses-dashboard', false);
  const { year, month } = useParams<{ year: string; month: string }>();
  const { list: transactionList } = useTransactionStore()((state) => state);
  const [label, setLabel] = React.useState<string>("All")
  const { set, search } = useLocQuery<{ labelPicker: 'open' | 'closed'}>();
  const history = useHistory();
  const isOpen = search['labelPicker'] === 'open';
  
  const handleOpen = () => {
    set({ labelPicker: 'open' });
  }

  let sortedList: ITransaction[] = []

  if (label === "All") {
    sortedList = [
      ...transactionList.filter((t) => t.type === undefined)
    ] as ITransaction[];
  } else {
    sortedList = transactionList.filter(t => t.type === undefined && t.labels?.includes(label)) as ITransaction[]
  }
  
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
      <OverviewPie 
        items={sortedList} 
        rightElement={
          <button className='flex items-center'
            onClick={handleOpen}
            >
            <span>{label ? label : "All"}</span> 
            <ChevronDownIcon className='w-5 h-5'/>
          </button>
        }
        />
      <ExpenseList 
        items={sortedList}
        showHeader
        />
      <SelectDialog
        items={["All", ...labels]}
        isOpen={isOpen}
        onClose={() => history.goBack()}
        onSelect={setLabel}
        renderItem={(lbl) => <span>{lbl}</span>}
        selected={label}
        searchPredicate={(q, lbl) => (lbl ?? "").toLowerCase().indexOf(q.trim()) !== -1}
        title='Label'
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
