import { Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

type Props = {
  isOpen?: boolean
} & PropsWithChildren

const Page = ({ isOpen, children } : Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className='fixed inset-0 overflow-y-auto bg-white dark:bg-dark'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 transform translate-y-full'
          enterTo='opacity-100 transform translate-y-0'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 transform translate-x-0'
          leaveTo='opacity-0 transform translate-x-full'
        >
          <div className='top-0'>
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}

export default Page