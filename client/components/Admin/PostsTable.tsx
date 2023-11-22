"use client";
import Link from "next/link";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useFetchAllPostsQuery } from "@/redux/services/adminApi";
import { LoadingSpinner } from "@/components";
const PostsTable = () => {
  const { deletePostHandler } = useAdminDashboard();
  const {
    data: allPosts,
    error,
    isLoading,
    isSuccess,
  } = useFetchAllPostsQuery(null);
  if (error) {
    const typedError = error as { status: number; data: { message: string } };
    const message =
      `${typedError.status} - ${typedError.data.message}` ||
      "An error occurred.";
    throw new Error(message);
  }
  return (
    <main className="table__container">
      {isLoading ? <LoadingSpinner /> : null}
      {allPosts && !isLoading && isSuccess ? (
        <div className="table__wrapper">
          <h1 className="table__title">Posts</h1>
          <table className="table">
            <thead>
              <tr>
                <th className="table__hidden">Count</th>
                <th>User</th>
                <th>Post Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPosts?.map((post, index) => (
                <tr key={post?._id}>
                  <td className="table__hidden">{index + 1}</td>
                  <td>
                    <div className="table__image">
                      <img
                        src={post?.user?.profilePhoto?.url}
                        alt=""
                        className="table__user-image"
                      />
                      <span className="table__username">
                        {post?.user?.username}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Link href={`/posts/details/${post?._id}`}>
                      <b>{post?.title}</b>
                    </Link>
                  </td>
                  <td>
                    <div className="actions">
                      <TrashIcon
                        className="deleteIcon"
                        onClick={() => deletePostHandler(post?._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
};

export default PostsTable;
