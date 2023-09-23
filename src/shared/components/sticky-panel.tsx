import { PropsWithChildren } from "react";

type Props = (Toggle | NotToggle) & PropsWithChildren & PanelProps

type PanelProps = {
  title: string
}

type NotToggle = {
  isToggle: false
}

type Toggle = {
  isToggle: true
  toggleValue: boolean
  onToggle(val: boolean): void
}

const StickyPanel: React.FC<Props> = (props) => {
  return (
    <>
      <div className='sticky flex items-center justify-between px-5 py-2 text-sm font-medium shadow top-16'>
        <span>{props.title}</span>
        {props.isToggle ? (
          <button
            onClick={() => props.onToggle(!props.toggleValue)}
            className={`
            ${props.toggleValue ? 'pl-9 bg-indigo-600' : 'bg-indigo-100 dark:bg-gray-800'}
            w-16 h-8 rounded-full flex items-center px-1 transition-all ease-in-out duration-150`}
          >
            <div className='w-6 h-6 bg-white rounded-full shadow-md'></div>
          </button>
        ) : null}
      </div>
      {(!props.isToggle || (props.isToggle && props.toggleValue)) ? props.children : null}
    </>
  );
};

export default StickyPanel;
