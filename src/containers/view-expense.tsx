import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import NavBar from "../shared/components/navbar"
import Page from "../shared/components/page"
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