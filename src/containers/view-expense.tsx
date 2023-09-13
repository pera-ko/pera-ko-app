import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import NavBar from "../components/navbar"
import Page from "../components/page"
import { useHistory } from "react-router"

const ViewExpense = () => {
  const history = useHistory()
  return (
    <Page isOpen={false}>
      <NavBar
        leftButton={{
          type: 'button',
          icon: ArrowLeftIcon,
          onClick: () => history.goBack(),
        }}
        title=""
        />
        <div>
          asd
        </div>
    </Page>
  )
}

export default ViewExpense