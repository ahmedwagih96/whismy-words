"use client";
import useAdminDashboard from "@/hooks/useAdminDashboard";
import { CommentType } from "@/typings/mongoTypes";
import { LoadingIcon } from "..";

const CommentsTable = ({ allComments }: { allComments: CommentType[] }) => {
  const { deleteCommentHandler, loading } = useAdminDashboard();
  return (
    <main className="table__container">
      <div className="table__wrapper">
        <h1 className="table__title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allComments?.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
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
                  <b>{comment.text}</b>
                </td>
                <td>
                  <div className="table__button-group">
                    <button
                      type="button"
                      className="table__button-group"
                      onClick={() => deleteCommentHandler(comment._id)}
                      disabled={loading.status}
                    >
                      {loading.status && loading.id === comment._id ? (
                        <LoadingIcon />
                      ) : (
                        "Delete Comment"
                      )}
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

export default CommentsTable;
