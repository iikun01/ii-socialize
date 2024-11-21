"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentsWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentsWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [description, setDescription] = useState("");

  const addCom = async () => {
    if (!user || !description) return;

    addOptimisticComment({
      id: Math.random(),
      description,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId,
      user: {
        id: user.id,
        avatar: user.imageUrl || "/noAvatar.png",
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username || "",
        email: "",
        cover: "",
        description: "",
        city: null,
        school: null,
        work: null,
        website: null,
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, description);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {}
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentsWithUser) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <form
            action={addCom}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </form>
        </div>
      )}

      <div className="">
        {/* Comments */}
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            {/* Avatar */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            {/* Description */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.firstName && comment.user.lastName
                  ? `${comment.user.firstName} ${comment.user.lastName}`
                  : comment.user.username}
              </span>
              <p>{comment.description}</p>
              {/* <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    width={12}
                    height={12}
                    className="cursor-pointer"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-300">
                    123 <span className="hidden md:inline"> Likes</span>
                  </span>
                </div>
                <div className="cursor-pointer">Reply</div>
              </div> */}
            </div>
            {/* Icon */}
            {/* <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            /> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
