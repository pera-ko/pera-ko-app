const StickyHeader: React.FC<{ className?: string }> = ({
  children,
  className
}) => {
  return (
    <div
      className={`bg-gray-200 px-5 py-2 text-sm sticky top-16 font-medium flex justify-between ${className}`}
    >
      {children}
    </div>
  );
};

export default StickyHeader;
