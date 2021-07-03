import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from './input-group';

interface Inputs {
  walletName: string;
}

interface Props {
  id?: string;
  defaultValue?: Inputs;
  onSubmit?(value: { walletName: string }): void;
}

const WalletForm = ({ id, defaultValue, onSubmit }: Props) => {
  const walletNameInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>();

  useEffect(() => {
    register('walletName', {
      required: 'Name is required.'
    });
    if (walletNameInputRef.current) {
      walletNameInputRef.current.focus();
    }
  }, [register]);

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form id={id} onSubmit={handleSubmit(handleFormSubmit)}>
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
