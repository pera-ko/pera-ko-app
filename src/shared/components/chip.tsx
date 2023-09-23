import { twMerge } from "tailwind-merge"

type ChipProps = {
  onClick?: () => void
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
  className?: string
  children: string
  active?: boolean
}

const Chip = ({ leftElement, rightElement, className, children, onClick, active } : ChipProps) => {
  
  return (
    <button 
      type='button'
      className={twMerge(`flex items-center px-2 py-1 text-sm rounded-full border 
      bg-gray-500/10 border-gray-500/30 space-x-1`, 
        active ? 'border-transparent bg-indigo-500/25' : '',
        className
        )}
      onClick={onClick}
      >
      {leftElement}
      <span>{children}</span>
      {rightElement}
    </button>
  )
}

export default Chip