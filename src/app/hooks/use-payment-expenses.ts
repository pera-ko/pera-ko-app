import dayjs from "dayjs";
import usePerako from "../contexts/perako-context";
import { useTransactionStore } from "../store";
import useExpensesPaymentStore from "../store/expenses-payment-store";

const usePaymentExpenses = (walletId: string) => {
  const transactions = useExpensesPaymentStore(state => state.transactions)

  let retVal = 0;

  if (!transactions[walletId]) return retVal;

  const today = dayjs().subtract(30, 'days')

  for (const tran of transactions[walletId]) {
    if (dayjs(tran.tranDate) > today) break;

    retVal += tran.amount
  }

  return retVal
}

export default usePaymentExpenses