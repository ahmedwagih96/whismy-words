"use client";
import useComment from "@/hooks/useComment";
import { LoadingIcon } from "..";
const AddComment = ({ postId }: { postId: string }) => {
  const { loading, addCommentHandler, updatedComment, setUpdatedComment } =
    useComment();

  return (
    <form onSubmit={(e) => addCommentHandler(e, postId)} className="addComment">
      <input
        type="text"
        placeholder="Add a comment"
        className="addComment__input"
        value={updatedComment}
        onChange={(e) => setUpdatedComment(e.target.value)}
      />
      <button disabled={loading} type="submit" className="addComment__btn">
        {loading ? <LoadingIcon /> : "Submit"}
      </button>
    </form>
  );
};

export default AddComment;
