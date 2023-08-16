interface Props {
  title: string;
  description: string;
  checked?: boolean;
  onChange(value: boolean): void;
}
export default function OptionSwitch({
  title,
  description,
  checked,
  onChange
}: Props) {
  return (
    <button
      type='button'
      className='flex items-center px-5 mb-4 text-left outline-none focus:outline-none'
      onClick={() => onChange(!checked)}
    >
      <div className='flex-1 mr-4'>
        <div className='text-sm font-medium'>{title}</div>
        {
          description &&
          <div className='text-sm text-gray-500'>{description}</div>
        }
      </div>
      <div
        className={`
        ${checked ? 'pl-9 bg-indigo-600' : 'bg-indigo-100 dark:bg-gray-800'}
        w-16 h-8 rounded-full flex items-center px-1 transition-all ease-in-out duration-150`}
      >
        <div className='w-6 h-6 bg-white rounded-full shadow-md'></div>
      </div>
    </button>
  );
}
