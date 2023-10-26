"use client";
import useComment from "@/hooks/useComment";
import { CommentType } from "@/typings/mongoTypes";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
function UpdateCommentForm({
  setModal,
  comment,
  updateModal,
}: {
  comment: CommentType;
  setModal: Dispatch<SetStateAction<boolean>>;
  updateModal: boolean;
}) {
  const { updateCommentHandler, updatedComment, setUpdatedComment, loading } =
    useComment(comment.text);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (updateModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [updateModal]);
  return (
    <form
      onSubmit={async (e) => {
        await updateCommentHandler(e, comment._id);
        setModal(false);
      }}
      className="update__comment"
    >
      <input
        ref={inputRef}
        value={updatedComment}
        onChange={(e) => setUpdatedComment(e.target.value)}
        type="text"
        className="comment__input"
        defaultValue={comment.text}
      />
      <div>
        <button className="update__btn btn" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          className="cancel__btn btn"
          type="button"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateCommentForm;
