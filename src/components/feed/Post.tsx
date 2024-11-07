import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Comments from "../feed/Comments";

const Post = async () => {
  // Get current user
  const { userId }: { userId: string | null } = await auth();

  if (!userId) return null;

  // Fetch user's posts
  const userPosts = await prisma.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (userPosts.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-gray-400">No posts found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      {userPosts.map((post) => (
        <div key={post.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={"/noAvatar.png"}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">Indra</span>
            </div>
            <Image src="/more.png" alt="" width={16} height={16} />
          </div>
          {/* Description */}
          <div className="flex flex-col gap-4">
            <div className="w-full min-h-96 mt-2 relative">
              {post?.image && (
                <Image
                  src={post?.image}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              )}
            </div>
            <p>{post?.description}</p>
          </div>
          {/* Interaction */}
          <div className="flex items-center justify-between text-sm my-4">
            <div className="flex gap-8">
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image
                  src="/like.png"
                  alt=""
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">
                  123 <span className="hidden md:inline"> Likes</span>
                </span>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image
                  src="/comment.png"
                  alt=""
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">
                  123 <span className="hidden md:inline"> Comments</span>
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                <Image
                  src="/share.png"
                  alt=""
                  width={16}
                  height={16}
                  className="cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">
                  123 <span className="hidden md:inline"> Shares</span>
                </span>
              </div>
            </div>
          </div>
          <Comments />
        </div>
      ))}
    </div>
  );
};

export default Post;
