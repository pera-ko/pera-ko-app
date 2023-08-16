import { PropsWithChildren } from "react"
import TotalExpenses from "../components/widgets/total-expenses"
import Navbar from "../components/navbar"
import NewTransaction from "./new-transaction"

const Dashboard2 : React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar/>
      <TotalExpenses/>
      {children}
      <NewTransaction />
    </>
  )
}

export default Dashboard2