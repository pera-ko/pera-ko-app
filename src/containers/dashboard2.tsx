import { PropsWithChildren } from "react"
import TotalExpenses from "../components/widgets/total-expenses"
import AppBar from "../components/appbar"
import NewTransaction from "./new-transaction"
// import TotalPaymentExpenses from "../components/widgets/total-payment-expenses"
import RecentExpenses from "../components/widgets/recent-expenses"

const Dashboard2 : React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <AppBar/>
      <TotalExpenses/>
      {/* <TotalPaymentExpenses/> */}
      {children}
      <div>
        <div className="pt-6">
          <RecentExpenses/>
        </div>
      </div>
      <NewTransaction />
    </div>
  )
}

export default Dashboard2
