import { Transition } from '@headlessui/react';
import { PencilIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { longMonths } from '../app/constants';
import { money } from '../app/utils';
import ModalFull from '../components/modal-full';
import WalletTransfer from './wallet-transfer';
import useBudgetStore from '../app/store/budget-store';
import useTransactionStore from '../app/store/transaction-store';

const WalletDetails = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const route = useRouteMatch<{ id: string }>(
    '/:year/:month/preferences/wallet/:id'
  );
  const history = useHistory();
  const walletList = useBudgetStore((state) => state.wallet.list);
  const { getTotalIncomeOfWallet, getTotalExpensesOfWallet } =
    useTransactionStore(
      (state) => ({
        getTotalIncomeOfWallet: state.getTotalIncomeOfWallet,
        getTotalExpensesOfWallet: state.getTotalExpensesOfWallet
      }),
      shallow
    );

  const selectedWallet = route ? walletList[route.params.id] : undefined;
  const handleClose = () => history.goBack();
  const isOpen = route ? true : false;

  const totalWalletExpenses = selectedWallet
    ? getTotalExpensesOfWallet(selectedWallet.id)
    : 0;
  const totalIncomeOfWallet = selectedWallet
    ? getTotalIncomeOfWallet(selectedWallet.id)
    : 0;
  const balance = totalIncomeOfWallet - totalWalletExpenses;

  return (
    <>
      <ModalFull isOpen={isOpen} title='Wallet' onClose={handleClose}>
        <div className='sticky bg-white top-16'>
          <div className='px-5 pb-5 mt-2 text-center shadow-md'>
            <h3 className='flex-1 text-xl'>{selectedWallet?.walletName}</h3>
            <h1 className='flex-1 mt-3 text-2xl'>{money(balance)}</h1>
            <div className='text-sm font-medium text-gray-500'>
              Available Balance
            </div>
          </div>
          <div className='p-5 font-medium shadow-inner bg-gray-50'>
            Transaction History for {longMonths[+month - 1]}
          </div>
        </div>

        <Transition show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 transform translate-x-full'
            enterTo='opacity-100 transform translate-x-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 transform translate-x-0'
            leaveTo='opacity-0 transform translate-x-full'
          >
            <div
              className={`bottom-5 inset-x-5 bg-gray-700 text-white fixed px-4 flex justify-evenly rounded shadow-md z-10`}
            >
              <Link to={`${route?.url}/transfer`} className='p-3'>
                <ArrowsRightLeftIcon className='w-6 h-6' />
              </Link>
              <Link to={`${route?.url}/edit`} className='p-3'>
                <PencilIcon className='w-6 h-6' />
              </Link>
            </div>
          </Transition.Child>
        </Transition>
        <Route
          path='/:year/:month/preferences/wallet/:id/transfer'
          component={WalletTransfer}
        />
      </ModalFull>
    </>
  );
};

export default WalletDetails;
