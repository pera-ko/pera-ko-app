import { IBudget, IGoal } from '../app/@types';

interface Props {
  budget: IBudget | IGoal;
}
export default function BudgetIcon({ budget }: Props) {
  return (
    <div
      className='px-1.5 py-1.5 text-2xl mx-3 my-2 rounded-2xl'
      style={{ backgroundColor: budget?.color }}
    >
      {budget?.icon}
    </div>
  );
}
