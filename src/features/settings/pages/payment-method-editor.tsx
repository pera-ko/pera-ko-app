import toast from 'react-hot-toast';
import { useHistory, useRouteMatch } from 'react-router';
import {
  createWallet,
  deleteWallet,
  undoDeleteWallet,
  updateWallet
} from '../../../app/store';
import Dialog, { IDialogButton } from '../../../shared/components/dialog';
import PaymentMethodForm from '../../expenses/components/payment-method-form';
import useBudgetStore from '../../../app/store/budget-store';

const WalletEditor = () => {
  const route = useRouteMatch('/:year/:month/preferences/newwallet');
  const editRoute = useRouteMatch<{ id: string }>(
    '/:year/:month/preferences/wallet/:id/edit'
  );
  const history = useHistory();
  const walletList = useBudgetStore((state) => state.wallet.list);

  const defaultValue = editRoute ? walletList[editRoute.params.id] : undefined;

  const handleClose = () => history.goBack();
  const handleSubmit = (wallet: { walletName: string, type: "credit-card" | "e-wallet" | "cash" }) => {
    if (route) {
      // add
      createWallet(wallet.walletName, wallet.type);
    } else {
      // edit
      if (defaultValue) {
        updateWallet({
          id: defaultValue.id,
          walletName: wallet.walletName,
          type: wallet.type
        });
      }
    }

    handleClose();
  };
  const handleDelete = () => {
    if (defaultValue) {
      deleteWallet(defaultValue);
      toast((t) => (
        <span className='flex items-center space-x-3'>
          <span>{defaultValue.walletName} has been deleted.</span>
          <button
            className='text-sm font-medium text-indigo-600 uppercase'
            onClick={() => {
              undoDeleteWallet(defaultValue);
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </span>
      ));
      handleClose();
    }
  };

  let dialogButtons: IDialogButton[] = [
    {
      type: 'submit',
      form: 'wallet-form',
      text: 'Save',
      className:
        'inline-flex justify-center px-4 py-2 text-sm font-medium bg-indigo-900 text-indigo-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
    }
  ];
  if (defaultValue?.id !== "default" && editRoute) {
    dialogButtons = [
      {
        type: 'button',
        text: 'Delete',
        onClick: handleDelete,
        className:
          'inline-flex justify-center px-4 py-2 text-sm font-medium bg-red-900 text-red-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
      },
      ...dialogButtons
    ];
  }
  const isOpen = route || editRoute ? true : false;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={route ? 'Add Payment Method' : 'Update Payment Method'}
      buttons={dialogButtons}
    >
      <div className='px-4'>
        <PaymentMethodForm
          id='wallet-form'
          defaultValue={defaultValue}
          onSubmit={handleSubmit}
          isDefault={defaultValue?.id === "default"}
          />
      </div>
    </Dialog>
  );
};

export default WalletEditor;
