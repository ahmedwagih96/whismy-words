import { UserType } from "@/typings/mongoTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { EditUser } from "..";
async function UserInfo({ user }: { user: UserType }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="user__header">
         {session?.user ? <EditUser user={user} /> : null}
      <div className="user__image-wrapper">
        <img
          src={user?.profilePhoto.url}
          alt=""
          className="user__image"
        />
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
