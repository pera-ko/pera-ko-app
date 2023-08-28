import { Dialog } from "@headlessui/react"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid"
import { ArrowLeftIcon, BackspaceIcon, CheckIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import React, { PropsWithChildren } from "react"
import NavBar from "./navbar"

type MultiSelectDialogProps<T> = {
  title: string
  items: T[]
  selected: T[]
  onClose: () => void
  onConfirm: (value: T[]) => void
  searchPredicate: (query: string, value: T) => boolean
  renderItem: (value: T) => React.ReactNode
  isOpen?: boolean
  allowCreation?: boolean
  onCreate?: (value: string) => T
}

function MultiSelectDialog<T>({ 
  title,
  items, 
  selected,
  isOpen, 
  allowCreation, 
  onClose, 
  onConfirm, 
  onCreate,
  searchPredicate,
  renderItem
} : MultiSelectDialogProps<T>) {
  const [tmpSelected, setTmpSelected] = React.useState<T[]>(selected)
  const [query, setQuery] = React.useState("")

  const renderAdd = (lbl: T) => (
    <div className="flex items-center justify-between">
      <span>{renderItem(lbl)}</span>
      <PlusCircleIcon className="w-5 h-5"/>
    </div>
  )

  const availableLabels = items.filter(lbl => !tmpSelected.includes(lbl))

  let queryResult: T[] = []

  if (query.length > 0) {
    queryResult = items.filter(item => searchPredicate(query, item))
  }

  return (
    (
      <Dialog as="div"
        open={isOpen} 
        onClose={onClose} 
        className="fixed inset-0 z-10 pb-20 overflow-y-auto app-bg dark:bg-black"
        >
        <NavBar
          leftButton={{
            type: "button",
            icon: ArrowLeftIcon,
            onClick: onClose
          }}
          title={title}
          rightButton={{
            type: 'button',
            icon: BackspaceIcon,
            onClick: () => onConfirm([])
          }}
          />
        <label className="sticky flex items-center px-2 shadow app-bg top-16">
          <MagnifyingGlassIcon className="w-6 h-6 mx-3"/>
          <input type="search" placeholder="Search"
            className="flex-1 px-2 py-2 bg-transparent outline-none" 
            value={query} onChange={e => setQuery(e.currentTarget.value)}
            />
        </label>
        {query.length === 0 ? (
          <>
            <Panel title="Selected">
              {tmpSelected.length > 0 ? (
                  <LabelList
                  items={tmpSelected}
                  onClickItem={lbl => setTmpSelected(tmpSelected.filter(s => s !== lbl))}
                  renderItem={lbl => (
                    <div className="flex items-center justify-between">
                      <span>{renderItem(lbl)}</span>
                      <MinusCircleIcon className="w-5 h-5"/>
                    </div>
                  )}
                  />
                ) : (
                  <div className="py-2 mx-5 text-sm">
                    No Selected Labels
                  </div>
                )}
            </Panel>
            {
              availableLabels.length > 0 ? (
                <Panel title="Select Labels">
                  <LabelList<T>
                    items={availableLabels}
                    onClickItem={lbl => setTmpSelected([...tmpSelected, lbl])}
                    renderItem={renderAdd}
                    />
                </Panel>
              ) : null 
            }
          </>
        ) : queryResult.length > 0 ? (
          <Panel title="Search Result">
            <LabelList
              items={queryResult}
              onClickItem={lbl => {
                setTmpSelected([...tmpSelected, lbl])
                setQuery("")
              }}
              renderItem={renderAdd}
              />
          </Panel>
        ) : allowCreation ? (
          <button 
            className="flex items-center w-full px-5 py-3 my-2 app-bg"
            onClick={() => {
              if (onCreate) {
                const newItem = onCreate(query)
                setTmpSelected([...tmpSelected, newItem])
                setQuery("")
              }
            }}
            >
            <PlusIcon className="w-6 h-6 mr-5"/>
            Create "<span className="font-medium">{query}</span>"
          </button>
        ) : null }
        {tmpSelected.length > 0 ? (
          <div className="fixed inset-x-0 bottom-0 flex justify-end px-8 py-8 text-sm font-medium">
            <button className="flex items-center px-4 py-3 text-white bg-indigo-600 rounded-full shadow-md"
              onClick={() => onConfirm(tmpSelected)}
            >
              <CheckIcon className="w-6 h-6 mr-2"/> Confirm
            </button>
          </div>
        ) : null}
      </Dialog>
    )
  )
}

const Panel = ({ title, children } : PropsWithChildren<{ title : string }>) => {
  return (
    <div className="py-2 my-2 bg-white shadow dark:app-bg">
      <div className="py-2 mx-5 mb-2 text-sm font-medium text-gray-500">
        {title}
      </div>
      {children}
    </div>
  )
}

type LabelListProps<T> = { 
  items: T[]
  onClickItem: (value: T) => void
  renderItem: (value: T) => React.ReactNode
}
function LabelList<T>({ items, onClickItem, renderItem } : LabelListProps<T>) {
  return (
    <ul className="text-sm">
      {items.map((lbl, index) => (
        <li key={index}>
          <button 
            className="w-full px-5 py-3 text-left"
            onClick={() => onClickItem(lbl)}
            >
            {renderItem(lbl)}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MultiSelectDialog