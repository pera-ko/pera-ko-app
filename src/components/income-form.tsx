import { SubmitHandler, useForm } from 'react-hook-form';
import InputGroup from './input-group';

type Inputs = {
  amount: number;
  remarks?: string;
}

type Props = {
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
      {/* <div className='my-4 text-right'>
        <button
          type='button'
          className='px-2 py-1 mr-2 text-sm font-medium border border-indigo-500 rounded-full'
        >
          PHP 50,000.00
        </button>
        <button
          type='button'
          className='px-2 py-1 text-sm font-medium border border-indigo-500 rounded-full'
        >
          PHP 1,250.00
        </button>
      </div> */}
      <div className='h-8'></div>
      <button
        type='submit'
        className='w-full py-3 text-sm font-medium text-white bg-indigo-500 rounded-lg'
      >
        Add Income
      </button>
    </form>
  );
}
