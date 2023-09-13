import { Dialog, Portal, Transition } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import React from "react"
import { Fragment } from "react"

type ContextMenuProps = {
  title?: string
  onClose: () => void
  open?: boolean
  items: Array<{
    icon: typeof ArrowLeftIcon
    label: string
    onClick: () => void
  }>
}

const ContextMenu = ({ open, title, onClose, items } : ContextMenuProps) => {

  const handleClose = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Portal
        as='div'
        className='fixed inset-0 z-20 overflow-y-auto'
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-75' onClick={handleClose}/>
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 transform translate-y-full'
            enterTo='opacity-100 transform translate-y-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 transform translate-y-0'
            leaveTo='opacity-0 transform translate-y-full'
          >
            <div className={`inline-block p-2 mb-2 overflow-hidden 
                text-left align-middle transition-all transform bg-white 
                shadow-xl dark:bg-zinc-900 rounded-2xl fixed inset-x-2 bottom-0`
                }>
              {title ? (
                <Dialog.Title
                  as='h3'
                  className='px-2 mt-1 text-sm font-medium leading-6 text-gray-500'
                  >
                  {title}
                </Dialog.Title>
              ) : null}
              <div className="flex justify-center">
                <div className="w-10 h-1 rounded-full bg-gray-500/50"></div>
              </div>
              <ul className="text-sm">
                {items.map((item, index) => (
                  <li key={index}>
                    <button 
                      className="flex items-center w-full p-2"
                      onClick={item.onClick}
                    >
                      {React.createElement(item.icon, {className: "h-6 w-6 mr-4",})}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Transition.Child>
        </div>
      </Portal>
    </Transition>
  )
}

export default ContextMenu