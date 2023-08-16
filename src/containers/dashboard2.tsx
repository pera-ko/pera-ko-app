import { PropsWithChildren } from "react"
import TotalExpenses from "../components/widgets/total-expenses"
import AppBar from "../components/appbar"
import NewTransaction from "./new-transaction"

const Dashboard2 : React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar/>
      <TotalExpenses/>
      {children}
      <NewTransaction />
    </>
  )
}

export default Dashboard2