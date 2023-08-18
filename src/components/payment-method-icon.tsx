import { BanknotesIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline";

type Props = {
  type: "credit-card" | "e-wallet" | "cash";
}

const PaymentMethodIcon = ({ type }: Props) => {
  if (type === "credit-card") return <CreditCardIcon className='w-6 h-6' />

  if (type === "e-wallet") return <WalletIcon className='w-6 h-6' />
  
  return <BanknotesIcon className='w-6 h-6' />
}

export default PaymentMethodIcon