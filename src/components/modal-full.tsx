import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';

interface Props {
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
            <div className='fixed inset-0 overflow-hidden transition-all transform bg-white overflow-y-auto'>
              <div className='sticky top-0 bg-white flex items-center font-medium bg-current'>
                <button
                  className='p-5 outline-none focus:outline-none'
                  onClick={onClose}
                >
                  <ArrowLeftIcon className='h-6 w-6' />
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
