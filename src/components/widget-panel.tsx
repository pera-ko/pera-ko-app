import { PropsWithChildren, ReactNode} from "react";

interface WidgetPanelProps extends PropsWithChildren {
  title: string;
  hideTitle?: boolean;
  topRightElement?: ReactNode;
  sticky?: boolean
}

function WidgetPanel({
  title,
  hideTitle,
  topRightElement,
  children,
  sticky
}: WidgetPanelProps) {
  return (
    <>
      {!hideTitle ? (
        <div className={`flex justify-between px-4 pt-2 pb-1 text-xs font-medium text-gray-500 uppercase ${sticky ? 'sticky top-16 app-bg' : ''}`}>
          <span>{title}</span>
          {topRightElement ? topRightElement : null}
        </div>
      ) : null}
      <div className="">{children}</div>
    </>
  );
}

export default WidgetPanel;
