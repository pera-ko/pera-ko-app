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
    <div className="p-3">
      {!hideTitle ? (
        <div className="flex justify-between px-2 py-2 text-xs font-medium text-gray-500 uppercase">
          <span>{title}</span>
          {topRightElement ? topRightElement : null}
        </div>
      ) : null}
      <div className="">{children}</div>
    </div>
  );
}

export default WidgetPanel;
