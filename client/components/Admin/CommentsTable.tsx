"use client";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useFetchAllCommentsQuery } from "@/redux/services/adminApi";
import { LoadingSpinner } from "@/components";
const CommentsTable = () => {
  const { deleteCommentHandler } = useAdminDashboard();
  const {
    data: allComments,
    error,
    isLoading,
  } = useFetchAllCommentsQuery(null);
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
      <div className="table__wrapper">
        <h1 className="table__title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="table__hidden">Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allComments?.map((comment, index) => (
              <tr key={comment._id}>
                <td className="table__hidden">{index + 1}</td>
                <td>
                  <div className="table__image">
                    <img
                      src={comment.user.profilePhoto.url}
                      alt="user image"
                      className="table__user-image"
                    />
                    <span className="table__username">{comment.username}</span>
                  </div>
                </td>
                <td>
                  <b className="text-ellipses">{comment.text}</b>
                </td>
                <td>
                  <div className="actions">
                    <TrashIcon
                      className="deleteIcon"
                      onClick={() => deleteCommentHandler(comment._id)}
                    />
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

export default CommentsTable;
