import { Comment, LikeButton } from "@/components";
import { PostType } from "@/typings/mongoTypes";
function Comments({ post }: { post: PostType }) {
  return (
    <div className="comments">
      <div className="comments__count">
        <h4>
          {post.comments?.length} Comment{post.comments?.length > 1 ? "s" : ""}
        </h4>
        <LikeButton post={post} />
      </div>
      {post.comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
