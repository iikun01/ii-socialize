import Image from "next/image";
import Link from "next/link";

const UserMediaCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* Bottom */}
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/6456287/pexels-photo-6456287.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/8736766/pexels-photo-8736766.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/5332795/pexels-photo-5332795.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/13535555/pexels-photo-13535555.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/4790622/pexels-photo-4790622.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/3389528/pexels-photo-3389528.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/28038634/pexels-photo-28038634/free-photo-of-scottish-fold.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            className="object-cover rounded-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
