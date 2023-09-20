import { Listbox, Portal, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronUpDownIcon
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { IWalletData } from '../app/@types';
import InputGroup from '../shared/components/input-group';
import useBudgetStore from '../app/store/budget-store';
import useTransactionStore from '../app/store/transaction-store';

type Inputs = {
  amount: number;
  remarks?: string;
}
const WalletTransfer = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const history = useHistory();
  const [walletFrom, setWalletFrom] = useState<IWalletData | null>(null);
  const [walletTo, setWalletTo] = useState<IWalletData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const walletList = useBudgetStore((state) => state.wallet.list);
  const addTransfer = useTransactionStore((state) => state.addTransfer);

  const handleClose = () => history.goBack();
  const handleFormSubmit: SubmitHandler<Inputs> = (value) => {
    if (walletFrom && walletTo) {
      addTransfer(walletFrom.id, walletTo.id, value.amount, value.remarks);
      handleClose();
    }
  };

  return (
    <Portal>
      <>
        <form
          id='wallet-transfer-form'
          className='fixed inset-0 bg-white'
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className='sticky top-0 flex items-center font-medium bg-current bg-white'>
            <button
              className='p-5 outline-none focus:outline-none'
              onClick={handleClose}
            >
              <ArrowLeftIcon className='w-6 h-6' />
            </button>
            Transfer
          </div>
          <div className='px-5'>
            <div className='mt-3 text-sm font-medium'>Transfer from</div>
            <WalletSelect
              items={Object.values(walletList).filter(
                (w) => w.id !== walletTo?.id
              )}
              value={walletFrom}
              onChange={setWalletFrom}
            />
            <div className='mt-3 text-sm font-medium'>Transfer to</div>
            <WalletSelect
              items={Object.values(walletList).filter(
                (w) => w.id !== walletFrom?.id
              )}
              value={walletTo}
              onChange={setWalletTo}
            />
            <div className='my-3'>
              <InputGroup
                inputClassName='text-right'
                label='Transfer Amount'
                error={errors.amount}
                type='number'
                step='.01'
                contentLabel={{ type: 'text', content: 'PHP' }}
                {...register('amount', { required: 'Amount is required.' })}
              />
            </div>
            <div className='my-3'>
              <InputGroup label='Remarks' {...register('remarks')} />
            </div>
          </div>
        </form>
        <div className='fixed bottom-0 pb-6 text-center inset-x-5'>
          <button
            form='wallet-transfer-form'
            type='submit'
            className='w-full px-4 py-3 text-sm text-white bg-indigo-600 rounded-lg shadow-md'
          >
            Transfer
          </button>
        </div>
      </>
    </Portal>
  );
};

const WalletSelect = ({
  items,
  value,
  onChange
}: {
  items: IWalletData[];
  value: IWalletData | null;
  onChange(value: IWalletData): void;
}) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
          <span className='block truncate'>
            {value ? value.walletName : ' - Select Wallet - '}
          </span>
          <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <ChevronUpDownIcon
              className='w-5 h-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className='absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          >
            {items
              .filter((w) => !w.isDeleted)
              .map((wallet) => (
                <Listbox.Option
                  key={wallet.id}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                        cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={wallet}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {wallet.walletName}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default WalletTransfer;
