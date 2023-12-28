"use client";
import "./postDetails.css";
import Link from "next/link";
import { EditPost, LoadingSpinner, PostComments } from "@/components";
import { useParams } from "next/navigation";
import { useGetPostByIdQuery } from "@/redux/services/postApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import parse from "html-react-parser";
function PageDescription() {
  const { data: session } = useSession();
  const params = useParams();
  const {
    isLoading,
    isSuccess,
    data: post,
    error,
  } = useGetPostByIdQuery({ id: params.postId as string });

  if (error) {
    const typedError = error as { status: number; data: { message: string } };
    const message =
      `${typedError.status} - ${typedError.data.message}` ||
      "An error occurred.";
    throw new Error(message);
  }
  return (
    <main className="postDetails">
      {isLoading ? <LoadingSpinner /> : null}
      {isSuccess && !isLoading && post ? (
        <>
          <h1 className="postDetails__title">{post?.title}</h1>
          <div className="postDetails__user-container">
            <div className="postDetails__user-info">
              <Image
                src={post?.user?.profilePhoto.url}
                alt="user image"
                className="postDetails__user-image"
                width={35}
                height={35}
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
            {session?.user?.id === post.user._id ? (
              <EditPost post={post} />
            ) : null}
          </div>
          <div className="postDetails__image-wrapper">
            <Image
              src={post?.image?.url}
              alt="post image"
              className="postDetails__image"
              height={300}
              width={300}
            />
          </div>
          <div className="postDetails__description">{parse(post?.description)}</div>
          <PostComments post={post} />
        </>
      ) : null}
    </main>
  );
}

export default PageDescription;
