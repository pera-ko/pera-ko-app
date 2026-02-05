import { hexToRGB } from '../../../shared/utils';

type Props = {
  color: string
  icon: string
  size?: 'normal' | 'large';
  className?: string;
}
export default function BudgetIcon({
  icon, color,
  className,
  size = 'normal'
}: Props) {
  let iconSize = size === 'normal' ? '2.5rem' : '3rem';
  let fontSize = size === 'normal' ? 'text-2xl' : 'text-3xl';
  return (
    <div
      className={`${fontSize} my-2 rounded-2xl text-center inline-block ${className}`}
      style={{
        backgroundColor: color,
        lineHeight: iconSize,
        width: iconSize,
        height: iconSize,
        boxShadow: `0px 1px 2px ${hexToRGB(color, 0.5)}`
      }}
    >
      {icon}
    </div>
  );
}
