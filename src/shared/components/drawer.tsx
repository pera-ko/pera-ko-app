import { Dialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

type DrawerProps = {
  open?: boolean
  onClose: () => void
} & PropsWithChildren
const Drawer = ({ open, onClose, children } : DrawerProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as={Fragment} onClose={onClose}>
        <div className='fixed inset-0 overflow-y-auto'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
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
            <div className='fixed inset-x-0 bottom-0 overflow-hidden transition-all transform shadow-xl bg-slate-100 dark:bg-dark rounded-t-2xl'>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Drawer