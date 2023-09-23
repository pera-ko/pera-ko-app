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

  return (budgetId: string, walletId: string, amount: number, remarks?: string, labels?: string[]) => {
    const id = crypto.randomUUID()
    addTransaction(id, budgetId, walletId, amount, remarks, labels)
    addAggregateTransaction(id, budgetId, walletId, amount, remarks, labels);
    addPaymentTransaction(id, budgetId, walletId, amount, remarks, labels);
  }
}

export default useAddExpense