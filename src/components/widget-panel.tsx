import { PropsWithChildren, ReactNode} from "react";

interface WidgetPanelProps extends PropsWithChildren {
  title: string;
  hideTitle?: boolean;
  topRightElement?: ReactNode;
}

function WidgetPanel({
  title,
  hideTitle,
  topRightElement,
  children,
}: WidgetPanelProps) {
  return (
    <div className="my-2">
      {!hideTitle ? (
        <div className="flex justify-between px-4 pt-2 pb-1 text-xs font-medium text-gray-500 uppercase">
          <span>{title}</span>
          {topRightElement ? topRightElement : null}
        </div>
      ) : null}
      <div className="">{children}</div>
    </div>
  );
}

export default WidgetPanel;
