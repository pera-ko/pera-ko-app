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
      className='flex px-5 mb-4 text-left outline-none focus:outline-none'
      onClick={() => onChange(!checked)}
    >
      <div className='flex-1 mr-4'>
        <div className='font-medium text-sm'>{title}</div>
        <div className='text-gray-500 text-sm'>{description}</div>
      </div>
      <div
        className={`
        ${checked ? 'pl-9 bg-indigo-400' : 'bg-indigo-100'}
        w-16 h-8 rounded-full flex items-center px-1 transition-all ease-in-out duration-150`}
      >
        <div className='bg-white w-6 h-6 rounded-full shadow-md'></div>
      </div>
    </button>
  );
}
