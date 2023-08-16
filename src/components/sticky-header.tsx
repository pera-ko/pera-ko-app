import { PropsWithChildren } from "react";

const StickyHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='sticky flex justify-between px-5 py-2 text-sm font-medium bg-gray-200 dark:bg-zinc-900 top-16'>
      {children}
    </div>
  );
};

export default StickyHeader;
