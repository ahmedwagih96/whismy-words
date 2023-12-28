import { PostType } from "@/typings/mongoTypes";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
function PostItem({ post }: { post: PostType }) {
  return (
    <div className="post__item">
      <div className="image__wrapper">
        <Image
          src={post?.image.url}
          alt="post image"
          className="post__image"
          height={400}
          width={400}
        />
      </div>
      <div className="info__wrapper">
        <div className="post__details">
          <h4 className="post__title">{post?.title}</h4>
          <p className="post__category">{post?.category}</p>
        </div>
        <div className="post__description">{parse(post?.description)}</div>
        <div className="post__info">
          <div className="post__author">
            <strong>Author: </strong>
            <Link href={`/users/${post?.user?._id}`}>
              {post?.user?.username}
            </Link>
          </div>
          <div className="post__date">
            {new Date(post?.createdAt!).toDateString()}
          </div>
        </div>
        <Link className="post__link" href={`/posts/${post._id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostItem;
