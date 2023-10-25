import { PostType } from "@/typings/mongoTypes";
import Link from "next/link";
function PostItem({ post }: { post: PostType }) {
  return (
    <div className="post__item">
      <div className="image__wrapper">
        <img src={post?.image.url} alt="" className="post__image" />
      </div>
      <div className="info__wrapper">
        <div className="post__details">
          <h4 className="post__title">{post?.title}</h4>
          <p className="post__category">{post?.category}</p>
        </div>
        <p className="post__description">{post?.description}</p>
        <div className="post__info">
          <div className="post__author">
            <strong>Author: </strong>
            <Link href={`/users/${post?.user?._id}`}>{post?.user?.username}</Link>
          </div>
          <div className="post__date">
            {new Date(post?.createdAt!).toDateString()}
          </div>
        </div>
        <Link className="post__link" href={`/posts/${post._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
}

export default PostItem;
