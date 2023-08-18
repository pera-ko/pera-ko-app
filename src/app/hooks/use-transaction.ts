import { useTransactionStore } from "../store";
import useAggregateStore from "../store/aggregate-store";
import useExpensesPaymentStore from "../store/expenses-payment-store";

const useAddTransaction = () => {
  const { addTransaction } = useTransactionStore()(
    (state) => ({
      addTransaction: state.addTransaction
    })
  );
  const addPaymentTransaction = useExpensesPaymentStore(state => state.addTransaction)
  const { addAggregateTransaction } = useAggregateStore(state => ({ addAggregateTransaction: state.addTransaction }))

  return (budgetId: string, walletId: string, amount: number, remarks?: string) => {
    const id = crypto.randomUUID()
    addTransaction(id, budgetId, walletId, amount, remarks)
    addAggregateTransaction(id, budgetId, walletId, amount, remarks);
    addPaymentTransaction(id, budgetId, walletId, amount, remarks);
  }
}

export default useAddTransaction