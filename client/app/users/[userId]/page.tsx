import { fetchUser } from "@/utils/user";
import "./user.css";
import { Posts, UserInfo } from "@/components";
async function page({ params }: { params: { userId: string } }) {
  const user = await fetchUser(params.userId);
  return (
    <main className="user">
      <UserInfo user={user} />
      <div className="user__postsList">
        <h2 className="user__postsList__title">{user?.username}'s Posts</h2>
        {user?.posts.length > 0 ? (
          <Posts posts={user?.posts} />
        ) : (
          <div className="no__posts">
            No <span>Posts</span> {" "}By ahmed {user?.username}
          </div>
        )}
      </div>
    </main>
  );
}

export default page;
