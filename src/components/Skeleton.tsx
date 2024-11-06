const Skeleton = () => {
  return (
    <div className="animate-pulse p-4 bg-white rounded-lg shadow-md">
      <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-4/6 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-4/6 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-3/6 mb-2"></div>
    </div>
  );
};

export default Skeleton;
