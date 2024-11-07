"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "./client";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("You must be logged in!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followedUserId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("You must be logged in!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (senderUserId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("You must be logged in!");
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Find existing follow request
      const existingFollowRequest = await prisma.followRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId: senderUserId,
            receiverId: currentUserId,
          },
        },
      });

      if (!existingFollowRequest) {
        throw new Error("Follow request not found");
      }

      // Create follower relationship
      await prisma.follower.create({
        data: {
          follower: { connect: { id: senderUserId } },
          followedUser: { connect: { id: currentUserId } },
        },
      });

      // Delete follow request
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id },
      });

      return { success: true };
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to accept follow request");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("You must be logged in!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  // get current logged in user
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    return { success: false, error: true };
  }

  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    description: z.string().max(255).optional(),
    city: z.string().optional(),
    school: z.string().optional(),
    work: z.string().optional(),
    website: z.string().optional(),
  });

  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
