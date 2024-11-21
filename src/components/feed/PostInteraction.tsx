"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/clerk-react";
import Image from "next/image";
import { useEffect, useOptimistic, useState } from "react";
import PostInteractionSkeleton from "./PostInteractionSkeleton";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    if (isLoaded && userId) {
      setLikeState({
        likeCount: likes.length,
        isLiked: likes.includes(userId),
      });
    }
  }, [isLoaded, userId, likes]);

  if (!isLoaded) {
    return <PostInteractionSkeleton />;
  }

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-300">
            {optimisticLike.likeCount}{" "}
            <span className="hidden md:inline">
              {optimisticLike.likeCount === 0 || optimisticLike.likeCount === 1
                ? "Like"
                : "Likes"}
            </span>
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
            {commentNumber}{" "}
            <span className="hidden md:inline">
              {commentNumber > 1 && commentNumber !== 0
                ? `Comments`
                : `Comment`}
            </span>
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
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
