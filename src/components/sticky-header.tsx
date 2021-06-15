const StickyHeader: React.FC = ({ children }) => {
  return (
    <div className='bg-gray-200 px-5 py-2 text-sm sticky top-16 font-medium flex justify-between'>
      {children}
    </div>
  );
};

export default StickyHeader;
