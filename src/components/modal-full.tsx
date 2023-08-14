import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Fragment, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isOpen?: boolean;
  title: string;
  onClose(): void;
}

const ModalFull: React.FC<Props> = ({ isOpen, children, title, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as={Fragment} onClose={onClose}>
        <div className='fixed inset-0 overflow-y-auto'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 transform translate-x-full'
            enterTo='opacity-100 transform translate-x-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 transform translate-x-0'
            leaveTo='opacity-0 transform translate-x-full'
          >
            <div className='fixed inset-0 overflow-hidden overflow-y-auto transition-all transform bg-white'>
              <div className='sticky top-0 flex items-center font-medium bg-current bg-white'>
                <button
                  className='p-5 outline-none focus:outline-none'
                  onClick={onClose}
                >
                  <ArrowLeftIcon className='w-6 h-6' />
                </button>
                <Dialog.Title>{title}</Dialog.Title>
              </div>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalFull;
