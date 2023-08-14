import { PropsWithChildren } from "react"
import OverviewPie from "../components/widgets/charts/overview-pie"

const Dashboard2 : React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <OverviewPie/>
      {children}
    </>
  )
}

export default Dashboard2