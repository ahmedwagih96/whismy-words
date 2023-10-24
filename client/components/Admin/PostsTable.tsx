"use client";
import Link from "next/link";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { PostType } from "@/typings/mongoTypes";
const PostsTable = ({ allPosts }: { allPosts: PostType[] }) => {
  const { deletePostHandler, loading } = useAdminDashboard();
  return (
    <main className="table__container">
      <div className="table__wrapper">
        <h1 className="table__title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPosts?.map((post, index) => (
              <tr key={post?._id}>
                <td>{index + 1}</td>
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
                  <b>{post?.title}</b>
                </td>
                <td>
                  <div className="table__button-group">
                    <button>
                      <Link href={`/posts/details/${post?._id}`}>
                        View Post
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="table__button-group"
                      onClick={() => deletePostHandler(post?._id)}
                      disabled={loading.status}
                    >
                      {loading.status && loading.id === post?._id
                        ? "Deleting..."
                        : "Delete Post"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PostsTable;
