const NotAvailable = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
      <div className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative">
        This feature is not available yet.
        <div
          className="absolute right-5 top-3 bg-gray-500 hover:bg-gray-600 flex items-center justify-center text-xs text-white rounded-xl p-2 w-6 h-6 cursor-pointer"
          onClick={() => handleOpen()}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;
