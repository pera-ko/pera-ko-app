import { Dialog } from "@headlessui/react"
import { ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import React, { PropsWithChildren } from "react"
import NavBar from "./navbar"

type SelectDialogProps<T> = {
  title: string
  items: T[]
  selected: T
  onClose: () => void
  onSelect: (value: T) => void
  searchPredicate: (query: string, value: T) => boolean
  renderItem: (value: T) => React.ReactNode
  isOpen?: boolean
  allowCreation?: boolean
  onCreate?: (value: string) => T
}

function SelectDialog<T>({ 
  title,
  items, 
  selected,
  isOpen, 
  allowCreation, 
  onClose, 
  onSelect, 
  onCreate,
  searchPredicate,
  renderItem
} : SelectDialogProps<T>) {
  const [query, setQuery] = React.useState("")

  const renderSelect = (lbl: T) => (
    <div className="flex items-center justify-between">
      <span>{renderItem(lbl)}</span>
    </div>
  )

  let queryResult: T[] = []

  if (query.length > 0) {
    queryResult = items.filter(item => searchPredicate(query, item))
  }

  return (
    (
      <Dialog as="div"
        open={isOpen} 
        onClose={onClose} 
        className="fixed inset-0 z-20 overflow-y-auto app-bg dark:bg-black"
        >
        <NavBar
          leftButton={{
            type: "button",
            icon: ArrowLeftIcon,
            onClick: onClose
          }}
          title={title}
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
            {
              items.length > 0 ? (
                <Panel title={`Select ${title}`}>
                  <LabelList
                    items={items}
                    onClickItem={lbl => {
                      onSelect(lbl)
                      onClose()
                    }}
                    renderItem={renderSelect}
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
                onSelect(lbl)
                onClose()
              }}
              renderItem={renderSelect}
              />
          </Panel>
        ) : allowCreation ? (
          <button 
            className="flex items-center w-full px-5 py-3 my-2 app-bg"
            onClick={() => {
              if (onCreate) {
                const newItem = onCreate(query)
                onSelect(newItem)
                setQuery("")
                onClose()
              }
            }}
            >
            <PlusIcon className="w-6 h-6 mr-5"/>
            Create "<span className="font-medium">{query}</span>"
          </button>
        ) : null }
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

export default SelectDialog