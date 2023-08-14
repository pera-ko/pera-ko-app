import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { money } from "../app/utils";

const MoneyHeader = ({ value, onMask, maskValue }: { value: number, maskValue: boolean, onMask: (val: boolean) => void }) => {
  return (
    <div className="flex items-center px-2">
      <div className="flex-1 text-4xl font-money">
        {maskValue ? <span>PHP •••••••</span> : <span>{money(value)}</span>}
      </div>
      <div>
        <button className="p-1" onClick={() => onMask(!maskValue)}>
          {maskValue ? (
            <EyeSlashIcon className="w-6 h-6 text-gray-500" />
          ) : (
            <EyeIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MoneyHeader;
