import { useHistory, useRouteMatch } from 'react-router';
import { createWallet } from '../app/store';
import Dialog from '../components/dialog';
import WalletForm from '../components/wallet-form';

const WalletEditor = () => {
  const route = useRouteMatch('/:year/:month/preferences/newwallet');
  const history = useHistory();

  const handleClose = () => history.goBack();
  const handleSubmit = (wallet: { walletName: string }) => {
    if (route) {
      // add
      createWallet(wallet.walletName);
    }

    handleClose();
  };

  const isOpen = route ? true : false;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={route ? 'New Wallet' : 'Edit Wallet'}
      buttons={[
        {
          type: 'submit',
          form: 'wallet-form',
          text: route ? 'Add Wallet' : 'Update',
          className:
            'inline-flex justify-center px-4 py-2 text-sm font-medium bg-indigo-900 text-indigo-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        }
      ]}
    >
      <WalletForm id='wallet-form' onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default WalletEditor;
