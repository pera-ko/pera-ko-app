import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { IWalletData } from "../app/@types"

type Props = {
  items: Array<IWalletData>
  selected: IWalletData
  onSelect(val: IWalletData): void
}
const PaymentMethodList = ({ items, selected, onSelect } : Props) => {
  
  return (
    <ul className='space-y-2'>
      {items
        .filter((wallet) => !wallet.isDeleted)
        .map((wallet) => (
          <li className='block' key={wallet.id}>
            <button
              className={`
              flex justify-between w-full text-left py-3 px-3 rounded-lg font-medium outline-none focus:outline-none
              ${
                wallet.id === selected?.id
                  ? 'bg-indigo-500/25 text-white'
                  : 'focus:bg-indigo-50 focus:ring-2 focus:ring-indigo-200'
              }`}
              onClick={e => {
                e.preventDefault()
                onSelect(wallet)
              }}
            >
              {wallet.walletName}
              {wallet.id === selected?.id && <CheckCircleIcon className='w-6 h-6' />}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default PaymentMethodList