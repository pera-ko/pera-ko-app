import { IBudget, IGoal } from '../app/@types';
import { hexToRGB } from '../app/utils';

interface Props {
  budget: IBudget | IGoal;
  size?: 'normal' | 'large';
  className?: string;
}
export default function BudgetIcon({
  budget,
  className,
  size = 'normal'
}: Props) {
  let iconSize = size === 'normal' ? '2.5rem' : '3rem';
  let fontSize = size === 'normal' ? 'text-2xl' : 'text-3xl';
  return (
    <div
      className={`${fontSize} mx-3 my-2 rounded-2xl text-center inline-block ${className}`}
      style={{
        backgroundColor: budget?.color,
        lineHeight: iconSize,
        width: iconSize,
        height: iconSize,
        boxShadow: `0px 1px 2px ${hexToRGB(budget.color, 0.5)}`
      }}
    >
      {budget?.icon}
    </div>
  );
}
