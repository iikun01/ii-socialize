import Image from "next/image";

const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-scroll text-xs scroll-smooth scrollbar-hide">
      <div className="flex gap-9 w-max">
        {/* Story */}
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/5332796/pexels-photo-5332796.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
      </div>
    </div>
  );
};

export default Stories;
