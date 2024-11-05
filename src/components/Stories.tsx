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
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/5468406/pexels-photo-5468406.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/5468460/pexels-photo-5468460.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/5468456/pexels-photo-5468456.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/2064780/pexels-photo-2064780.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/5468425/pexels-photo-5468425.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/5468403/pexels-photo-5468403.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/17589270/pexels-photo-17589270/free-photo-of-cat-holds-hand-of-woman.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Photo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Indra</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/11725760/pexels-photo-11725760.jpeg?auto=compress&cs=tinysrgb&w=600"
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
