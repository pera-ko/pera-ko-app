import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from './input-group';

interface Inputs {
  amount: number;
  remarks?: string;
}

interface Props {
  onSubmit?(value: Inputs): void;
}

export default function IncomeForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const handleFormSubmit: SubmitHandler<Inputs> = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form
      className='px-5 mb-5 text-gray-800'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <InputGroup
        inputClassName='text-right'
        label='Amount'
        error={errors.amount}
        type='number'
        step='.01'
        contentLabel={{ type: 'text', content: 'PHP' }}
        {...register('amount', {
          required: 'Amount is required.'
        })}
      />
      <InputGroup label='Remarks' {...register('remarks')} />
      <div className='text-right my-4'>
        <button
          type='button'
          className='border border-indigo-500 py-1 px-2 rounded-full text-sm font-medium mr-2'
        >
          PHP 50,000.00
        </button>
        <button
          type='button'
          className='border border-indigo-500 py-1 px-2 rounded-full text-sm font-medium'
        >
          PHP 1,250.00
        </button>
      </div>
      <button
        type='submit'
        className='bg-indigo-500 rounded-lg py-3 w-full text-sm font-medium text-white'
      >
        Add Income
      </button>
    </form>
  );
}
