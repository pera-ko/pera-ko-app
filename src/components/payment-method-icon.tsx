import { BanknotesIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline";

type Props = {
  type: "credit-card" | "e-wallet" | "cash";
  className?: string
}

const PaymentMethodIcon = ({ type, className }: Props) => {
  if (type === "credit-card") return <CreditCardIcon className={`w-6 h-6 ${className}`} />

  if (type === "e-wallet") return <WalletIcon className={`w-6 h-6 ${className}`} />
  
  return <BanknotesIcon className={`w-6 h-6 ${className}`} />
}

export default PaymentMethodIcon