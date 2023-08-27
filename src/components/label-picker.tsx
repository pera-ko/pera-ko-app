import { ChevronDownIcon, TagIcon } from "@heroicons/react/20/solid"
import { useLocQuery } from "../app/hooks"
import { useHistory } from "react-router"
import useLabelStore from "../app/store/label-store"
import MultiSelectDialog from "./multi-select-dialog"

type LabelPickerProps = {
  items: string[]
  selected: string[]
  onChange: (values: string[]) => void
  allowCreation?: boolean
  onCreate?: (value: string) => string
}

export function LabelPicker({ items, selected, onChange, allowCreation, onCreate } : LabelPickerProps) {
  const { set, search } = useLocQuery<{ labelPicker: 'open' | 'closed'}>();
  const history = useHistory();
  const isOpen = search['labelPicker'] === 'open';

  const handleOpen = () => {
    set({ labelPicker: 'open' });
  }

  const handleChange = (values: string[]) => {
    onChange(values)
    history.goBack()
  }

  const renderItem = (lbl: string) => (
    <span>{lbl}</span>
  )
  
  let buttonClassNames = "flex items-center px-2 py-1 text-sm rounded-full border "

  if (selected.length === 0) {
    buttonClassNames += "bg-gray-500/10 border-gray-500/30"
  } else {
    buttonClassNames += "bg-indigo-500/25 border-transparent"
  }
  
  const button = (
    <button 
      type='button'
      onClick={handleOpen}
      className={buttonClassNames}
      >
      {selected.length === 0 ? (
        <>
          <TagIcon className='w-5 h-5 mr-1'/> Label
        </>
      ) : selected.length === 1 ? (
        <>
          <TagIcon className='w-5 h-5 mr-1'/>
            {selected[0]}
          <ChevronDownIcon className='w-5 h-5'/>
        </>
      ) : (
        <>
          <span className='w-5 h-5 mr-1 rounded-full bg-white/25'>{selected.length}</span>
            Labels
          <ChevronDownIcon className='w-5 h-5'/>
        </>
      )}
    </button>
  )

  return (
    <>
      {button}
      <MultiSelectDialog
        isOpen={isOpen}
        items={items}
        selected={selected}
        onClose={() => history.goBack()}
        onConfirm={handleChange}
        renderItem={renderItem}
        searchPredicate={(q, lbl) => lbl.toLowerCase().indexOf(q.trim()) !== -1 && !selected.includes(lbl)}
        title="Labels"
        allowCreation={allowCreation}
        onCreate={onCreate}
        />
    </>
  )
}

type LabelPickerConnectedProps = Pick<LabelPickerProps, "onChange" | "selected">

const LabelPickerConnected = ({ onChange, selected } : LabelPickerConnectedProps) => {
  
  const items = useLabelStore(state => state.list)
  const createLabel = useLabelStore(state => state.createLabel)

  return (
    <LabelPicker
      allowCreation
      onCreate={createLabel}
      items={items}
      onChange={onChange}
      selected={selected}
      />
  )
}
export default LabelPickerConnected