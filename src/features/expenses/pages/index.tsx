import { ArrowDownTrayIcon, ArrowLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import useTransactionStore from '../../../app/store/transaction-store';
import NavBar from '../../../shared/components/navbar';
import { ITransactionData } from '../../../shared/@types';
import Page from '../../../shared/components/page';
import { OverviewPie } from '../../../components/widgets/charts/overview-pie';
import ExpenseList from '../components/expense-list';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import SelectDialog from '../../../shared/components/select-dialog';
import useLabelStore from '../../../app/store/label-store';
import { ContextMenuRoute } from '../../../shared/components/context-menu';
import { useBudgetStore } from '../../../app/store';
import { longMonths } from '../../../shared/constants';
import usePerako from '../../../shared/hooks/perako-context';
import useLocalStorage from '../../../shared/hooks/use-local-storage';
import { useLocQuery } from '../../../shared/hooks/use-loc-query';

dayjs.extend(calendar);

export default function Transactions() {
  const labels = useLabelStore(state => state.list)
  const {value: newDashboard, loading } = useLocalStorage('expenses-dashboard', false);
  const { year, month } = useParams<{ year: string; month: string }>();
  const { list: transactionList } = useTransactionStore((state) => state);
  const [label, setLabel] = React.useState<string>("All")
  const { set, search } = useLocQuery<{ labelPicker: 'open' | 'closed'}>();
  const history = useHistory();
  const isOpen = search['labelPicker'] === 'open';
  
  const handleOpen = () => {
    set({ labelPicker: 'open' });
  }

  let sortedList: ITransactionData[] = []

  if (label === "All") {
    sortedList = [
      ...transactionList.filter((t) => t.type === undefined)
    ] as ITransactionData[];
  } else {
    sortedList = transactionList.filter(t => t.type === undefined && t.labels?.includes(label)) as ITransactionData[]
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
        rightButton={{
          type: 'link',
          icon: EllipsisVerticalIcon,
          link: `/${year}/${month}/expenses/context`
        }}
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
      <TransactionsContextMenu items={sortedList}/>
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

const TransactionsContextMenu = ({ items } : { items: ITransactionData[] }) => {
  const { currentMonth, currentYear } = usePerako()
  const budgetList = useBudgetStore(state => state.budget.list)
  const walletList = useBudgetStore(state => state.wallet.list)
  
  const handleExportToCSV = () => {
    let csvContent = "" 
    let totalAmount = 0;

    const headers = [
      "Date",
      "Amount",
      "Description",
      "Category",
      "Payment",
      "Labels"
    ]

    items.forEach(item => {
      const budget = budgetList.find((b) => b.id === item.budgetId);
      const payment = walletList[item.walletId]

      const lineItem = [
        dayjs(item.tranDate).format('DD/MM/YYYY'),
        //item.id,
        item.amount.toString(),
        item.remarks,
        budget?.budgetName,
        payment.walletName,
        item.labels ? item.labels?.join(", ") : ""
      ]

      totalAmount += item.amount
      
      csvContent += lineItem.map(li => '"' + li?.replaceAll('"', '""') + '"').join(",") + "\n"
    })
    const header = headers.map(li => "\"" + li + "\"").join(",") + "\n";

    // eslint-disable-next-line
    const totalHeader = `Grand Total,${totalAmount}` + '\n';

    const encodedUri = encodeURI(header + totalHeader + csvContent)
    
    const fileName = `${longMonths[currentMonth - 1]} ${currentYear}.csv`;

    const link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8,\uFEFF" + encodedUri);
    link.setAttribute("download", fileName);
    link.click();
  }
  
  return (
    <ContextMenuRoute
      path='/:year/:month/expenses/context'
      items={[{
        icon: ArrowDownTrayIcon,
        label: 'Export to CSV',
        onClick: handleExportToCSV
      }]}
      />
  )
}