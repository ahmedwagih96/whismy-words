"use client";
import "./user.css";
import { useGetUserByIdQuery } from "@/redux/services/userApi";
import { LoadingSpinner, Posts, UserInfo } from "@/components";
import { useParams } from "next/navigation";
function page() {
  const params = useParams();
  const {
    isLoading,
    isSuccess,
    data: user,
    error,
  } = useGetUserByIdQuery({ id: params.userId as string });

  if (error) {
    const typedError = error as { status: number; data: { message: string } };
    const message =
      `${typedError.status} - ${typedError.data.message}` ||
      "An error occurred.";
    throw new Error(message);
  }
  return (
    <main className="user">
      {isLoading ? <LoadingSpinner /> : null}
      {isSuccess && !isLoading && user ? (
        <>
          <UserInfo user={user} />
          <div className="user__postsList">
            <h2 className="user__postsList__title">{user?.username}'s Posts</h2>
            {user?.posts.length > 0 ? (
              <Posts posts={user?.posts} />
            ) : (
              <div className="no__posts">
                No <span>Posts</span> By ahmed {user?.username}
              </div>
            )}
          </div>
        </>
      ) : null}
    </main>
  );
}

export default page;
