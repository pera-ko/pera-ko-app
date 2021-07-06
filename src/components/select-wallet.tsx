import { ChevronDownIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { IWalletData } from '../app/@types';
import Dialog from './dialog';

interface Props {
  value?: IWalletData;
  items: IWalletData[];
  onChange(value: IWalletData): void;
}
const SelectWallet = ({ value, items, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (wallet: IWalletData) => {
    onChange(wallet);
    setIsOpen(false);
  };
  return (
    <>
      <button
        className='text-sm font-medium space-x-1 outline-none focus:outline-none'
        onClick={() => setIsOpen(true)}
      >
        <span>{value?.walletName}</span>
        <ChevronDownIcon className='h-4 w-4 inline-block' />
      </button>
      <Dialog
        isOpen={isOpen}
        title='Select Wallet'
        onClose={() => setIsOpen(false)}
        showClose={false}
      >
        <ul className='space-y-2'>
          {items
            .filter((wallet) => !wallet.isDeleted)
            .map((wallet) => (
              <li className='block'>
                <button
                  className={`
                  flex justify-between w-full text-left py-3 px-3 rounded-lg font-medium outline-none focus:outline-none
                  ${
                    wallet.id === value?.id
                      ? 'bg-indigo-600 text-white'
                      : 'focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-200'
                  }`}
                  onClick={() => handleChange(wallet)}
                >
                  {wallet.walletName}
                  {wallet.id === value?.id && <CheckIcon className='h-6 w-6' />}
                </button>
              </li>
            ))}
        </ul>
      </Dialog>
    </>
  );
};

export default SelectWallet;
