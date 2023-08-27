import dayjs from "dayjs";
import { IBudget, IBudgetData, IGoal, IGoalData, ITransaction, IWallet } from "../app/@types";
import calendar from 'dayjs/plugin/calendar';
import BudgetIcon from "./budget-icon";
import { Fragment } from "react";
import { money } from "../app/utils";
import { TagIcon } from "@heroicons/react/20/solid";
import { useBudgetStore } from "../app/store";

dayjs.extend(calendar);

type ExpenseListProps = {
  items: ITransaction[]
  budgetList: (IGoalData | IBudgetData)[]
  walletList: Record<string, IWallet>
  showHeader?: boolean
}

export const ExpenseList = ({ items, budgetList, walletList, showHeader } : ExpenseListProps) => {
  
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
            />
        );

        return <Fragment key={index}>{retVal}</Fragment>;
      })}
    </ul>
  )
}

type ItemProps = {
  value: ITransaction
  budget: IBudget | IGoal
  wallet: IWallet
}

ExpenseList.Item = ({ value, budget, wallet } : ItemProps) => {
  return (
    <li className='flex items-center justify-between'>
      <div className='flex items-center'>
        <div className="relative z-[-1]">
          <BudgetIcon className='ml-4 mr-2' color={budget.color} icon={budget.icon} />
          <div className="absolute rounded-full bottom-2 right-1 app-bg">
            {/* <ClockIcon className="w-5 h-5"/> */}
            {/* <CheckCircleIcon className="w-5 h-5 text-green-500"/> */}
          </div>
        </div>
        
        <div>
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
    </li>
  )
}

type ExpenseListConnectedProps = Pick<ExpenseListProps, "items" | "showHeader">

const ExpenseListConnected = (props : ExpenseListConnectedProps) => {
  const budgetList = useBudgetStore(state => state.budget.list)
  const walletList = useBudgetStore(state => state.wallet.list)

  return (
    <ExpenseList
      budgetList={budgetList}
      walletList={walletList}
      {...props}
      />
  )
}

export default ExpenseListConnected