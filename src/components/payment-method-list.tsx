import { IWalletData } from "../app/@types"
import PaymentMethodIcon from "./payment-method-icon"

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
              flex justify-between w-full text-left py-2 px-3 font-medium text-sm outline-none focus:outline-none 
              `}
              onClick={e => {
                e.preventDefault()
                onSelect(wallet)
              }}
            >
              <div className="flex items-center space-x-4">
                <PaymentMethodIcon type={wallet.type}/>
                <span>{wallet.walletName}</span>
              </div>
              {wallet.id === selected?.id && <CheckIcon className="w-6 h-6" />}
            </button>
          </li>
        ))}
    </ul>
  )
}

function CheckIcon(props: { className : string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#22c55e" opacity="0.75" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PaymentMethodList