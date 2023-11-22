import { UserType } from "@/typings/mongoTypes";
import { EditUser } from "..";
import { useSession } from "next-auth/react";
function UserInfo({ user }: { user: UserType }) {
  const { data: session } = useSession();
  return (
    <div className="user__header">
      {session?.user?.id === user._id ? <EditUser user={user} /> : null}
      <div className="user__image-wrapper">
        <img src={user?.profilePhoto.url} alt="" className="user__image" />
      </div>
      <h1 className="user__username">{user?.username}</h1>
      <p className="user__bio">{user?.bio}</p>
      <div className="user__user-date">
        <strong>Date Joined: </strong>
        <span>{new Date(user?.createdAt!).toDateString()}</span>
      </div>
    </div>
  );
}

export default UserInfo;
