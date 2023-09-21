import { Dialog } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useHistory } from 'react-router-dom';
import { getDefaultWallet, useTransactionStore } from '../../../app/store';
import IncomeForm from '../../../components/income-form';
import NavBar from '../../../shared/components/navbar';

export default function IncomeAdd() {
  const history = useHistory();
  const addIncome = useTransactionStore((state) => state).addIncome;

  const defaultWallet = getDefaultWallet();

  return (
    <Dialog
      open
      onClose={() => history.goBack()}
      as='div'
      className='fixed inset-0 overflow-y-auto'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-75' />
      <div className='fixed inset-x-0 bottom-0 overflow-hidden app-bg rounded-t-2xl'>
        <NavBar
          leftButton={{
            type: 'button',
            icon: ArrowLeftIcon,
            onClick: () => history.goBack()
          }}
          title='New Income'
          />
        <IncomeForm
          onSubmit={(value) => {
            addIncome(defaultWallet.id, value.amount, value.remarks);
            history.goBack();
          }}
        />
      </div>
    </Dialog>
  );
}
