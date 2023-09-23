import { ITransactionData } from "../../../shared/@types";
import { useTransactionStore } from "../../../app/store";
import useAggregateStore from "../../../app/store/aggregate-store";
import useExpensesPaymentStore from "../../../app/store/expenses-payment-store";

const useUpdateTransaction = () => {
  const { updateTransaction } = useTransactionStore(
    (state) => ({
      updateTransaction: state.updateTransaction
    })
  );
  const updatePaymentTransaction = useExpensesPaymentStore(state => state.updateTransaction)
  const { updateAggregateTransaction } = useAggregateStore(state => ({ updateAggregateTransaction: state.updateTransaction }))

  return (id: string, tranData: ITransactionData) => {
    updateTransaction(id, tranData);
    updatePaymentTransaction(id, tranData);
    updateAggregateTransaction(id, tranData);
  }
}

export default useUpdateTransaction