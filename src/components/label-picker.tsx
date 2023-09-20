import { ChevronDownIcon, TagIcon } from "@heroicons/react/20/solid"
import { useLocQuery } from "../app/hooks"
import { useHistory } from "react-router"
import useLabelStore from "../app/store/label-store"
import MultiSelectDialog from "./multi-select-dialog"
import Chip from "../shared/components/chip"

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

  const button = selected.length === 0 ? (
    <Chip 
      onClick={handleOpen}
      leftElement={<TagIcon className="w-5 h-5"/>}
    >
      Label
    </Chip>
  ) : selected.length === 1 ? (
    <Chip
      onClick={handleOpen}
      leftElement={<TagIcon className="w-5 h-5"/>}
      rightElement={<ChevronDownIcon className="w-5 h-5"/>}
      active
      >
      {selected[0]}
    </Chip>
  ) : (
    <Chip
      onClick={handleOpen} 
      leftElement={<span className='w-5 h-5 rounded-full bg-white/25'>{selected.length}</span>}
      rightElement={<ChevronDownIcon className="w-5 h-5"/>}
      active
      >
      Labels
    </Chip>
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