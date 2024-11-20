import { Post as AllPosts, User } from "@prisma/client";
import Image from "next/image";
import Comments from "../feed/Comments";
import PostInteraction from "./PostInteraction";

type PostType = AllPosts & { user: User } & { likes: { userId: string }[] } & {
  _count: { comments: number };
};

const Post = async ({ post }: { post: PostType }) => {
  console.log("Post ", post);
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div key={post.id}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={post.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{`${post.user.firstName} ${post.user.lastName}`}</span>
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
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
        <Comments />
      </div>
    </div>
  );
};

export default Post;
