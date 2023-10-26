"use client";
import useComment from "@/hooks/useComment";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { UpdateCommentForm } from "@/components";
import { CommentType } from "@/typings/mongoTypes";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
function Comment({ comment }: { comment: CommentType }) {
  const { deleteCommentHandler, updateModal, setUpdateModal } = useComment();
  const { data: session } = useSession();

  return (
    <div className="comment">
      <div className="comment__info">
        <div className="comment__user-info">
          <img
            src={comment?.user.profilePhoto.url}
            alt="user image"
            className="comment__user-photo"
          />
          <span className="comment__username">{comment?.username}</span>
        </div>
        <div className="comment__time">
          <Moment fromNow ago>
            {comment.createdAt}
          </Moment>{" "}
          ago
        </div>
      </div>
      {!updateModal ? <p className="comment__text">{comment?.text}</p> : null}
      {session?.user?.id === comment.user._id ? (
        <div className="comment__icon-wrapper">
          {!updateModal ? (
            <>
              <PencilSquareIcon
                className="editIcon"
                onClick={() => setUpdateModal(true)}
              />
              <TrashIcon
                className="deleteIcon"
                onClick={() => deleteCommentHandler(comment._id)}
              />
            </>
          ) : null}
        </div>
      ) : null}
      {updateModal ? (
        <UpdateCommentForm
          setModal={setUpdateModal}
          comment={comment}
          updateModal={updateModal}
        />
      ) : null}
    </div>
  );
}

export default Comment;
