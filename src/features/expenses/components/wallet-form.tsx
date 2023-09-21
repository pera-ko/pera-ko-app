import { Fragment, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from '../../../shared/components/input-group';
import { RadioGroup } from '@headlessui/react';

type Inputs = {
  type: "credit-card" | "e-wallet" | "cash";
  walletName: string;
}

type Props = {
  id?: string;
  defaultValue?: Inputs;
  onSubmit?(value: { walletName: string }): void;
  isDefault: boolean
}

const WalletForm = ({ id, defaultValue, onSubmit, isDefault }: Props) => {
  const walletNameInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();
 
  useEffect(() => {
    register('walletName', {
      required: 'Name is required.',
      value: defaultValue?.walletName
    });
    if (!isDefault) { 
      register('type', {
        required: 'Type is required.',
        value: defaultValue?.type
      });
    }
    
    if (walletNameInputRef.current) {
      walletNameInputRef.current.focus();
    }

  }, [register, defaultValue, isDefault]);

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form id={id} onSubmit={handleSubmit(handleFormSubmit)}>
      {!isDefault ? (
        <div className='py-3'>
          <RadioGroup
            defaultValue={defaultValue?.type}
            onChange={(v: "credit-card" | "e-wallet") => setValue('type', v)}
            className='grid grid-cols-2 text-sm font-medium text-center'
          >
            <RadioGroup.Option value='credit-card' as={Fragment}>
              {({ checked }) => (
                <span
                  className={`px-2 py-1 border rounded-l outline-none focus:outline-none border-indigo-600 ${
                    !checked ? ' ' : 'bg-indigo-600 text-white'
                  }`}
                >
                  Credit Card
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value='e-wallet' as={Fragment}>
              {({ checked }) => (
                <span
                  className={`px-2 py-1 border rounded-r outline-none focus:outline-none border-indigo-600 ${
                    !checked ? '' : 'bg-indigo-600 text-white'
                  }`}
                >
                  E-wallet
                </span>
              )}
            </RadioGroup.Option>
          </RadioGroup>
          {errors && errors.type && <span className='text-xs text-red-700'>{errors?.type.message}</span>}
        </div>
        
      ) : null}
      <InputGroup
        autoComplete='nope'
        label='Name'
        defaultValue={defaultValue?.walletName}
        error={errors.walletName}
        ref={walletNameInputRef}
        onChange={(e) => setValue('walletName', e.target.value)}
      />
    </form>
  );
};

export default WalletForm;
