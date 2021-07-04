import { Dialog as HUIDialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export interface IDialogButton extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  type: 'submit' | 'button' | undefined;
}

interface Props {
  title: string;
  onClose(): void;
  buttons?: IDialogButton[];
  isOpen?: boolean;
  showClose?: boolean;
}

const Dialog: React.FC<Props> = ({
  children,
  title,
  onClose,
  buttons,
  isOpen,
  showClose = true
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HUIDialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={onClose}
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
            <HUIDialog.Overlay className='bg-black bg-opacity-75 fixed inset-0' />
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
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <HUIDialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                {title}
              </HUIDialog.Title>
              <div className='mt-2'>{children}</div>

              <div className='mt-4 space-x-2 text-right'>
                {buttons?.map((b, index) => (
                  <button
                    key={index}
                    type={b.type}
                    form={b.form}
                    className={b.className}
                    onClick={b.onClick}
                  >
                    {b.text}
                  </button>
                ))}
                {showClose && (
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={onClose}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </HUIDialog>
    </Transition>
  );
};

export default Dialog;
