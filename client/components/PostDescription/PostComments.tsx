"use client";
import { PostType } from "@/typings/mongoTypes";
import { AddComment, Comments } from "@/components";
import { useSession } from "next-auth/react";
function PostComments({ post }: { post: PostType }) {
  const { data: session } = useSession();
  return (
    <>
      <Comments post={post} />
      {session?.user ? (
        <AddComment postId={post._id} />
      ) : (
        <p className="postDetails__loginInfo">
          To write a comment, please login
        </p>
      )}
    </>
  );
}

export default PostComments;
