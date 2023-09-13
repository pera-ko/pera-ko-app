import dayjs from "dayjs";
import { IBudget, IBudgetData, IGoal, IGoalData, ITransactionData, IWallet } from "../app/@types";
import calendar from 'dayjs/plugin/calendar';
import BudgetIcon from "./budget-icon";
import { Fragment, useState } from "react";
import { money } from "../app/utils";
import { TagIcon } from "@heroicons/react/20/solid";
import { useBudgetStore } from "../app/store";
import ContextMenu from "./context-menu";
import { WalletIcon } from "@heroicons/react/24/outline";
import ViewExpense from "../containers/view-expense";
import Dialog from "./dialog";
import PaymentMethodList from "./payment-method-list";
import useUpdateTransaction from "../app/hooks/use-update-transaction";
import toast from "react-hot-toast";

dayjs.extend(calendar);

type ExpenseListProps = {
  items: ITransactionData[]
  budgetList: (IGoalData | IBudgetData)[]
  walletList: Record<string, IWallet>
  showHeader?: boolean
  onItemClick?: (item: ITransactionData) => void
}

export const ExpenseList = ({ items, budgetList, walletList, showHeader, onItemClick } : ExpenseListProps) => {
  
  let lastDate: string | null = null;

  return (
    <ul>
      {items.map((t, index) => {
        var retVal: React.ReactElement[] = [];
        var currentDate = new Date(t.tranDate).toDateString();

        const budget = budgetList.find((b) => b.id === t.budgetId);
        
        if (!budget) return null;

        if (showHeader && lastDate !== currentDate) {
          var desc = dayjs(currentDate).calendar(undefined, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd'
          });
          retVal.push(
            <li
              key={desc}
              className='sticky px-5 py-2 text-xs bg-gray-200 dark:bg-zinc-900 top-16'
              >
              {desc}
            </li>
          );
          lastDate = currentDate;
        }

        retVal.push(
          <ExpenseList.Item
            key={t.tranDate}
            value={t}
            budget={budget}
            wallet={walletList[t.walletId]}
            onClick={onItemClick}
            />
        );

        return <Fragment key={index}>{retVal}</Fragment>;
      })}
    </ul>
  )
}

type ItemProps = {
  value: ITransactionData
  budget: IBudget | IGoal
  wallet: IWallet
  onClick?: (item: ITransactionData) => void
}

ExpenseList.Item = ({ value, budget, wallet, onClick } : ItemProps) => {

  const content = (
    <>
      <div className='flex items-center'>
        <div className="relative z-[-1]">
          <BudgetIcon className='ml-4 mr-2' color={budget.color} icon={budget.icon} />
          <div className="absolute rounded-full bottom-2 right-1 app-bg">
            {/* <ClockIcon className="w-5 h-5"/> */}
            {/* <CheckCircleIcon className="w-5 h-5 text-green-500"/> */}
          </div>
        </div>
        
        <div className="text-left">
          <div className='text-sm font-medium'>
            {budget?.budgetName}
          </div>
          <div className='flex items-center space-x-1 text-xs'>
            {value.labels && value.labels.length > 0 ? (
              <span className="text-white bg-gray-500 dark:text-[#242424] rounded w-4"><TagIcon className=""/></span>
            ) : null}
            <span className="font-medium text-gray-500">{wallet.walletName}</span>
          </div>
        </div>
      </div>
      <div className='mr-5 text-right'>
        <div className='text-sm font-medium'>{money(value.amount)}</div>
        <div className='text-xs text-gray-500'>{value.remarks}</div>
      </div>
    </>
  )

  return (
    <li className={onClick ? '' : 'flex items-center justify-between'}>
      {onClick ? (
        <button className='flex items-center justify-between w-full' onClick={() => onClick(value)}>
          {content}
        </button>
      ) : content}
    </li>
  )
}

type ExpenseListConnectedProps = Pick<ExpenseListProps, "items" | "showHeader">

const ExpenseListConnected = (props : ExpenseListConnectedProps) => {
  const budgetList = useBudgetStore(state => state.budget.list)
  const walletList = useBudgetStore(state => state.wallet.list)
  const [showContext, setShowContext] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ITransactionData | undefined>()
  const [selectPayment, setSelectPayment] = useState(false)
  const updateTransaction = useUpdateTransaction()

  return (
    <>
      <ExpenseList
        budgetList={budgetList}
        walletList={walletList}
        onItemClick={(item) => {
          setSelectedItem(item)
          setShowContext(true)
        }}
        {...props}
        />
      <ViewExpense/>
      <ContextMenu 
        open={showContext}
        onClose={() => setShowContext(false)}
        items={[{
          icon: WalletIcon,
          label: 'Change Payment Method',
          onClick: () => {
            setShowContext(false)
            setSelectPayment(true)
          }
        }]}
        />
      <Dialog isOpen={selectPayment} title='' onClose={() => setSelectPayment(!selectPayment)} showClose={false} position='bottom'>
        <PaymentMethodList
          items={Object.values(walletList)}
          selected={selectedItem ? walletList[selectedItem.walletId] : undefined}
          onSelect={w => {
            if (selectedItem) {
              updateTransaction(selectedItem.id, {
                ...selectedItem,
                walletId: w.id
              })
              setSelectPayment(false)
              setSelectedItem(undefined)
              toast.success(`Expense payment method updated`);
            }
          }}
          />
      </Dialog>
      
    </>
  )
}

export default ExpenseListConnected