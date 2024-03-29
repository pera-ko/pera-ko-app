import React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  error?: FieldError;
  contentLabel?: {
    type: 'text';
    content: string;
  };
  inputClassName?: string;
  readOnly?: boolean
} & InputHTMLAttributes<HTMLInputElement>

function InputGroupInner(
  { label, error, className, contentLabel, inputClassName, readOnly, ...rest }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <label className={`block mb-2 ${className}`}>
      <div className='my-1 text-sm font-medium text-gray-500'>{label}</div>
      <div
        className={twMerge('border px-3 font-medium flex items-center bg-gray-500/10 rounded-md',
          error
            ? 'border-error'
            : 'focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-opacity-50 focus-within:border-slate-500 border-transparent',
          readOnly
            ? 'bg-transparent focus-within:ring-0 focus-within:border-transparent'
            : ''
          )}
      >
        {contentLabel &&
          (contentLabel.type === 'text' ? (
            <span className='mr-3 text-gray-600'>{contentLabel.content}</span>
          ) : null)}
        <input
          ref={ref}
          autoComplete='off'
          className={`font-medium flex-1 outline-none focus:outline-none py-2 bg-transparent w-full ${inputClassName}`}
          readOnly={readOnly}
          {...rest}
        />
      </div>
      {error && <span className='text-xs text-red-700'>{error?.message}</span>}
    </label>
  );
}
const InputGroup = React.forwardRef(InputGroupInner);
export default InputGroup;
