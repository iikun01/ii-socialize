import { User } from "@prisma/client";
import { Suspense } from "react";
import Ad from "../Ad";
import Skeleton from "../Skeleton";
import Birthdays from "./Birthdays";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback={<Skeleton />}>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
