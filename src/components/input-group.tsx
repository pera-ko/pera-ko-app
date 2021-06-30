import React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  contentLabel?: {
    type: 'text';
    content: string;
  };
  inputClassName?: string;
}

function InputGroup(
  { label, error, className, contentLabel, inputClassName, ...rest }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <label className={`block mb-2 ${className}`}>
      <div className='font-medium text-sm my-1 text-gray-600'>{label}</div>
      <div
        className={`
        ${
          error
            ? 'border-error border-transparent'
            : 'focus-within:outline-none focus-within:ring-4 focus-within:ring-indigo-300 focus-within:ring-opacity-50 focus-within:border-indigo-900'
        }
        px-3 font-medium flex items-center bg-indigo-50 rounded-md 
        border  `}
      >
        {contentLabel &&
          (contentLabel.type === 'text' ? (
            <span className='mr-3 text-gray-600'>{contentLabel.content}</span>
          ) : null)}
        <input
          ref={ref}
          autoComplete='off'
          className={`font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent w-full ${inputClassName}`}
          {...rest}
        />
      </div>
      {error && <span className='text-xs text-red-700'>{error?.message}</span>}
    </label>
  );
}

export default React.forwardRef(InputGroup);
