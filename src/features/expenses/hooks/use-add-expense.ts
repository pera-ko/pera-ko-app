import { useTransactionStore } from "../../../app/store";
import useAggregateStore from "../../../app/store/aggregate-store";
import useExpensesPaymentStore from "../../../app/store/expenses-payment-store";

const useAddExpense = () => {
  const { addTransaction } = useTransactionStore(
    (state) => ({
      addTransaction: state.addTransaction
    })
  );
  const addPaymentTransaction = useExpensesPaymentStore(state => state.addTransaction)
  const { addAggregateTransaction } = useAggregateStore(state => ({ addAggregateTransaction: state.addTransaction }))

  return (budgetId: string, walletId: string, amount: number, remarks?: string, labels?: string[], date?: Date) => {
    const id = crypto.randomUUID()
    const tranDate = date ? date.toJSON() : undefined
    addTransaction(id, budgetId, walletId, amount, remarks, labels, tranDate)
    addAggregateTransaction(id, budgetId, walletId, amount, remarks, labels, tranDate);
    addPaymentTransaction(id, budgetId, walletId, amount, remarks, labels, tranDate);
  }
}

export default useAddExpense