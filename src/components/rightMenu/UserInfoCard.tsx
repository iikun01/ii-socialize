import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UpdateUser from "./UpdateUser";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId }: { userId: string | null } = await auth();

  if (currentUserId) {
    const blockResponse = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    blockResponse ? (isUserBlocked = true) : (isUserBlocked = false);

    const followReqResponse = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followReqResponse ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {`${user?.firstName} ${user?.lastName || ""}`}
          </span>
          <span className="text-sm">@{user?.username}</span>
        </div>
        <p>{user?.description}</p>
        {user?.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span>
              Living in <b>{user?.city || ""}</b>
            </span>
          </div>
        )}
        {user?.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Went to <b>{user?.school || ""}</b>
            </span>
          </div>
        )}
        {user?.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works as <b>{user?.work || ""}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            {user?.website && (
              <>
                <Image src="/link.png" alt="" width={16} height={16} />
                <Link href="/" className="text-blue-500 text-xs">
                  {user?.website}
                </Link>
              </>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>Joined {createdAtDate}</span>
          </div>
        </div>
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
