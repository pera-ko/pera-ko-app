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
        ${error ? 'border-error' : 'focus-within:border-indigo-300'}
        px-3 font-medium flex items-center bg-indigo-100 rounded-md 
        border-2 border-transparent `}
      >
        {contentLabel &&
          (contentLabel.type === 'text' ? (
            <span className='mr-3 text-gray-600'>{contentLabel.content}</span>
          ) : null)}
        <input
          ref={ref}
          className={`font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent w-full ${inputClassName}`}
          {...rest}
        />
      </div>
      {error && <span className='text-xs text-red-700'>{error?.message}</span>}
    </label>
  );
}

export default React.forwardRef(InputGroup);
