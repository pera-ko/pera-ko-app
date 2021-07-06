import toast from 'react-hot-toast';
import { useHistory, useRouteMatch } from 'react-router';
import useStore, {
  createWallet,
  deleteWallet,
  undoDeleteWallet,
  updateWallet
} from '../app/store';
import Dialog, { IDialogButton } from '../components/dialog';
import WalletForm from '../components/wallet-form';

const WalletEditor = () => {
  const route = useRouteMatch('/:year/:month/preferences/newwallet');
  const editRoute = useRouteMatch<{ id: string }>(
    '/:year/:month/preferences/wallet/:id/edit'
  );
  const history = useHistory();
  const walletList = useStore((state) => state.wallet.list);

  const defaultValue = editRoute ? walletList[editRoute.params.id] : undefined;

  const handleClose = () => history.goBack();
  const handleSubmit = (wallet: { walletName: string }) => {
    if (route) {
      // add
      createWallet(wallet.walletName);
    } else {
      // edit
      if (defaultValue) {
        updateWallet({
          id: defaultValue.id,
          walletName: wallet.walletName
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
            className='uppercase font-medium text-sm text-indigo-600'
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
      text: route ? 'Add Wallet' : 'Update',
      className:
        'inline-flex justify-center px-4 py-2 text-sm font-medium bg-indigo-900 text-indigo-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
    }
  ];
  if (editRoute) {
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
      title={route ? 'New Wallet' : 'Edit Wallet'}
      buttons={dialogButtons}
    >
      <WalletForm
        id='wallet-form'
        defaultValue={defaultValue}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default WalletEditor;
