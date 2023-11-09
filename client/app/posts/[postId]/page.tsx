export const dynamic = "force-dynamic";
import "./postDetails.css";
import Link from "next/link";
import { EditPost, PostComments } from "@/components";
import { fetchPost } from "@/utils/posts";
import { PostType } from "@/typings/mongoTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function PageDescription({ params }: { params: { postId: string } }) {
  const session = await getServerSession(authOptions);
  const post: PostType = await fetchPost(params.postId);
  return (
    <main className="postDetails">
      <h1 className="postDetails__title">{post?.title}</h1>
      <div className="postDetails__user-container">
        <div className="postDetails__user-info">
          <img
            src={post?.user?.profilePhoto.url}
            alt="user image"
            className="postDetails__user-image"
          />
          <div className="postDetails__user">
            <strong>
              <Link href={`/users/${post?.user?._id}`}>
                {post?.user?.username}
              </Link>
            </strong>
            <span>{new Date(post?.createdAt!).toDateString()}</span>
          </div>
        </div>
        {session?.user ? <EditPost post={post} /> : null}
      </div>
      <div className="postDetails__image-wrapper">
        <img
          src={post?.image?.url}
          alt="post image"
          className="postDetails__image"
        />
      </div>
      <p className="postDetails__description">{post?.description}</p>
      <PostComments post={post} />
    </main>
  );
}

export default PageDescription;
