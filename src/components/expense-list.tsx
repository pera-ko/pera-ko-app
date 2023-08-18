import dayjs from "dayjs";
import { IBudget, IBudgetData, IGoal, IGoalData, ITransaction, IWallet } from "../app/@types";
import calendar from 'dayjs/plugin/calendar';
import BudgetIcon from "./budget-icon";
import { Fragment } from "react";
import { money } from "../app/utils";

dayjs.extend(calendar);

type Props = {
  items: ITransaction[]
  budgetList: (IGoalData | IBudgetData)[]
  walletList: Record<string, IWallet>
  showHeader?: boolean
}

const ExpenseList = ({ items, budgetList, walletList, showHeader } : Props) => {
  
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
        <div className="relative">
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
          <div className='text-xs'>
            {wallet.walletName}
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

export default ExpenseList